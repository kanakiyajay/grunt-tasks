module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    browserSync: {
      bsFiles: {
        src: 'css/*.css'
      },
      options: {
        server: {
          baseDir: './'
        }
      }
    }
  });

  grunt.registerTask('default', ['browserSync']);
};
