import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
const Dotenv = require('dotenv-webpack');

const isDevelopmentMode = process.env.NODE_ENV === 'development';

const config = {
    mode: 'production',
    node: {
        global: false,
        __filename: false,
        __dirname: false,
    },
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.[chunkhash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: path.resolve(__dirname, 'src/api')
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.module\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Test Eneba page',
            template: './src/index.html',
            filename: './index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: isDevelopmentMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopmentMode ? '[id].css' : '[id].[hash].css',
        }),
        new CopyPlugin({
            patterns: [{ from: './src/assets/fonts', to: 'build/fonts' }],
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
        alias: {
            assets: path.resolve(__dirname, 'src/assets/'),
            components: path.resolve(__dirname, 'src/components/'),
            constants: path.resolve(__dirname, 'src/constants/'),
            controllers: path.resolve(__dirname, 'src/controllers/'),
            routes: path.resolve(__dirname, 'src/routes/'),
            queries: path.resolve(__dirname, 'src/queries/'),
        },
    },
    stats: { colors: true },
    devServer: {
        historyApiFallback: true,
        open: true,
    },
};

export default config;
