module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      responsive_images: {
        main: {
          options: {
            engine: 'im',
            sizes: [{
              width: 100
            }, {
              upscale: true,
              width: 250
            }]
          },
          files: [{
            expand: true,
            src: ['img/**/*.{gif,png,jpg,jpge}'],
            cwd: 'src/',
            dest: 'dist/'
          }]
        }
      }
  });

  grunt.registerTask('default', ['responsive_images']);
};