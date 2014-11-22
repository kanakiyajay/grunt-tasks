module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ["src/js/*.js"],
      tasks: ["uglify"]
    },
    uglify: {
      target: {
        files: {
          'dest/script.js': ['src/lib/jquery.js', 'src/lib/jquery.mobile.js', 'src/js/init.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['watch']);
};