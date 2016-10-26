'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    lazy: true
});
var open = require('gulp-open');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var cssnano = require('gulp-cssnano');
//var inject          = require('gulp-inject');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var scsslint = require('gulp-scss-lint');
//var print           = require('gulp-print');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var angularFilesort = require('gulp-angular-filesort');
var sass = require('gulp-sass');
var order = require('gulp-order');
//var debug           = require('gulp-debug');
var sourcemaps = require('gulp-sourcemaps');
var bowerFiles = require('main-bower-files');
var copy = require('gulp-copy');
//injecta múltiples streams diferentes
var es = require('event-stream');
var connect = require('gulp-connect');
var _ = require('gulp-lodash');
var fileExists = require('file-exists');

var path = require('./gulp.config')();
var stripDebug = require('gulp-strip-debug');
//Limpia capeta de construccion
var del = require('del');

//Inyeccion de Bower
var wiredep = require('wiredep').stream;
//Transforma SASS a CSS
var compass = require('gulp-compass');
//Usamos runSequence porque es la versión 3.9.x de Gulp, cuando se suba de versión
//se debe actualizar esta tarea con la nueva versión. Esto es una lista de tareas
//que se deben ejecutar secuencialmente
var runSequence = require('run-sequence');
//Optimiza imágenes
//var imagemin = require('gulp-imagemin');

// Edit this values to best suit your app
var WEB_PORT = 9898;
var APP_DIR = 'app';

//Fin Variables

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

/****
            INICIO TAREAS
******/

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

//gulp.task('default', ['server']);

// TODO: revisar completa tarea build
// Production build
gulp.task('build', function(done) {
    //runSequence('assets:img', 'wiredep', 'build-sass', 'inject', done);
    runSequence('wiredep', 'build-sass', 'inject', done);
});

//gulp.task('build', ['clean', 'pug', 'compass', 'scripts', 'copy:bower-components', 'copy:fonts', 'copy:images', 'copy:data', 'copy:pdf-samples']);

// Static Server + watching scss/html files
gulp.task('server', function() {
    browserSync.init({
        logLevel: 'debug',
        //startPath:'./src',
        //Puede escuchar(watch) varios archivos con los que trabajamos y recargarlo automaticamente, varios archivos, array.
        //files: "dist/**/*.*",
        server: {
            baseDir: 'src',
            index: 'index.html',
            routes: {
                '/bower_components': 'bower_components'
            }
        },
        //defaultFile: 'src/index.html',
        browserSync: true,
        port: WEB_PORT,
        //browser: 'google chromium',
        open: 'local'
    });

    //gulp.src('index.html', {cwd: './src'})
    //  .pipe(open({app: 'chrome', uri: 'localhost:9898'}));

    //sass scripts watch
    gulp.watch(['src/app/**/*.scss'], ['build-sass'], function() {
        //runSequence('inject:scss', 'sass');
        //browserSync.reload();
        //console.log('Ha recargado SCSS');
        log('Ha recargado SCSS');
        //done();
    });

    //javascript watch. Angular 1.5
    /*gulp.watch(path.alljs, ['concatMain'], function(done) {
        browserSync.reload();
        console.log('Ha recargado JS');
        done();
    });*/

    gulp.watch(path.alljs, function(done) {
        browserSync.reload();
        //console.log('Ha recargado JS');
        log('Ha recargado JS');
    });

    //html watch
    gulp.watch('./src/app/**/*.html').on('change', browserSync.reload);
    //console.log('Ha recargado!!');
    //log('Ha recargado!!');
});

/***  BOWER ***/

// Inject libraries via Bower in between of blocks "bower:css" and  "bower:js" in index.html
gulp.task('wiredep', function() {
    return gulp.src(path.index)
        .pipe($.debug({
            verbose: true
        }))
        .pipe($.print())
        .pipe(plumber({
            errorHandler: function(err) {
                this.emit('end');
                console.error(err);
            }
        }))
        .pipe(wiredep(path.getWiredepDefaultOptions(), {
            onError: function(err) {
                console.log(err);
            }
        }))
        .pipe(gulp.dest(path.source))
        .pipe(browserSync.stream());
});

/*
 * wiredep:sass => Injecta los SCSS que tenga/necesite bower dentro de main.scss
 */

//NOTA: si se usa, cambia los estilos.
gulp.task('wiredep:sass', function() {
    return gulp.src('main.scss', {
            cwd: './src/app/sass'
        })
        .pipe($.debug({
            verbose: true
        }))
        .pipe(plumber({
            errorHandler: function(err) {
                this.emit('end');
                console.error(err);
            }
        }))
        .pipe(wiredep({
            //'directory': '../../bower_components',
            'ignorePath': '.scss',
            onError: function(err) {
                console.log(err);
            }
        }))
        .pipe(gulp.dest('./src/app/sass'));

});
/**** FIN BOWER ****/

/** SASS **/

gulp.task('build-sass', function(done) {
    runSequence('inject:scss', 'sass');
    //runSequence('inject:css', 'sass');
    //browserSync.reload();
    done();
});

