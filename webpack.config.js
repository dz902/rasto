const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: {
        main: './src/Main.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                },
                exclude: [/node_modules/, /tmp/]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: { }
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        plugins: [new TsconfigPathsPlugin({ configFile:'./tsconfig.json' })]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: "inline-source-map",
    devServer: {
        publicPath: '/dist/'
    }
};