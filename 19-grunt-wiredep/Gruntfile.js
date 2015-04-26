module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

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
