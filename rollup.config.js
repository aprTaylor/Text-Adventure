import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import multiEntry from "rollup-plugin-multi-entry"

import pkg from './package.json'

const getOptions = () => ({
  experimentalCodeSplitting: true,
  plugins: [
    multiEntry(),
    external(),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    babel({
      babelrc: true,
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer']
      }
    })
  ]
})

export default [{
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  ...getOptions()
},
{
  input: 'src/systems/**',
  output: [
    {
      dir: 'dist/systems.js',
      format: 'cjs',
      sourcemap: true
    }
  ],
  ...getOptions()
},
{
  input: 'src/ecs/**/*.js',
  exclude: ['src/ecs/__Tests__/*', 'src/ecs/util/__tests__/*'],
  output: [
    {
      dir: 'dist/world',
      format: 'cjs',
      sourcemap: true
    },
  ],
  ...getOptions()
},


]
