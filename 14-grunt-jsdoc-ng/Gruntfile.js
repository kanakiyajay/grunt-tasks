module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    'jsdoc-ng' : {
      dist : {
        src: ['src/*.js', 'README.md' ],
        dest: 'docs',
        template : 'jsdoc-ng',
        options: {
        }
      }
    }
  });

  grunt.registerTask('default', ['jsdoc-ng']);
};