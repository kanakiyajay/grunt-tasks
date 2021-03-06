module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    copy: {
      generated: {
        src: 'index.html',
        dest: 'dist/index.html'
      },
      html: {
        files: [{
          expand: true,
          cwd: '.tmp',
          src: ['*.html'],
          dest: 'dist/'
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
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['*.html'],
          dest: '.tmp/'
        }]
      }
    }
  });

  grunt.registerTask('default', [
      'copy:generated',
      'useminPrepare',
      'concat',
      'uglify',
      'cssmin',
      'filerev',
      'usemin',
      'htmlmin',
      'copy:html'
  ]);
};
