module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    wiredep: {
      task: {
        src: ['index.html']
      }
    },
    watch: {
      files: ['bower_components/*'],
      tasks: ['wiredep']
    }
  });

  grunt.registerTask('default', ['wiredep']);
  grunt.registerTask('changes', ['watch']);
};
