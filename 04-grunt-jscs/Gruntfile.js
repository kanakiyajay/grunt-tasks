module.exports = function(grunt) {
  grunt.initConfig({
    jscs: {
      src: 'Gruntfile.js',
        options: {
        config: '.jscsrc'
      }
    }
  });
  grunt.loadNpmTasks('grunt-jscs');
  grunt.registerTask('default', ['jscs']);
};
