# jarvis-css
Extremely fast gulp task for compiling sass, scss, less, stylus to css. Easy config, and use.

[![NPM](https://nodei.co/npm/jarvis.css.png)](https://npmjs.org/package/jarvis.css)

## Installation
`npm i --save-dev jarvis.css`

## Usage
I tried to do usage of this task as simple as posible.
The following example will compile all the _*.entry.less_ files under the folder _config.base_ into to destination _config.output_

```javascript
const css = require('./src/index');
const gulp = require('gulp')

const cssConf = {output: 'test/dist', base: 'test/src', processor: 'less'}
gulp.task('css:build', css.build(cssConf))
gulp.task('css:watch', ['css:build'], css.watch(cssConf))

```

## API
The API of the package has two methods:

### css.build(options) - Run task with given config

```javascript
var defaultConfig = {
    input: `src/css/`, // input folder, only strings alowed
    output: 'dist/css/', // output folder, only strings alowed
    development: true, // set false for minifing and disable sourcemaps
    processor: 'less', // less|sass|stylus
    plugins: {
        'autoprefixer': {browsers: '> 1%', remove: false}, //gulp-autoprefixer config
        'clean-css': undefined, //gulp-clean-css config
        'less': {paths: ['bower_components', 'node_modules']}, //gulp-less config
        'sass': {includePaths: ['bower_components', 'node_modules']}, //gulp-sass config
        'stylus': undefined //gulp-stylus config
    }
};
```

### css.watch(options) - Run watcher for all preprocessors file extensions, under input folder.

```javascript
var defaultConfig = {
    input: `src/css/`, // input folder, only strings alowed
    output: 'dist/css/', // output folder, only strings alowed
    development: true, // set false for minifing and disable sourcemaps
    processor: 'less', // less|sass|stylus
    plugins: {
        'autoprefixer': {browsers: '> 1%', remove: false}, //gulp-autoprefixer config
        'clean-css': undefined, //gulp-clean-css config
        'less': {paths: ['bower_components', 'node_modules']}, //gulp-less config
        'sass': {includePaths: ['bower_components', 'node_modules']}, //gulp-sass config
        'stylus': undefined //gulp-stylus config
    }
};
```
