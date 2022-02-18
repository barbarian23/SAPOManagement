const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-tags-plugin');
const webpack = require('webpack');

const path = require("path");

const js = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
        },
    },
};


const css = {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader, 'css-loader',
    ]
};

const file = {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
        {
            loader: 'url-loader?limit=10000&mimetype=application/font-woff',
            options: {
                name: "[name].[ext]"
            },
        },
    ],
};


const serverConfig = {
    mode: "development",
    target: "node",
    node: {
        __dirname: false,
    },
    externals: [nodeExternals()],
    entry: {
        "index": path.resolve(__dirname, "backend/server.js"),
    },
    module: {
        rules: [js, css, { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" }]
    },
    watchOptions: {
        poll: 1000, // Check for changes every second
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
};

const clientConfig = {
    mode: "development",
    target: "web",
    entry: {
        "client": path.resolve(
            __dirname,
            "frontend/client.js"
        ),
    },
    module: {
        rules: [js, css, { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" },{
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            type: 'asset/inline'
        },],
    },
    watchOptions: {
        poll: 1000, // Check for changes every second
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    reuseExistingChunk: true,
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, "dist/public"),
        publicPath: '/static/',
        filename: "[name].js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: './backend/service/render/index.html',
            filename: './index.html'
        }),
        new HtmlWebpackIncludeAssetsPlugin({ append: true })
    ]
};

module.exports = [serverConfig, clientConfig];