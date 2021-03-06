import baseConfig from './rollup.config.base';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';
import scss from 'rollup-plugin-scss';

import {name} from '../package.json';

export default {
    ...baseConfig,
    input: 'example/src/app.js',
    output: [
        {
            file: `example/dist/${name}.js`,
            format: 'umd',
            name,
            sourcemap: true
        },
        {
            file: `example/dist/${name}.cjs.js`,
            format: 'cjs',
            name,
            sourcemap: 'inline'
        }
    ],
    plugins: [
        ...baseConfig.plugins,
        copy({
            targets: [{ src: 'example/src/index.html', dest: 'example/dist' }]
        }),
        scss({
            output: './example/dist/css/style.css'
        }),
        livereload({watch: 'example/dist'}),
        serve({
            port: 8080,
            contentBase: ['example/dist'],
            historyApiFallback: true,
        })
    ]
};
