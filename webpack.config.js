const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const plugins = [
    new ImageMinimizerPlugin({
        minimizerOptions: {
            plugins: [
                ['svgo', {}]
            ]
        }
    }),
    new SpriteLoaderPlugin()
];

module.exports = (_env, argv) => {
    if (argv.mode === 'development') {
        plugins.unshift(
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: 'body'
            })
        )
    } else {
        plugins.push(new HtmlInlineScriptPlugin());
    }

    return {
        entry: './src/index.tsx',
        output: {
            publicPath: '',
            path: path.join(__dirname, 'dist'),
            filename: 'index.bundle.js'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devServer: {
            port: 3000,
            disableHostCheck: true
        },
        module: {
            rules: [{
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules\/(?!(@my\/myworld-ui-kit)\/).*/,
                use: ['ts-loader']
            }, {
                test: /(styles.scss|mixins.scss)$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }, {
                    loader: 'sass-loader'
                }]
            }, {
                test: /styles.global.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(jpe?g|png|gif)$/i,
                type: 'asset'
            }, {
                test: /\.svg$/,
                include: /icons/,
                use: ['svg-sprite-loader']
            }]
        },
        plugins,
        target: argv.mode === 'development'
            ? 'web'
            : 'browserslist',
        resolve: {
            modules: ['src', 'node_modules'],
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                react: path.join(__dirname, 'node_modules/react'),
                'react-dom': path.join(__dirname, 'node_modules/react-dom')
            }
        }
    };
}
