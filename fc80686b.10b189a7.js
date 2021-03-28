(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{124:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return b})),n.d(t,"default",(function(){return l}));var r=n(3),a=n(7),s=(n(0),n(131)),i={id:"presets",title:"Presets"},o={unversionedId:"getting-started/presets",id:"getting-started/presets",isDocsHomePage:!1,title:"Presets",description:"The presets",source:"@site/docs/getting-started/presets.md",slug:"/getting-started/presets",permalink:"/ts-jest/docs/next/getting-started/presets",editUrl:"https://github.com/kulshekhar/ts-jest/edit/master/website/docs/getting-started/presets.md",version:"current",sidebar:"docs",previous:{title:"Installation",permalink:"/ts-jest/docs/next/getting-started/installation"},next:{title:"Options",permalink:"/ts-jest/docs/next/getting-started/options"}},b=[{value:"The presets",id:"the-presets",children:[]},{value:"Basic usage",id:"basic-usage",children:[]},{value:"Advanced",id:"advanced",children:[]}],c={toc:b};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("h3",{id:"the-presets"},"The presets"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"ts-jest")," comes with several presets, covering most of the project's base configuration:"),Object(s.b)("table",null,Object(s.b)("thead",{parentName:"table"},Object(s.b)("tr",{parentName:"thead"},Object(s.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Preset name"),Object(s.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Description"))),Object(s.b)("tbody",{parentName:"table"},Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(s.b)("inlineCode",{parentName:"td"},"ts-jest/presets/default"),Object(s.b)("br",null),"or ",Object(s.b)("inlineCode",{parentName:"td"},"ts-jest")),Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"TypeScript files (",Object(s.b)("inlineCode",{parentName:"td"},".ts"),", ",Object(s.b)("inlineCode",{parentName:"td"},".tsx"),") will be transformed by ",Object(s.b)("inlineCode",{parentName:"td"},"ts-jest")," to ",Object(s.b)("strong",{parentName:"td"},"CommonJS")," syntax, leaving JavaScript files (",Object(s.b)("inlineCode",{parentName:"td"},".js"),", ",Object(s.b)("inlineCode",{parentName:"td"},"jsx"),") as-is.")),Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(s.b)("inlineCode",{parentName:"td"},"ts-jest/presets/default-esm"),Object(s.b)("br",null)),Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"TypeScript files (",Object(s.b)("inlineCode",{parentName:"td"},".ts"),", ",Object(s.b)("inlineCode",{parentName:"td"},".tsx"),") will be transformed by ",Object(s.b)("inlineCode",{parentName:"td"},"ts-jest")," to ",Object(s.b)("strong",{parentName:"td"},"ESM")," syntax, leaving JavaScript files (",Object(s.b)("inlineCode",{parentName:"td"},".js"),", ",Object(s.b)("inlineCode",{parentName:"td"},"jsx"),") as-is.")),Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(s.b)("inlineCode",{parentName:"td"},"ts-jest/presets/js-with-ts")),Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"TypeScript and JavaScript files (",Object(s.b)("inlineCode",{parentName:"td"},".ts"),", ",Object(s.b)("inlineCode",{parentName:"td"},".tsx"),", ",Object(s.b)("inlineCode",{parentName:"td"},".js"),", ",Object(s.b)("inlineCode",{parentName:"td"},".jsx"),") will be transformed by ",Object(s.b)("inlineCode",{parentName:"td"},"ts-jest")," to ",Object(s.b)("strong",{parentName:"td"},"CommonJS")," syntax.",Object(s.b)("br",null),"You'll need to set ",Object(s.b)("inlineCode",{parentName:"td"},"allowJs")," to ",Object(s.b)("inlineCode",{parentName:"td"},"true")," in your ",Object(s.b)("inlineCode",{parentName:"td"},"tsconfig.json")," file.")),Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(s.b)("inlineCode",{parentName:"td"},"ts-jest/presets/js-with-ts-esm")),Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"TypeScript and JavaScript files (",Object(s.b)("inlineCode",{parentName:"td"},".ts"),", ",Object(s.b)("inlineCode",{parentName:"td"},".tsx"),", ",Object(s.b)("inlineCode",{parentName:"td"},".js"),", ",Object(s.b)("inlineCode",{parentName:"td"},".jsx"),", ",Object(s.b)("inlineCode",{parentName:"td"},".mjs"),") will be transformed by ",Object(s.b)("inlineCode",{parentName:"td"},"ts-jest")," to ",Object(s.b)("strong",{parentName:"td"},"ESM")," syntax.",Object(s.b)("br",null),"You'll need to set ",Object(s.b)("inlineCode",{parentName:"td"},"allowJs")," to ",Object(s.b)("inlineCode",{parentName:"td"},"true")," in your ",Object(s.b)("inlineCode",{parentName:"td"},"tsconfig.json")," file.")),Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(s.b)("inlineCode",{parentName:"td"},"ts-jest/presets/js-with-babel")),Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"TypeScript files (",Object(s.b)("inlineCode",{parentName:"td"},".ts"),", ",Object(s.b)("inlineCode",{parentName:"td"},".tsx"),") will be transformed by ",Object(s.b)("inlineCode",{parentName:"td"},"ts-jest")," to ",Object(s.b)("strong",{parentName:"td"},"CommonJS")," syntax, and JavaScript files (",Object(s.b)("inlineCode",{parentName:"td"},".js"),", ",Object(s.b)("inlineCode",{parentName:"td"},"jsx"),") will be transformed by ",Object(s.b)("inlineCode",{parentName:"td"},"babel-jest"),".")),Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(s.b)("inlineCode",{parentName:"td"},"ts-jest/presets/js-with-babel-esm")),Object(s.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"TypeScript files (",Object(s.b)("inlineCode",{parentName:"td"},".ts"),", ",Object(s.b)("inlineCode",{parentName:"td"},".tsx"),") will be transformed by ",Object(s.b)("inlineCode",{parentName:"td"},"ts-jest")," to ",Object(s.b)("strong",{parentName:"td"},"ESM")," syntax, and JavaScript files (",Object(s.b)("inlineCode",{parentName:"td"},".js"),", ",Object(s.b)("inlineCode",{parentName:"td"},"jsx"),", ",Object(s.b)("inlineCode",{parentName:"td"},".mjs"),") will be transformed by ",Object(s.b)("inlineCode",{parentName:"td"},"babel-jest"),".")))),Object(s.b)("h3",{id:"basic-usage"},"Basic usage"),Object(s.b)("p",null,"In most cases, simply setting the ",Object(s.b)("inlineCode",{parentName:"p"},"preset")," key to the desired preset name in your Jest config should be enough to start\nusing TypeScript with Jest (assuming you added ",Object(s.b)("inlineCode",{parentName:"p"},"ts-jest")," to your ",Object(s.b)("inlineCode",{parentName:"p"},"devDependencies")," of course):"),Object(s.b)("pre",null,Object(s.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"// jest.config.js\nmodule.exports = {\n  // [...]\n  // Replace `ts-jest` with the preset you want to use\n  // from the above list\n  preset: 'ts-jest',\n}\n")),Object(s.b)("pre",null,Object(s.b)("code",Object(r.a)({parentName:"pre"},{className:"language-json"}),'// OR package.json\n{\n  // [...]\n  "jest": {\n    // Replace `ts-jest` with the preset you want to use\n    // from the above list\n    "preset": "ts-jest"\n  }\n}\n')),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},"Note:")," presets use ",Object(s.b)("inlineCode",{parentName:"p"},"testMatch"),", like Jest does in its defaults. If you want to use ",Object(s.b)("inlineCode",{parentName:"p"},"testRegex")," instead in your configuration, you MUST set ",Object(s.b)("inlineCode",{parentName:"p"},"testMatch")," to ",Object(s.b)("inlineCode",{parentName:"p"},"null")," or Jest will bail."),Object(s.b)("h3",{id:"advanced"},"Advanced"),Object(s.b)("p",null,"Any preset can also be used with other options.\nIf you're already using another preset, you might want only some specific settings from the chosen ",Object(s.b)("inlineCode",{parentName:"p"},"ts-jest")," preset.\nIn this case you'll need to use the JavaScript version of Jest config (comment/uncomment according to your use case):"),Object(s.b)("pre",null,Object(s.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"// jest.config.js\nconst { defaults: tsjPreset } = require('ts-jest/presets')\n// const { defaultsESM: tsjPreset } = require('ts-jest/presets')\n// const { jsWithTs: tsjPreset } = require('ts-jest/presets')\n// const { jsWithTsESM: tsjPreset } = require('ts-jest/presets')\n// const { jsWithBabel: tsjPreset } = require('ts-jest/presets')\n// const { jsWithBabelESM: tsjPreset } = require('ts-jest/presets')\n\nmodule.exports = {\n  // [...]\n  transform: {\n    ...tsjPreset.transform,\n    // [...]\n  },\n}\n")),Object(s.b)("p",null,"Or through TypeScript (if ",Object(s.b)("inlineCode",{parentName:"p"},"ts-node")," is installed):"),Object(s.b)("pre",null,Object(s.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"// jest.config.ts\nimport type { InitialOptionsTsJest } from 'ts-jest/dist/types'\nimport { defaults as tsjPreset } from 'ts-jest/preset'\n// import { defaultsESM as tsjPreset } from 'ts-jest/preset'\n// import { jsWithTs as tsjPreset } from 'ts-jest/preset'\n// import { jsWithTsESM as tsjPreset } from 'ts-jest/preset'\n// import { jsWithBabel as tsjPreset } from 'ts-jest/preset'\n// import { jsWithBabelESM as tsjPreset } from 'ts-jest/preset'\n\nconst config: InitialOptionsTsJest = {\n  // [...]\n  transform: {\n    ...tsjPreset.transform,\n    // [...]\n  },\n}\n\nexport default config\n")))}l.isMDXComponent=!0},131:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),l=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},j=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,i=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),p=l(n),j=r,m=p["".concat(i,".").concat(j)]||p[j]||d[j]||s;return n?a.a.createElement(m,o(o({ref:t},c),{},{components:n})):a.a.createElement(m,o({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,i=new Array(s);i[0]=j;var o={};for(var b in t)hasOwnProperty.call(t,b)&&(o[b]=t[b]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var c=2;c<s;c++)i[c]=n[c];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}j.displayName="MDXCreateElement"}}]);