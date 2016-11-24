const path = require('path');
const combiner = require('stream-combiner2');
const gulp = require('gulp');
const notifier = require('node-notifier');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const gutil = require('gulp-util');
const jarvis = require('gulp-jarvis');
const watch = require('gulp-watch');
const helper = require('./helper');
const deepAssign = require('deep-assign');
var processors = {
    less: require('gulp-less'),
    sass: require('gulp-sass'),
    stylus: require('gulp-stylus'),
};

var defaultConfig = {
    entry: '**/*.entry.less',
    output: 'dist/css/',
    watch: ['**/{*.entry.less,*.less,*.css}', '!**/*.entry.css', '!{node_modules,bower_components}/**/*'],
    development: true,
    processor: 'less',
    plugins: {
        'autoprefixer': {browsers: '> 5%'},
        'less': {paths: ['bower_components', 'node_modules']},
        'clean': {read: false},
        'clean-css': undefined,
        'watch': undefined,
        'sass': {includePaths: ['bower_components', 'node_modules']},
        'stylus': undefined,
    },
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

                processors[config.processor](config.plugins[config.processor]),
                autoprefixer(config.plugins['autoprefixer']),
                (!config.development ? minify(config.plugins['clean-css']) : gutil.noop()),

                (config.development ? sourcemaps.write() : gutil.noop()),
                jarvis.dest(config.output).on('end', (done) => {
                    helper.success('Processed', config.watchName, new Date() - stime);
                })
            ).on('error', (error) => {
                notifier.notify({
                    title: 'JARVIS.CSS error',
                    message: error.message || '',
                    sound: true
                });
                helper.error('JARVIS.CSS error', error.message);
                if (typeof config.onError == 'function') config.onError(error);
            });
        };
    },
    clean: function (folder, gulpCleanConfig) {
        return function (done) {
            return gulp.src(folder, {read: false})
                .pipe(clean(gulpCleanConfig));
        }
    },
    defineTasks: function (config) {
        config = Object.assign(defaultConfig, {
            buildName: 'css:build',
            watchName: 'css:watch',
            cleanName: 'css:clean'
        }, config);

        gulp.task(config.buildName, (config.clean ? [config.cleanName] : undefined), (done) => {
            return this.run(config)(done);
        });

        gulp.task(config.watchName, [config.buildName], (done) => {
            watch(config.watch, (file) => {
                return this.run(config)(done);
            });
        });

        if (config.clean) {
            gulp.task(config.cleanName, this.clean(config.clean));
        }
    }
};