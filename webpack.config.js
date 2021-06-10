const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
        entry: path.resolve(__dirname, './src/index.tsx'),
        mode: 'development',
        output: {
                path: path.resolve(__dirname, './dist'),
                filename: '[name].bundle.js'
        },
        resolve: {
                extensions: ['.tsx', '.ts', '.js', '.jsx']
        },
        module: {
                rules: [
                        {
                                test: /\.js|.jsx$/,
                                exclude: /node_modules/,
                                use: {
                                        loader: 'babel-loader'
                                }
                        },
                        {
                                test: /\.ts|.tsx$/,
                                exclude: /node_modules/,
                                use: [
                                        {
                                                loader: 'babel-loader'
                                        },
                                        {
                                                loader: 'ts-loader'
                                        }
                                ]
                        },
                        {
                                test: /\.css$/,
                                use: [
                                        'style-loader',
                                        {
                                                loader: 'css-loader',
                                                options: {
                                                        modules: true
                                                }
                                        }
                                ]
                        },
                        {
                                test: /\.(png|svg|jpg|gif)$/,
                                use: ['file-loader']
                        }
                ]
        },
        plugins: [
                new HtmlWebpackPlugin({
                        title: 'lazyLoad',
                        template: path.resolve(__dirname, './src/index.html'),
                        filename: 'index.html'
                }),
                new CleanWebpackPlugin()
        ],
        devServer: {
                contentBase: path.resolve(__dirname, './dist'),
                compress: true,
                port: 9000,
                watchContentBase: true,
                progress: true
        },
}