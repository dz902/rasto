const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/Main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        plugins: [new TsconfigPathsPlugin({ configFile:'./tsconfig.json' })]
    },
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'bundle.js',
        library: 'rasto'
    },
    devtool: "inline-source-map"
};