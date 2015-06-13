module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    purifycss: {
      options: {

      },
      target: {
        src: ['src/*.html'], // Observe all html files
        css: ['src/css/*.css'], // Take all css files into consideration
        dest: 'dest/tmp.css' // Write to this path
      }
    }
  });

  grunt.registerTask('default', ['purifycss']);
};