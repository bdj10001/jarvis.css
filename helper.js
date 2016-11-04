var gulp = require('gulp');
var gutil = require('gulp-util');

module.exports = {
    success: function (white, cyan, time) {
        var str = white;
        if(cyan) str += ` '${gutil.colors.cyan(cyan)}'`;
        if(time) str += ' after ' + gutil.colors.magenta(`${time} ms`);
        gutil.log(str);
    },
    error: function (white, red) {
        var str = white;
        if(red) str += ` '${gutil.colors.red(red)}'`;
        gutil.log(str);
    }
};