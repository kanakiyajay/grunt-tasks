module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: 'project.zip'
        },
        expand: true,
        cwd: 'assets/',
        src: ['**/*'],
        dest: '/'
      }
    }
  });

  grunt.registerTask('default', ['compress']);
};
