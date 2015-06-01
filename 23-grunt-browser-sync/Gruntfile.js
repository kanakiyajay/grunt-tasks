module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    browserSync: {
      bsFiles: {
        src: 'css/*.css'
      },
      options: {
          proxy: 'localhost:80'
      }
    }
  });

  grunt.registerTask('default', ['browserSync']);
};
