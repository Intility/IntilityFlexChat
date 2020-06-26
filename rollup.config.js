import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import visualizer from 'rollup-plugin-visualizer';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import uglify from '@lopatnov/rollup-plugin-uglify';

export default {
    input: './src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
    ],
    plugins: [
        typescript(),
        json(),
        external(),
        postcss(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
        resolve(),
        commonjs(),
        image(),
        visualizer(),
        uglify(),
    ],
};