/*
 * Inject:scss  => injecta SCSS en main.scss con la etiqueta personalizada
 */
gulp.task('inject:scss', function() {

    var directory = '../../..';

    return gulp.src(path.sass)
        /**
         * Dynamically injects @import statements into the main main.scss file, allowing
         * .scss files to be placed around the app structure with the component
         * or page they apply to.
         */

    .pipe($.inject(gulp.src(['src/app/**/*.scss', '!./src/app/sass/main.scss'], {
            read: false
        }), {
            starttag: '// injectorSCSS',
            endtag: '// endinjectorSCSS',
            transform: function(filepath) {
                log('------------>' + filepath);
                return '@import \'' + directory + filepath.replace('.scss', '') + '\';';
            }
        }))
        //poner aquí la tarea sass para que lo compile directamente a CSS
        .pipe(gulp.dest(path.sassFolder));
});

/*
 * TAREA EN CONSTRUCCION. NO USAR
 */
gulp.task('inject:bower', function() {

    //Tarea sin terminar. No usar

    var directorio = '../../..';

    var bowerOrder = path.getOrderInyectorBowerSCSS();

    gutil.log('path.sass ===> ' + path.sass);

    gutil.log('bowerOrder ===> ' + bowerOrder);

    return gulp.src(path.sass)
        //return gulp.src('src/app/sass/main.scss')
        /**
         * Dynamically injects @import statements into the main main.scss file,
         * allowing .scss files to be placed around the app structure, between the tags
         * injectorBowerSCSS and endinjectorBowerSCSS with the component
         * or page they apply to.
         */

    //Inyección dinámica de componentes de bower
    .pipe($.debug({
            verbose: true
        }))
        .pipe($.inject(gulp.src(['./bower_components/**/*.scss'], {
            read: false
        }).pipe(order(bowerOrder)), {
            starttag: '// injectorBowerSCSS',
            endtag: '// endinjectorBowerSCSS',
            transform: function(filepath) {
                var file = filepath.replace('/bower_components', '');
                console.log('------------------------>' + file);
                //if (file.indexOf('_') === -1) {
                var slash = file.lastIndexOf('/');
                if (slash > 0 && file.charAt(slash + 1) === '_') {
                    file = file.substr(0, slash + 1) + '' + file.substr(slash + 2);
                    console.log('file NUEVO ===> ' + file);
                }
                if (_.indexOf(bowerOrder, file)) {
                    console.log('------------------------>' + filepath);
                    return '@import \'' + directorio + filepath.replace('.scss', '') + '\';';
                }
            }
        }))
        .pipe($.print())
        //poner aquí la tarea sass para que lo compile directamente a CSS
        .pipe(gulp.dest('./src/app/sass'));
});

/*
 * SASS => Tarea que transforma el main.scss a main.css
 */
