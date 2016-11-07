'use strict';

module.exports = function() {
    var src = 'src/';
    var app = 'src/app/';
    var components = 'src/app/components';
    var assets = 'src/app/assets';
    var sass = 'src/app/sass';
    var report = './report/';
    var root = './';
    var temp = './.tmp/';
    var specRunnerFile = 'specs.html';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({
        devDependencies: true
    })['js'];
    var bower = {
        json: require('./bower.json'),
        directory: './bower_components/'
    };
    var nodeModules = 'node_modules';

    var config = {
        /**
         * File paths
         */
        // all javascript that we want to vet
        alljs: [
            './src/**/*.js'
        ],
        build: './dist/',
        app: app,
        css: app + 'sass/main.css',
        fonts: bower.directory + 'font-awesome/fonts/**/*.*',
        html: app + '**/*.html',
        images: assets + '/img/**/*',
        index: src + 'index.html',
        // app js, with no specs
        js: [
            components + '**/*.module.js',
            components + '**/*.js',
            '!' + components + '**/*.spec.js'
        ],
        mainJs: src + 'main.js',
        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],
        sass: app + 'sass/main.scss',
        sassFolder: sass,
        report: report,
        root: root,
        source: src,
        stubsjs: [
            bower.directory + 'angular-mocks/angular-mocks.js',
            app + 'stubs/**/*.js'
        ],
        //temp: temp,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * plato
         */
        plato: {
            js: app + '**/*.js'
        },

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                root: 'app/',
                standalone: false
            }
        },

        /**
         * Bower and NPM files
         */
        bower: bower,
        packages: [
            './package.json',
            './bower.json'
        ],
        /**
         * specs.html, our HTML spec runner
         */
        specRunner: src + specRunnerFile,
        specRunnerFile: specRunnerFile,

        /**
         * The sequence of the injections into specs.html:
         *  1 testlibraries
         *      mocha setup
         *  2 bower
         *  3 js
         *  4 spechelpers
         *  5 specs
         *  6 templates
         */
        testlibraries: [
            nodeModules + '/jasmine/bin/jasmine.js',
            //nodeModules + '/mocha/mocha.js',
            nodeModules + '/chai/chai.js',
            nodeModules + '/sinon-chai/lib/sinon-chai.js'
        ],
        specHelpers: [src + 'test-helpers/*.js'],
        specs: [app + '**/*.spec.js'],
        serverIntegrationSpecs: [src + '/tests/server-integration/**/*.spec.js'],

        /**
         * Node settings
         */
        defaultPort: '8001'
    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    /**
     * karma settings
     */
    config.karma = getKarmaOptions();

    return config;

    ////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                //bowerFiles,
                config.specHelpers,
                app + '**/*.module.js',
                app + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {
                        type: 'html',
                        subdir: 'report-html'
                    }, {
                        type: 'lcov',
                        subdir: 'report-lcov'
                    }, {
                        type: 'text-summary'
                    } //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[app + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};
