/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: './server/frontend/build',
    compile_dir: './server/frontend/dist',
    cordova_dir: './cordova/www',
    cordova_all_dir: './cordova',
    src_dir: 'server/frontend/src',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `server/frontend/src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`server/frontend/src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.*/
    app_files: {
        js: ['server/frontend/src/**/*.js', '!server/frontend/src/**/*.spec.js', '!server/frontend/src/assets/**/*.js'],
        jsunit: ['server/frontend/src/**/*.spec.js'],

//    coffee: [ 'server/frontend/src/**/*.coffee', '!server/frontend/src/**/*.spec.coffee' ],
//    coffeeunit: [ 'server/frontend/src/**/*.spec.coffee' ],

        atpl: ['server/frontend/src/app/**/*.tpl.html'],
        ctpl: ['server/frontend/src/common/**/*.tpl.html'],

        html: ['server/frontend/src/index.html'],
        less: 'server/frontend/src/less/main.less'
    },

    /**
     * This is a collection of files used during testing only.
     */
//  test_files: {
//    js: [
//      'bower_components/angular-mocks/angular-mocks.js'
//    ]
//  },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`bower_components/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
        js: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/lodash/lodash.js',
            'bower_components/socket.io-client/socket.io.js'
        ],
        css: [
            'bower_components/angular-material/angular-material.css'
        ],
        assets: []
    }
};
