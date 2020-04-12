import filesize from 'rollup-plugin-filesize';
import { terser } from "rollup-plugin-terser";
import scss from 'rollup-plugin-scss';

import baseConfig from './rollup.config.base';
import {name, version, author} from '../package.json';

// banner
const banner =
    `${'/*!\n' + ' * '}${name}.js v${version}\n` +
    ` * (c) 2019-${new Date().getFullYear()} ${author}\n` +
    ` * Released under the MIT License.\n` +
    ` */`;

// 支持输出 []
export default [
    // .js, .cjs.js, .esm.js
    {
        ...baseConfig,
        input: 'src/VirtualizedMenuTree.jsx',
        output: [
            // umd development version
            {
                file: `lib/${name}.js`,
                format: 'umd',
                name,
                banner
            },
            // cjs and esm version
            {
                file: `lib/${name}.cjs.js`,
                format: 'cjs',
                banner
            },
            // cjs and esm version
            {
                file: `lib/${name}.esm.js`,
                format: 'es',
                banner
            }
        ],
        plugins: [
            ...baseConfig.plugins,
            scss({
                output: './lib/css/style.css'
            }),
            filesize()
        ]
    },
    // .min.js
    {
        ...baseConfig,
        input: 'src/VirtualizedMenuTree.jsx',
        output: [
            // esm with compress version
            {
                file: `lib/${name}.esm.min.js`,
                format: 'es',
                name,
                banner
            }
        ],
        plugins: [
            ...baseConfig.plugins,
            terser(),
            scss({
                output: './lib/css/style.css'
            }),
            filesize()
        ]
    }
];
