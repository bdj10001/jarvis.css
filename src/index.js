const path = require('path');
const jarvis = require('jarvis.core')
const gulp = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');

let processors = {
    less: () => require('gulp-less'),
    sass: () => require('gulp-sass'),
    stylus: () => require('gulp-stylus'),
};

let defaultConfig = {
    entry: [
        '**/{*.build.less,*.build.sass,*.build.scss,*.build.stylus}',
        '!{node_modules,bower_components}/**/*'
    ],
    input: 'src/css/',
    output: 'dist/css/',
    watch: [
        '**/{*.less,*.css,*.sass,*.scss,*.stylus}',
        '!**/*.build.css',
        '!{node_modules,bower_components}/**/*'
    ],
    development: true,
    processor: 'less',
    plugins: {
        'autoprefixer': {
            browsers: '> 1%', 
            remove: false //makes autoprefixer about 10% faster
        },
        'less': { paths: ['bower_components', 'node_modules'] },
        'clean-css': undefined,
        'sass': { includePaths: ['bower_components', 'node_modules'] },
        'stylus': undefined,
    }
};

let resolveGlobs = function(base, entries) {
    let res = Array.isArray(entries) ? entries : [entries]
    res = res.map(el => el.charAt(0) !== '/' ? path.resolve(base, el) : el)
    res.push('!{node_modules,bower_components}/**/*')
    return res;
}

let css = module.exports = {
    watch: function (conf) {
        let config = jarvis.dassign(defaultConfig, conf);
        return function (done) {
            jarvis.watch(resolveGlobs(config.input, config.watch), (file) => {
                return css.build(config)(done);
            });
        }
    },
    build: function (conf) {
        let config = jarvis.dassign(defaultConfig, conf);
        return function (done) {
            return jarvis.combine(
                gulp.src(resolveGlobs(config.input, config.entry), { base: config.input }),
                (config.development ? sourcemaps.init() : jarvis.gutil.noop()),
                processors[config.processor]()(config.plugins[config.processor]),
                autoprefixer(config.plugins['autoprefixer']),
                (!config.development ? minify(config.plugins['clean-css']) : jarvis.gutil.noop()),
                (config.development ? sourcemaps.write() : jarvis.gutil.noop()),
                jarvis.destClean(config.output),
                gulp.dest(config.output)
            )
        };
    }
};