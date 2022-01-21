import { readFileSync, mkdirSync } from 'fs'
import path from 'path'

import type { SyncTransformer, TransformedSource } from '@jest/transform'
import type { Config } from '@jest/types'
import type { Logger } from 'bs-logger'

import { TsJestCompiler } from './compiler'
import { ConfigSet } from './config'
import { DECLARATION_TYPE_EXT, JS_JSX_REGEX, TS_TSX_REGEX } from './constants'
import type { CompilerInstance, DepGraphInfo, ProjectConfigTsJest, TransformOptionsTsJest } from './types'
import { parse, stringify, JsonableValue, rootLogger } from './utils'
import { importer } from './utils/importer'
import { Errors, interpolate } from './utils/messages'
import { sha1 } from './utils/sha1'
import { VersionCheckers } from './utils/version-checkers'

interface CachedConfigSet {
  configSet: ConfigSet
  jestConfig: JsonableValue<ProjectConfigTsJest>
  transformerCfgStr: string
  compiler: CompilerInstance
  depGraphs: Map<string, DepGraphInfo>
  tsResolvedModulesCachePath: string | undefined
  watchMode: boolean
}

interface TsJestHooksMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterProcess?(args: any[], result: string | TransformedSource): string | TransformedSource | void
}

/**
 * @internal
 */
export const CACHE_KEY_EL_SEPARATOR = '\x00'

export class TsJestTransformer implements SyncTransformer {
  /**
   * cache ConfigSet between test runs
   *
   * @internal
   */
  private static readonly _cachedConfigSets: CachedConfigSet[] = []
  private readonly _logger: Logger
  protected _compiler!: CompilerInstance
  private _tsResolvedModulesCachePath: string | undefined
  private _transformCfgStr!: string
  private _depGraphs: Map<string, DepGraphInfo> = new Map<string, DepGraphInfo>()
  private _watchMode = false

  constructor() {
    this._logger = rootLogger.child({ namespace: 'ts-jest-transformer' })
    VersionCheckers.jest.warn()
    /**
     * For some unknown reasons, `this` is undefined in `getCacheKey` and `process`
     * when running Jest in ESM mode
     */
    this.getCacheKey = this.getCacheKey.bind(this)
    this.getCacheKeyAsync = this.getCacheKeyAsync.bind(this)
    this.process = this.process.bind(this)
    this.processAsync = this.processAsync.bind(this)

    this._logger.debug('created new transformer')
    process.env.TS_JEST = '1'
  }

  private _configsFor(transformOptions: TransformOptionsTsJest): ConfigSet {
    const { config, cacheFS } = transformOptions
    const ccs: CachedConfigSet | undefined = TsJestTransformer._cachedConfigSets.find(
      (cs) => cs.jestConfig.value === config,
    )
    let configSet: ConfigSet
    if (ccs) {
      this._transformCfgStr = ccs.transformerCfgStr
      this._compiler = ccs.compiler
      this._depGraphs = ccs.depGraphs
      this._tsResolvedModulesCachePath = ccs.tsResolvedModulesCachePath
      this._watchMode = ccs.watchMode
      configSet = ccs.configSet
    } else {
      // try to look-it up by stringified version
      const serializedJestCfg = stringify(config)
      const serializedCcs = TsJestTransformer._cachedConfigSets.find(
        (cs) => cs.jestConfig.serialized === serializedJestCfg,
      )
      if (serializedCcs) {
        // update the object so that we can find it later
        // this happens because jest first calls getCacheKey with stringified version of
        // the config, and then it calls the transformer with the proper object
        serializedCcs.jestConfig.value = config
        this._transformCfgStr = serializedCcs.transformerCfgStr
        this._compiler = serializedCcs.compiler
        this._depGraphs = serializedCcs.depGraphs
        this._tsResolvedModulesCachePath = serializedCcs.tsResolvedModulesCachePath
        this._watchMode = serializedCcs.watchMode
        configSet = serializedCcs.configSet
      } else {
        // create the new record in the index
        this._logger.info('no matching config-set found, creating a new one')

        configSet = this._createConfigSet(config)
        const jest = { ...config }
        // we need to remove some stuff from jest config
        // this which does not depend on config
        jest.name = undefined as any // eslint-disable-line @typescript-eslint/no-explicit-any
        jest.cacheDirectory = undefined as any // eslint-disable-line @typescript-eslint/no-explicit-any
        this._transformCfgStr = `${new JsonableValue(jest).serialized}${configSet.cacheSuffix}`
        this._createCompiler(configSet, cacheFS)
        this._getFsCachedResolvedModules(configSet)
        this._watchMode = process.argv.includes('--watch')
        TsJestTransformer._cachedConfigSets.push({
          jestConfig: new JsonableValue(config),
          configSet,
          transformerCfgStr: this._transformCfgStr,
          compiler: this._compiler,
          depGraphs: this._depGraphs,
          tsResolvedModulesCachePath: this._tsResolvedModulesCachePath,
          watchMode: this._watchMode,
        })
      }
    }

    return configSet
  }

  // eslint-disable-next-line class-methods-use-this
  protected _createConfigSet(config: ProjectConfigTsJest | undefined): ConfigSet {
    return new ConfigSet(config)
  }

  protected _createCompiler(configSet: ConfigSet, cacheFS: Map<string, string>): void {
    this._compiler = new TsJestCompiler(configSet, cacheFS)
  }

