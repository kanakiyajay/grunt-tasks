module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    csscomb: {
      dist: {
        files: {
          'css/style.comb.css': ['css/style.css']
        }
      }
    }
  });

  grunt.registerTask('default', [
    'csscomb'
  ]);
};