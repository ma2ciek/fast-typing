const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')
const glob = require('glob');
const path = require('path');

module.exports = {
    entry: {
        app: './src/ts/main.tsx',
        tests: glob.sync('./src/**/*-spec.ts'),
    },
    output: {
        path: path.join(__dirname, 'build/js'),
        filename: "./[name].js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", '.jsx']
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        // }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        new CleanWebpackPlugin(['build'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),

        new CopyWebpackPlugin([
            { from: './src/index.html', to: path.join(__dirname, './build/index.html') }
        ]),
    ],

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "babel!ts-loader", exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader' },
            { test: /\.svg$/, loader: 'svg-inline'}
        ],

        // preLoaders: [
        //     // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        //     { test: /\.js$/, loader: "source-map-loader" }
        // ]
    },
};