  /**
   * @public
   */
  process(
    fileContent: string,
    filePath: Config.Path,
    transformOptions: TransformOptionsTsJest,
  ): TransformedSource | string {
    this._logger.debug({ fileName: filePath, transformOptions }, 'processing', filePath)

    let result: string | TransformedSource
    const configs = this._configsFor(transformOptions)
    const shouldStringifyContent = configs.shouldStringifyContent(filePath)
    const babelJest = shouldStringifyContent ? undefined : configs.babelJestTransformer
    const isDefinitionFile = filePath.endsWith(DECLARATION_TYPE_EXT)
    const isJsFile = JS_JSX_REGEX.test(filePath)
    const isTsFile = !isDefinitionFile && TS_TSX_REGEX.test(filePath)
    let hooksFile = process.env.TS_JEST_HOOKS
    let hooks: TsJestHooksMap | undefined
    /* istanbul ignore next (cover by e2e) */
    if (hooksFile) {
      hooksFile = path.resolve(configs.cwd, hooksFile)
      hooks = importer.tryTheseOr(hooksFile, {})
    }
    if (shouldStringifyContent) {
      // handles here what we should simply stringify
      result = `module.exports=${stringify(fileContent)}`
    } else if (isDefinitionFile) {
      // do not try to compile declaration files
      result = ''
    } else if (!configs.parsedTsConfig.options.allowJs && isJsFile) {
      // we've got a '.js' but the compiler option `allowJs` is not set or set to false
      this._logger.warn({ fileName: filePath }, interpolate(Errors.GotJsFileButAllowJsFalse, { path: filePath }))

      result = fileContent
    } else if (isJsFile || isTsFile) {
      // transpile TS code (source maps are included)
      result = this._compiler.getCompiledOutput(fileContent, filePath, {
        depGraphs: this._depGraphs,
        supportsStaticESM: transformOptions.supportsStaticESM,
        watchMode: this._watchMode,
      })
    } else {
      // we should not get called for files with other extension than js[x], ts[x] and d.ts,
      // TypeScript will bail if we try to compile, and if it was to call babel, users can
      // define the transform value with `babel-jest` for this extension instead
      const message = babelJest ? Errors.GotUnknownFileTypeWithBabel : Errors.GotUnknownFileTypeWithoutBabel

      this._logger.warn({ fileName: filePath }, interpolate(message, { path: filePath }))

      result = fileContent
    }
    // calling babel-jest transformer
    if (babelJest) {
      this._logger.debug({ fileName: filePath }, 'calling babel-jest processor')

      // do not instrument here, jest will do it anyway afterwards
      result = babelJest.process(result, filePath, { ...transformOptions, instrument: false })
    }
    // This is not supposed to be a public API but we keep it as some people use it
    if (hooks?.afterProcess) {
      this._logger.debug({ fileName: filePath, hookName: 'afterProcess' }, 'calling afterProcess hook')

      const newResult = hooks.afterProcess([fileContent, filePath, transformOptions.config, transformOptions], result)
      if (newResult) {
        return newResult
      }
    }

    return result
  }

  async processAsync(
    sourceText: string,
    sourcePath: Config.Path,
    transformOptions: TransformOptionsTsJest,
  ): Promise<TransformedSource | string> {
    return new Promise((resolve) => resolve(this.process(sourceText, sourcePath, transformOptions)))
  }

  /**
   * Jest uses this to cache the compiled version of a file
   *
   * @see https://github.com/facebook/jest/blob/v23.5.0/packages/jest-runtime/src/script_transformer.js#L61-L90
   *
   * @public
   */
  getCacheKey(fileContent: string, filePath: string, transformOptions: TransformOptionsTsJest): string {
    const configs = this._configsFor(transformOptions)
    this._logger.debug({ fileName: filePath, transformOptions }, 'computing cache key for', filePath)

    // we do not instrument, ensure it is false all the time
    const { instrument = false } = transformOptions
    const { rootDir } = configs

    return sha1(
      this._transformCfgStr,
      '\x00',
      rootDir,
      '\x00',
      `instrument:${instrument ? 'on' : 'off'}`,
      '\x00',
      fileContent,
      '\x00',
      filePath,
    )
  }

  async getCacheKeyAsync(
    sourceText: string,
    sourcePath: string,
    transformOptions: TransformOptionsTsJest,
  ): Promise<string> {
    return new Promise((resolve) => resolve(this.getCacheKey(sourceText, sourcePath, transformOptions)))
  }

  /**
   * Subclasses extends `TsJestTransformer` can call this method to get resolved module disk cache
   */
  private _getFsCachedResolvedModules(configSet: ConfigSet): void {
    const cacheDir = configSet.tsCacheDir
    if (!configSet.isolatedModules && cacheDir) {
      // Make sure the cache directory exists before continuing.
      mkdirSync(cacheDir, { recursive: true })
      this._tsResolvedModulesCachePath = path.join(cacheDir, sha1('ts-jest-resolved-modules', CACHE_KEY_EL_SEPARATOR))
      try {
        const cachedTSResolvedModules = readFileSync(this._tsResolvedModulesCachePath, 'utf-8')
        this._depGraphs = new Map(parse(cachedTSResolvedModules))
      } catch (e) {}
    }
  }
}
