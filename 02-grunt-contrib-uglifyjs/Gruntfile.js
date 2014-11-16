module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      first_target: {
        options: {
           banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'dest/script.<%= grunt.template.today("yymmddHHMM") %>.min.js': ['src/jquery.js', 'src2/jquery.mobile.js']
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