'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function() {
    // Mensaje de bienvenida del generador,
    // Con el metodo 'this.log'podemos imprimir en consola lo que queramos.
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.bold.yellow('Atmira') + ' Generator (NEO)' + chalk.red(' seed-bk-atmira') + ' generator!'
    ));

    this.log(
      chalk.red('This Generator use Angular 1.4.14 with Polyfill(Angular Component)') + '\n' +
      chalk.yellow('This Generator use Sass, Gulp') + '\n' +
      chalk.yellow('This Generator use Karma, jshint, jscs, scss-lint recomended by John Papa') + '\n' +
      chalk.red('This Generator use ES5' + '\n'));

    // Array de preguntas a realizar por el asistente.
    // Podemos observar en este ejemplo varios parámetros por preguntas
    // 'type': Formato de pregunta
    // (input | confirm | list | rawlist | expand | checkbox | password | editor)
    // 'name': Parámetro necesario para después acceder a la respuesta del usuario.
    // 'message': Mensaje a usar por el asistente.
    // 'default': Valor por defecto al introducir 'intro' sin indicar ningún valor.
    // Como explicamos al principio del post
    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of the proyect?',
      default: this.appname
    }];

    // Una vez terminado el asistente, tendremos disponibles las respuestas del usuario.
    // Con el parametro de la función: 'props'
    // To access props later use this.props.someAnswer;
    // En este método podemos hacer lo que necesitemos con las respuestas del usuario.

    return this.prompt(prompts).then(function(props) {
      this.props = props;
      // To access props later use this.props.someOption;
      //this.log(this.props.name);
      this.log('Name of project => ' + chalk.red(this.props.name));

    }.bind(this));
  },
  // Mediante este método, el generador copia todos los archivos que indiquemos
  // en el nuevo directorio.
  //
  //   // En este método crearemos y copiaremos los archivos y directorios
  // de nuestra carpeta 'templates' al nuevo directorio.
  // Como podemos observar hay dos métodos para copiar: copyTpl y copy.
  // El primero nos permite escribir en los ficheros
  // usando parámetros introducidos en el asistente.
  // En el parámetro 'this.destinationPath', indicamos el archivo de destino
  // y le podemos pasar parámetros.
  // Si queremos que el archivo de destino sea igual que el de origen,
  // usamos el método 'copy'

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'), {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('gulp.config.js'),
      this.destinationPath('gulp.config.js')
    );
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      this.templatePath('karma.conf.js'),
      this.destinationPath('karma.conf.js')
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
    this.fs.copy(
      this.templatePath('LICENSE.md'),
      this.destinationPath('LICENSE.md')
    );
    this.fs.copy(
      this.templatePath('.jscsrc'),
      this.destinationPath('.jscsrc')
    );
    this.fs.copy(
      this.templatePath('.jshintrc'),
      this.destinationPath('.jshintrc')
    );
    this.fs.copy(
      this.templatePath('.scss-lint.yml'),
      this.destinationPath('.scss-lint.yml')
    );
    this.directory(
      this.templatePath('src'),
      this.destinationPath('src')
    );
  },

  install: function() {
    this.npmInstall(['tsd'], {
      'global': true
    });
    this.npmInstall();
    this.runInstall('bower');
  }
});
