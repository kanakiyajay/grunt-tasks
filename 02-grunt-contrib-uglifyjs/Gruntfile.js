module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      first_target: {
        files: {
          'dest/file1.min.js': ['src/jquery.js', 'src2/jquery.mobile.js'],
          'dest/file2.min.js': ['src/jquery.js', 'src/angular.js']
        }
      },
      second_target: {
        files: {
          'dest2/jquery.all.min.js': ['src/jquery.js', 'src2/jquery.mobile.js', 'src2/jquery-ui.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};