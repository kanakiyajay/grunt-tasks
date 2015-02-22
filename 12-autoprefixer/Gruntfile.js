module.exports = function(grunt) {

  var autoprefixer = require('autoprefixer-core');
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      postcss: {
        options: {
          processors: [
            autoprefixer({
              browers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            }).postcss
          ]
        },
        dist: {
          src: 'css/*.css'
        }
      }
  });

  grunt.registerTask('default', ['postcss']);
};