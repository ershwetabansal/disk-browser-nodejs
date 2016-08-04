module.exports = function(config) {
    config.set({
        frameworks: ['browserify','jasmine'],
        reporters: ['dots'],
        browsers: ['PhantomJS'],
        files: [
            'node_modules/jquery/dist/jquery.min.js',
            'tests/unit/**/*Spec.js'
        ],
        preprocessors: {
            'tests/unit/**/*.js': [ 'browserify' ]
        },
        browserify: {
            debug: true,
            transform: [ 'brfs' ]
        },
        // plugins to load
        plugins: [
          'karma-jasmine',
          'karma-browserify',
          'karma-phantomjs-launcher'
        ]
    });
};