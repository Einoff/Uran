const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.jsx'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        headers: {"Access-Control-Allow-Origin": "*"},
        open: true,
        port: 3000,
        // https: true,
        historyApiFallback: {
            disableDotRule: true,
        },
        // headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        //     "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        // }
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
    plugins: [
        new HtmlWebpackPlugin(
            {
                // filename: 'index.html',
                template: './src/index.html'
            }
        ),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use: ['file-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-react"]
                  }
                }
            }
        ]
    }
}