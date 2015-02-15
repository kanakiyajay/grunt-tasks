module.exports = function(grunt) {

  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json'],
        commitFiles: ['package.json', 'Gruntfile.js', 'README.md'],
        commitMessage: 'Release v%VERSION%',
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'The Release %VERSION%'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('bm', ['bump']);
};