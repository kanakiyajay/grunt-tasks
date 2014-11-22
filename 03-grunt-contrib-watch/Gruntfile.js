module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ["**/*"],
      tasks: ["uglify"]
    },
    uglify: {
      target: {
        files: {
          'dest/script.js': ['src/jquery.js', 'src/jquery.mobile.js', 'src/init.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['watch']);
};