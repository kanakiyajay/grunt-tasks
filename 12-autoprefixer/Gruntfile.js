module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
      },
      main: {
        expand: true,
        flatten: true,
        src: 'css/*.css',
        dest: 'dist/'
      }
    }
  });

  grunt.registerTask('default', ['autoprefixer']);
};