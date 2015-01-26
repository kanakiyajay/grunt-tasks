module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      all: {
        files: {
          'dist/js/minified.js': ['src/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['uglify:all']);
  grunt.registerTask('nw', ['newer:uglify:all']);

};