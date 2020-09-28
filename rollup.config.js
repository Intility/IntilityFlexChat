import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
    input: './src/index.tsx',
    output: [
        {
            file: pkg.bundle.es,
            format: 'es',
            sourcemap: true,
        },
        {
            file: pkg.bundle.cjs,
            format: 'cjs',
            sourcemap: true,
        },
    ],
    plugins: [
        typescript(),
        json(),
        external(),
        postcss(),
        babel(
            {
                presets: ['@babel/env', '@babel/preset-react'],
                exclude: ['node_modules/**'],
                compact: false,
                babelHelpers: 'bundled',
            },
            /* extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                'transform-react-remove-prop-types',
            ], */
            //exclude: 'node_modules/**',
            //runtimeHelpers: true,
        ),
        resolve(),
        commonjs(),
        image(),
        url(),
        svgr(),
        terser(),
    ],
};