gulp.task('sass', function() {
    //No se puede usar gulp SASS porque depende de librerías de compass
    return gulp.src(path.sass)
        .pipe($.debug({
            verbose: true
        }))
        .pipe(plumber({
            errorHandler: function( /*err*/ ) {
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        //.pipe(compass({
          //  style: 'expanded',
          //  comments: 'description',
          //  css: path.sassFolder,
          //  sass: path.sassFolder
        //}))
        .pipe(sass({ compass: true, sourcemap: true, style: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.sassFolder))
        //.pipe(browserSync.stream())
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Looks for code correctness errors in SASS and prints them
gulp.task('scss-lint', function() {
    return gulp.src(path.styles)
        .pipe(plumber())
        .pipe(scsslint());
});
//**JS**//

/*
 * Inject => Injecta los js/css de bower dentro de HTML. Tarea a Eliminar. Revisar
 */
gulp.task('inject', function() {

    var injectScripts = gulp.src(path.alljs)
        .pipe(angularFilesort());

    var injectStyles = gulp.src(path.css);


    //var injectScripts = gulp.src(path.alljs);
    //.pipe(order(path.jsOrder))
    //.pipe(angularFilesort());

    var wiredepOptions = path.getWiredepDefaultOptions();

    var injectOptions = {
        //addRootSlash: false
        relative: true
    };

    gutil.log('Inyección de dependecias en el index.html');
    gutil.log('path.index ===> ' + path.index);
    gutil.log('path.css ===> ' + path.css);
    gutil.log('path.alljs ===> ' + path.alljs);
    //revisar
    return gulp.src(path.index)
        .pipe($.debug({
            verbose: true
        }))
        .pipe(plumber())
        //.pipe($.inject(injectStyles, injectOptions))
        //.pipe(gulp.dest(path.source))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(gulp.dest(path.source))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe(gulp.dest(path.source))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest(path.source))
        .pipe(browserSync.stream());
});

//Para angular 1.5. Quitar la injeccion Gulp del html y poner el fichero main.js
gulp.task('concatMain', function() {

    if (fileExists('src/main.js')) {
        log('el archivo ' + path.mainJs + ' se ha borrado');
        del('src/main.js');
    } else {
        log('No existe el archivo' + path.mainJs);
    }

    return gulp.src(['./src/**/*.js', '!./src/main.js'])
        .pipe($.debug({
            verbose: true
        }))
        .pipe(plumber())
        .pipe(order([
            '**/app.module.js',
            '**/app.routes.js',
            '**/*.module.js',
            '!**/app.boostrapping.js',
            '**/app.boostrapping.js'
        ]))
        .pipe(sourcemaps.init())
        .pipe($.concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src'))
        .pipe(browserSync.stream());
});

/*
 * inject:js => Tarea a Eliminar
 */
gulp.task('inject:js', function() {

    var injectScripts = gulp.src(path.alljs)
        .pipe(angularFilesort()).on('error', options.errorHandler('AngularFilesort'));
    var wiredepOptions = path.getWiredepDefaultOptions();

    var injectOptions = {
        //addRootSlash: false
        relative: true
    };

    gutil.log('Inyección de dependecias en el index.html');
    gutil.log('path.index ===> ' + path.index);
    gutil.log('path.alljs ===> ' + path.alljs);
    //revisar
    return gulp.src(path.index)
        .pipe($.debug({
            verbose: true
        }))
        .pipe(plumber())
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(gulp.dest(path.source))
        .pipe(wiredep(wiredepOptions))
        // write the injections to the src/app/index.html file
        .pipe(gulp.dest(path.source))
        .pipe(browserSync.stream());
    // so that src/app/index.html file isn't modified
    // with every commit by automatic injects
});

//Validate-Code task
gulp.task('lint', ['jshint', 'jscs']);

// Looks for code correctness errors in JS and prints them
gulp.task('jshint', function() {
    return gulp.src(path.alljs)
        .pipe($.debug({
            verbose: true
        }))
        .pipe(plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

// Looks for code style errors in JS and prints them. Reporting & fixing & failing on lint error
gulp.task('jscs', function() {
    return gulp.src(path.alljs)
        .pipe($.debug({
            verbose: true
        }))
        .pipe(plumber())
        .pipe(jscs({
            fix: true
        }))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'));
    //.pipe(gulp.dest('./dist'));
});

gulp.task('vet', function() {

    $.gutil.log('Analyzing source with JSHint and JSCS and FIX with JSCS');

    return gulp.src(path.alljs)
        .pipe($.debug({
            verbose: true
        }))
        .pipe(plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'))
        .pipe($.jscs({
            fix: true
        }))
        .pipe($.jscs.reporter())
        .pipe($.jscs.reporter('fail'));
});

/****
            FIN TAREAS
******/

/*******
            ASSETS
********/

// build the assets img into the dist folder
// Only PNG, JPEG, GIF y SVG
gulp.task('assets:img', function() {
    gutil.log('Optimizando imágenes .. ');
    gutil.log('path.images ===> ' + path.images);

    return gulp.src(path.images)
        .pipe($.debug({
            verbose: true
        }))
        .pipe(plumber())
        .pipe($.print())
        //.pipe(imagemin())
        .pipe(gulp.dest(path.build));
});

/*******
            FIN ASSET
********/

gulp.task('inject:css', ['css'], function() {

    //var injectStyles = gulp.src(['src/app/**/*.css', '!src/app/sass/main.css']);
    var injectStyles = gulp.src(['src/app/**/*.scss']);

    var injectOptions = {
        //addRootSlash: false
        relative: true
    };

    gutil.log('Inyección de dependecias CSS en el index.html');
    gutil.log('path.index ===> ' + path.index);
    gutil.log('path.css ===> ' + path.css);

    return gulp.src(path.index).pipe($.debug({
            verbose: true
        }))
        .pipe(plumber({
            errorHandler: function( /*err*/ ) {
                this.emit('end');
            }
        })).pipe($.inject(injectStyles, injectOptions))
            .pipe(gulp.dest(path.source))
        .pipe(browserSync.stream());
});

gulp.task('css', function(cb) {

    //var sass = gulp.src(['src/app/**/*.scss', '!src/app/sass/main.scss']);
    var sass = gulp.src(['src/app/**/*.scss']);

    var transform = compass({
        style: 'expanded',
        comments: 'description',
        css: './src/app',
        sass: './src/app'
    });

    var transform2 = $.sass();
    var destSass = gulp.dest('./src/app');

    var injectOptions = {
        //addRootSlash: false
        relative: true
    };

    gutil.log('variable funcion ======> ' + cb);

    gutil.log('Inyección de dependecias CSS en el index.html');
    gutil.log('path.index ===> ' + path.index);
    gutil.log('path.css ===> ' + path.css);

    return sass
        .pipe($.debug({
                verbose: true
            }))
            .pipe(plumber({
                errorHandler: function(err) {
                    //log(err);
                    this.emit('end');
                }
            }))
        .pipe(sourcemaps.init())
        .pipe(transform)
        .pipe(sourcemaps.write())
        .pipe(destSass)
        .pipe(browserSync.stream());
});
