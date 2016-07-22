module.exports = {
    entry: "./src/app/main.js",
    output: {
        filename: "./src/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', 'angular2']
                }
            }
        ]
    }
}