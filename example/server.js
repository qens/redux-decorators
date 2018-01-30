var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    _ = require('lodash');

const app = module.exports = express();
app.set('port', process.env.PORT || 8001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const PUBLIC_PATH = path.join(__dirname, 'public');

app.route('/api/login')
    .post(function (req, res) {
        const {username, password} = req.body;
        if (username === 'admin' && password === 'admin') {
            res.json({username, password});
        } else {
            res.json({
                errors: {
                    username: 'an error for username',
                    password: 'an error for password'
                }
            });
        }
    });


const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.babel').default;
    const compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        hot: true,
        stats: {
            colors: true
        }
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    // Redirect all non api requests to the index
    app.use('*', function (req, res, next) {
        var filename = path.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, function (err, result) {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
} else {
    app.use(express.static(PUBLIC_PATH));
    // Redirect all non api requests to the index
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

// Starting express server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});