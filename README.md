# jarvis-css
Gulp task for compiling sass, scss, less, stylus to css.

[![NPM](https://nodei.co/npm/jarvis-less.png)](https://npmjs.org/package/jarvis.css)

## Installation
`npm i --save-dev jarvis.css`

## Usage
I tried to do usage of this task as simple as posible.
The following example will compile all the _*.entry.less_ files under the folder _src/_ into to destination folder _dist/_, and rename it all from _*.entry.less_ to _*.bundle.css_

```javascript
var gulp = require('gulp');
var css = require('./index');

gulp.task('css:build', css.build({
    entry: 'src/**/*.entry.less',
    output: 'dist/',
}));

gulp.task('css:watch', ['css:build'], () => {
    gulp.watch('src/**/*.{entry.less, less, css}', () => {
        gulp.run('css:build');
    });
});

gulp.task('css:clean', css.clean('test/dist'));

//-----------------or---------------------

var gulp = require('gulp');
var css = require('./index');

css.defineTasks({
    processor: 'sass',
    entry: 'test/src/**/*.entry.scss',
    output: 'test/dist/',
    watch: 'test/src/**/{*.entry.scss,*.scss,*.css}',
    clean: 'test/dist',
});
```

So we had the folowing file tree:

     src/
         style.entry.less
         common.entry.less

after running less:build (or less:watch if you want to watching changes), we will have:

     src/
         style.entry.less
         common.entry.less
     dist/
         style.bundle.css
         common.bundle.css

#### Jarvis
But the killer-feature of this task is [gulp-jarvis](https://github.com/Sujimoshi/gulp-jarvis).
With help of this plugin we can easily redeclare the destination folder by adding a special comment line to the beginning of the entry file.
So let's go back to the previous example:

     src/
         style.entry.less
         common.entry.less

Lets change the contents of the file style.entry.less a little bit. We will add the following line to the beginning of style.entry.less
`/*file-output:dist/style/style.css;*/`

And after this we run less:build again, at the output we will have:

     src/
         style.entry.less
         common.entry.less
     dist/
         common.bundle.css
         style/
             style.css
             
See, its so easy.

## Options
The API of the package has only one method:

##### css.build(options)
Run task with given config

```javascript
var defaultConfig = {
    entry: `src/**/*.entry.less`,
    output: 'dist/css/',
    development: true,
    processor: 'less', // less|sass|stylus
    plugins: {
        'autoprefixer': {browsers: '> 5%'}, //gulp-autoprefixe config
        'less': {paths: ['bower_components', 'node_modules']}, //gulp-less config
        'clean': {read: false}, //gulp-clean config
        'clean-css': undefined, //gulp-clean-css config
        'watch': undefined, //gulp-watch config (chokidar)
        'sass': {includePaths: ['bower_components', 'node_modules']}, //gulp-sass config
        'stylus': undefined //gulp-stylus config
    },
    onError: null // onError callback
};
```

##### css.defineTasks(options)
Define tasks with given names and config.

```javascript
var defaultConfig = {
    buildName: 'css:build',
    watchName: 'css:watch',
    cleanName: 'css:clean',
    entry: `src/**/*.entry.less`,
    output: 'dist/css/',
    development: true,
    processor: 'less', // less|sass|stylus
    plugins: {
        'autoprefixer': {browsers: '> 5%'}, //gulp-autoprefixe config
        'less': {paths: ['bower_components', 'node_modules']}, //gulp-less config
        'clean': {read: false}, //gulp-clean config
        'clean-css': undefined, //gulp-clean-css config
        'watch': undefined, //gulp-watch config (chokidar)
        'sass': {includePaths: ['bower_components', 'node_modules']}, //gulp-sass config
        'stylus': undefined //gulp-stylus config
    },
    onError: null // onError callback
};
```
