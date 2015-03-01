module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      responsive_images: {
        main: {
          options: {
            engine: 'im'
          },
          files: [{
            expand: true,
            src: ['img/**/*.{gif,png,jpg,jpge}'],
            cwd: 'src/',
            dest: 'dist/'
          }]
        }
      },
      responsive_images_extender: {
        main: {
          options: {
            sizes: [{
              selector: 'img',
              sizeList: [{
                  cond: 'min-width: 300px',
                  size: '50vw'
                }, {
                  cond: 'min-width: 700px',
                  size: '70vw'
                }, {
                  cond: 'default',
                  size: '100vw'
              }]
            }]
          },
          files: [{
            expand: true,
            src: ['**/*.{html,htm,php}'],
            cwd: 'src/',
            dest: 'dist/'
          }]
        }
      }
  });

  grunt.registerTask('default', ['responsive_images', 'responsive_images_extender']);
};