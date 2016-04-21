/**
 * gulpfile.js - Gulpfile
 */
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import gulpUtil from 'gulp-util';
import notifier from 'node-notifier';
import runSequence from 'run-sequence';

/**
 * A hash mapping plugin names on actual result of requiring the plugins. Plugins are
 * all node modules listed in package.json with a name with prefix 'gulp-'. Names
 * are shortened by dropping their common prefix 'gulp-', and names containing dashes
 * are automatically converted to camelcase.
 * See also: https://github.com/jackfranklin/gulp-load-plugins
 *
 * @type {Object<string, ?>}
 */
const plugins = gulpLoadPlugins();

/**
 * Make a new error reporter for the task with description 'generalDescription'.
 *
 * @params {String} generalDescription - A general description of the error,
 *         not containing specific error instance details.
 * @params {Function=} customProcessor - A function extracting the plugin name
 *         and message from the error. Has to return a hash {plugin: <...>, message: <...>}.
 *         If not present, error is supposed to be a standard gulp stream error.
 * @return {Function} - The error reporter, which is a function taking an error, which it
 *         reports (visually and auditive) to the user.
 */
function makeErrorReporter (generalDescription, customProcessor) {
  return function (error) {
    // Visual error signalization
    notifier.notify({
      title: 'Warning: The task runner failed to process your source code',
      message: generalDescription
    });
    // Auditive error signalization
    gulpUtil.beep();
    // Report details in the console
    const processedError = customProcessor ? customProcessor(error) : error;
    gulpUtil.log(gulpUtil.colors.red(`Error (${processedError.plugin}): `),
                 processedError.message);
  };
}

// Application paths
// /////////////////

// Global private tasks
// ////////////////////

/*
 * Set the environment variable NODE_ENV to 'development' for this process (and its children)
 */
gulp.task('env:development', () => {
  process.env.NODE_ENV = 'development';
});

/*
 * Set the environment variable NODE_ENV to 'testing' for this process (and its children)
 */
gulp.task('env:testing', () => {
  process.env.NODE_ENV = 'testing';
});

// Linting
// ///////

/**
 * Mapping of globs on gulp tasks, related to linting.
 *
 * @type {Object<string, ?>}
 */
const lintGlobs = {
  scriptsLint: [ './gulpfile.babel.js', './test/**/*.js' ]
};

gulp.task('scriptsLint', () => {
  return gulp.src(lintGlobs.scriptsLint)
    .pipe(plugins.cached('scripts-lint'))
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .on('error', makeErrorReporter('Linting scripts failed.'));
});

// Watching related stuff
// //////////////////////

/*
 * Watches source code changes in order to relint where necessary.
 */
gulp.task('watch', () => {
  return plugins.autowatch(gulp, lintGlobs);
});

// Testing
// ///////

const testGlobs = {
  ch1: 'ch1_let_const',
  ch2: 'ch2_restparams',
  ch3: 'ch3_spreadoperator',
  ch4: 'ch4_destructuring',
  ch5: 'ch5_arrowfunctions',
  ch6: 'ch6_defaultparams',
  ch7: 'ch7_classes',
  ch8: 'ch8_collections',
  ch9: 'ch9_modules',
  ch10: 'ch10_promises',
  ch11: 'ch11_generators'
};

/*
 * Runs tests
 * Run with: gulp runTests --chapter chX
 */

gulp.task('runTests', () => {
  const chapterFolder = testGlobs[process.argv[4]];
  return gulp.src(`./test/${chapterFolder}/*.spec.js`)
    .pipe(plugins.mocha({
      require: [ './test/_init' ]
    }))
    .once('end', () => {
      process.exit(); // eslint-disable-line no-process-exit
    });
});

// Publicly accessible tasks
// /////////////////////////

/*
 * Lints and run the tests.
 */
gulp.task('test', (callback) => runSequence('env:testing', 'runTests', callback));
