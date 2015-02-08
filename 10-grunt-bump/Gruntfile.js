module.exports = function(grunt) {

  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json'],
        commit: false,
        createTag: false,
        push: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('bm', ['bump']);
};