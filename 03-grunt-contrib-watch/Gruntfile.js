module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      express: {
        files: ["src/js/*.js", "index.html"],
        tasks: ["uglify:dev", "express:defaults"],
        options: {
            livereload: true,
            spawn: false
        }
      }
    },
    uglify: {
      all: {
        files: {
          'dest/lib.js': ['src/lib/jquery.js', 'src/lib/jquery.mobile.js'],
          'dest/script.js': ['src/js/init.js']
        }
      },
      dev: {
        'dest/script.js': ['src/js/init.js']
      }
    },
    express: {
      options: {
        script: 'server.js',
        port: 3000
      },
      defaults: {}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express', 'watch']);

};