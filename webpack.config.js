const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: {
        music: './src/SchemasMusic/Score.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /tmp/]
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        plugins: [new TsconfigPathsPlugin({ configFile:'./tsconfig.json' })]
    },
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: '[name].bundle.js'
    },
    devtool: "inline-source-map"
};