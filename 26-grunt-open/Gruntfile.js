module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      open: {
        dev: {
          path: 'http://localhost/'
        }
      }
  });

  grunt.registerTask('default', [
    'open:dev'
  ]);
};
