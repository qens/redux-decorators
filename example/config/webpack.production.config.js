import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('config/webpack.base.config.js').merge({
    output: {
        filename: 'bundle.min.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader'
                },
                {loader: 'postcss-loader'},
            ]
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),]
});