module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: 'project.zip'
        },
        files: [{
          cwd: 'assets/css/',
          expand: true,
          src: ['**/*'],
          dest: 'styles'
        }, {
          cwd: 'assets/js/',
          expand: true,
          src: ['**/*'],
          dest: 'scripts'
        }]
      }
    }
  });

  grunt.registerTask('default', ['compress']);
};
