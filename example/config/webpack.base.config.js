import webpack from 'webpack';
import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

export default new Config().merge({
    entry:  ['babel-polyfill', './src/index.js'],
    output: {
        path: __dirname + '/../public',
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: "body"
        }),
        new webpack.LoaderOptionsPlugin({options: {postcss: [precss, autoprefixer]}})
    ]
});