var del = require('del')
var gulp = require('gulp')
var gutil = require('gulp-util')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.config.js')

gulp.task('default', ['build'])

gulp.task('build', ['clean'], function (callback) {
    webpack(webpackConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:build', err)
        }
        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }))
        callback()
    })
})

gulp.task('dev-server', ['clean'], function (callback) {
    new WebpackDevServer(webpack(webpackConfig), {
        contentBase: 'dist',
    }).listen(8080, 'localhost', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err)
        }
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/index.html')
    });
})

gulp.task('clean', function () {
    return del('dist');
})
