import dotenv from 'dotenv';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

dotenv.config();



export default {
  input:[
    'src/index.js'
  ]
  , watch:{
      include: 'src/**'
    }
  , output:[
    { file: `dist/cvui.umd.js`, format: 'umd', name:'cv' }
    // Minified with TerserJS
    ,{ file: `dist/cvui.min.js`, format: 'umd', plugins: [terser()] }
    // IIFE self-executed dog Balls
    ,{ file: 'dist/bundle.min.js', format: 'iife', name:'bundle' }
    // CommonJS modules
    // ,{ dir:'dist/cjs', format:'cjs' }
    // AMD modules
    // ,{ dir:'dist/amd', format:'amd'}
    // ES module version, for modern browsers
    // ,{ dir: "dist/esmodule", format: "es", sourcemap: true }
    // SystemJS version, for older browsers
    // ,{ dir: "dist/systemjs", format: "system", sourcemap: true }
  ],
  plugins:[
    resolve({ browser:true, preferBuiltins: true })
    ,commonjs({
        namedExports: {axios: ['get']}
      })
    ,json({
        include:[
          "package.json"
          // , "default.config.json"
        ]
        , preferConst: true
      })
    ,babel({
        babelrc:true
        , exclude: 'node_modules/**'
        , presets: [['@babel/preset-env', {useBuiltIns: 'entry', corejs: 3}]]
      })
    ,terser()
    // , postcss
    //   ({ extensions: ['.css', '.sass']
    //    , extract: resolve(css_prefix + '.css')
    //    , plugins: [autoprefixer()]
    //   })
    , serve({
      open: true
      , host: "localhost"
      , port: 10001
      // , https: {
      //   key:  fs.readFileSync('/.https/server.key')
      //   , cert:  fs.readFileSync('/.https/server.crt')
      //   , ca:  fs.readFileSync('/.https/ca.pem')
      // }
      , headers: {
        'Access-Control-Allow-Origin': '*'
        // , foo: 'bar'
      }
    })
    , livereload({
      watch: "src/*"
    })
  ]
}
