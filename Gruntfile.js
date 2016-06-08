var dirname = require('path').dirname,
    test = require('tslint/lib/test');

module.exports = function (grunt) {
  grunt.initConfig({
    ts: {
      default: {
        options: {
          noImplicitAny: true,
          inlineSources: true,
          inlineSourceMap: true,
        },
        src: [
          'src/**/*.ts',
          'node_modules/tslint/lib/tslint.d.ts'
        ],
      }
    },
    tslint: {
      options: {
        configuration: 'tslint.json',
      },
      default: {
        src: [
          'lib/**/*.ts',
        ]
      }
    },
  });

  ['grunt-ts', 'grunt-tslint'].forEach(function (pkg) {
    grunt.loadNpmTasks(pkg);
  });

  grunt.registerTask('test', "Invoke tslint self-tests", function () {
    var paths = grunt.file.expand('test/**/tslint.json');

    var results = paths.map(function (path) {
      return test.runTest(dirname(path), 'lib/rules');
    });

    var success = true;
    results.forEach(function (result) {
      if (!test.consoleTestResultHandler(result)) {
        success = false;
      }
    });

    return success;
  });

  grunt.registerTask('default', ['tslint', 'ts', 'test']);
};