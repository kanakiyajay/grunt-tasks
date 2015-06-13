module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['dist'],
    copy: {
      generated: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
      source: {
        files: [{
          src: [
            'dist/js/*.js',
            'dist/css/*.css'
          ]
        }]
      }
    },
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'dist'
      }
    },
    purifycss: {
      options: {

      },
      target: {
        src: ['src/index.html', '.tmp/concat/js/*.js'],
        css: ['.tmp/concat/css/*.css'],
        dest: '.tmp/concat/css/styles.css'
      }
    },
    usemin: {
      html: 'dist/index.html',
      options: {
        assetsDirs: ['dist', 'dist/css', 'dist/js', 'css', 'js']
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    }
  });

  grunt.registerTask('default', [
      'clean',
      'copy:generated',
      'useminPrepare',
      'concat',
      'purifycss',
      'uglify',
      'cssmin',
      'filerev',
      'usemin',
      'htmlmin'
  ]);
};
