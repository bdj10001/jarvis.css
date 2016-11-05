const postcss = require('gulp-postcss');
const less = require('postcss-less-engine');
const gulp = require('gulp');
const jarvis = require('gulp-jarvis');
const sourcemaps = require('gulp-sourcemaps');
const helper = require('./helper');
const deepAssign = require('deep-assign');

var defaultConfig = {
    entry: `src/**/*.entry.less`,
    output: 'dist/css/',
    development: true,
    processors: [],
    // plugins: {
    //     'autoprefixer': {browsers: '> 5%'},
    //     'less': {paths: ['bower_components', 'node_modules']},
    //     'clean': {read: false},
    //     'clean-css': undefined,
    //     'watch': undefined,
    //     'sass': {includePaths: ['bower_components', 'node_modules']},
    //     'stylus': undefined
    // },
    onError: null
};

module.exports = {
    run: function (conf) {
        var config = deepAssign(defaultConfig, conf);
        return function (done) {
            var stime = new Date();
            return combiner(
                gulp.src(config.entry),
                jarvis.parse(),
                (config.development ? sourcemaps.init() : gutil.noop()),

                postcss(config.processor),
                autoprefixer(config.plugins['autoprefixer']),

                // (!config.development ? minify(config.plugins['clean-css']) : gutil.noop()),
                (config.development ? sourcemaps.write() : gutil.noop()),
                jarvis.dest(config.output).on('end', (done) => {
                    helper.success('Processed', config.watchName, new Date() - stime);
                })
            ).on('error', (error) => {
                notifier.notify({
                    title: `Error occurred in JARVIS.CSS`,
                    message: error.message || '',
                    sound: true
                });
                helper.error('Less error', error.message);
                if (typeof config.onError == 'function') config.onError(error);
            });
        };
    }
};