module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    exec: {
    	sayHello: {
    		cmd: 'echo hello'
    	}
    }
  });

  grunt.registerTask('default', ['exec:sayHello']);
};