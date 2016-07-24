var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/ts/main.tsx",
    output: {
        filename: "./build/js/app.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: './node_modules/react/dist/react.js', to: './build/lib/react' },
            { from: './node_modules/react-dom/dist/react-dom.js', to: './build/lib/react' },
            { from: './src/css/', to: './build/css/' },
            { from: './src/index.html', to: './build/index.html' }
        ])
    ],

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "babel!ts-loader" }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};