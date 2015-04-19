module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jsonlint: {
      sample: {
        src: ['data/cities.json', 'config/config.json']
      }
    }
  });

  grunt.registerTask('default', ['jsonlint']);
};