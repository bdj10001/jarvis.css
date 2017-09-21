const css = require('./src/index');
const gulp = require('gulp')

const cssConf = {output: 'test/dist', input: 'test/src'}
gulp.task('css:build', css.build(cssConf))
gulp.task('css:watch', ['css:build'], css.watch(cssConf))