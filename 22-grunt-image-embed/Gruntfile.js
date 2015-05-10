module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    imageEmbed: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: ['css/*.css'],
          dest: '.tmp/concat'
        }]
      }
    },
    copy: {
      generated: {
        files: [{
          src: 'index.html',
          dest: 'dist/index.html'
        }, {
          cwd: 'images/',
          src: '**/*',
          dest: 'dist/images',
          expand: true
        }, {
          cwd: 'images/',
          src: '**/*',
          dest: '.tmp/concat/images',
          expand: true
        }]
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
      html: 'index.html',
      options: {
        dest: 'dist'
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
      'copy:generated',
      'useminPrepare',
      'concat',
      'imageEmbed',
      'uglify',
      'cssmin',
      'filerev',
      'usemin',
      'htmlmin',
  ]);
};
