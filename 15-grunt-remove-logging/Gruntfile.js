module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    removelogging: {
      dist: {
        files: [{
          expand: true,
          src: ['*.js'],
          cwd: 'js/',
          dest: 'dist/js/'
        }]
      }
    }
  });

  grunt.registerTask('default', [
      'removelogging'
  ]);
};