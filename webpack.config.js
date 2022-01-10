const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(srcDir, 'index.html'),
        lang: 'en',
        title: 'ToDoList'
    })],
    devServer: {
        compress: true,
        port: 9000,
        watchFiles: ['src/**/*']
    },
};
