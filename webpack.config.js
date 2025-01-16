const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { type } = require('os');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    mode: 'development',
    devtool: 'inline-source-map',

    devServer: {
        port: 8080,
        host: 'localhost',
        server: {
            type: 'https',
            options: {
                key: path.resolve(__dirname, '.ssl/localhost.key'),
                cert: path.resolve(__dirname, '.ssl/localhost.crt'), 

            }
        },
        static: path.resolve(__dirname, 'dist'),
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync('/home/roy/ssl/localhost.key'), 
                cert: fs.readFileSync('/home/roy/ssl/localhost.crt'),
            },
        },
        open: true,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ]
}