const css = require('./index');

css.defineTasks({
    // processor: 'sass',
    // entry: 'test/src/**/*.entry.scss',
    output: 'test/dist/',
    // watch: 'test/src/**/{*.entry.scss,*.scss,*.css}',
    clean: 'test/dist',
});