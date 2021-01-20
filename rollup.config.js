import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import { babel } from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss-modules';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/component/index.tsx',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      // 支持第三方模块
      resolve(),
      // 支持 commonjs 格式
      commonjs(),
      json(),
      postcss({
        extract: true, // extracts to `${basename(dest)}.css`
        plugins: [],
        writeDefinitions: false,
        // modules: { ... }
      }),
      typescript(),
      production && terser(),
    ],
    // 第三方模块不会强行打包到输出中
    external: (id) => /^(qss|react|antd|@ant-design\/icons|core-js)/.test(id),
  },
  // 打包声明文件
  {
    input: 'src/component/index.tsx',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
