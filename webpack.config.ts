import HtmlWebpackPlugin from 'html-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import * as path from 'path';
import webpack from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

let plugins = [];

const entries: { [key: string]: string } = {
    break: path.resolve(__dirname, 'src/graphics/break/index.ts'),
    game: path.resolve(__dirname, 'src/graphics/game/index.ts')
};

plugins = plugins.concat([
    new HtmlWebpackPlugin({
        filename: 'break.html',
        chunks: ['break'],
        title: 'break',
        template: './break/break.html'
    }),
    new HtmlWebpackPlugin({
        filename: 'game.html',
        chunks: ['game'],
        title: 'game',
        template: './game/game.html'
    })
]);

plugins.push(new CopyPlugin({
    patterns: [
        { from: 'assets/**/*' }
    ]
}));

if (process.env.NODE_ENV !== 'production') {
    plugins.push(
        new LiveReloadPlugin({
            port: 0,
            appendScriptTag: true
        })
    );
}

const config: webpack.Configuration = {
    context: path.resolve(__dirname, 'src/graphics'),
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    target: 'web',
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'graphics'),
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.json'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: 'tsconfig.json'
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: '/node_modules',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { targets: { chrome: '75' } }], '@babel/preset-typescript']
                    }
                }
            }
        ]
    },
    plugins,
    optimization: process.env.NODE_ENV === 'production' ? {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                common: {
                    minChunks: 2
                },
                defaultVendors: false,
                default: false
            }
        }
    } : undefined
};

export default [config];