var gulp = require('gulp');
var gh = require('gulp-gh-pages');
var webpack = require('webpack');
var gutil = require('gulp-util');
var pkg = require('./package.json');
/**
 * Push build to gh-pages
 */

gulp.task('build', (callback) => {
    webpack(require('./webpack.config.js'), (err, stats) => {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString());

        callback();
    });
});

gulp.task('vers', () => {
    var v = pkg.version;
    return gulp.src(['lib/*.*']).pipe(gulp.dest(`lib/${  v}`));
});
gulp.task('versioning', gulp.series('build', 'vers'));

gulp.task('depl', () => gulp.src(['./lib/**/*']).pipe(gh({ force: true })));
gulp.task('deploy', gulp.series('versioning', 'depl'));

gulp.task('depl-prod', () => gulp.src(['./lib/**/*']).pipe(gh({ force: true, origin: 'upstream' })));

gulp.task('deploy-prod', gulp.series('versioning', 'depl-prod'));
