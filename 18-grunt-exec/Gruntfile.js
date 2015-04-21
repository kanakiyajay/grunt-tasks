module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    exec: {
    	removeLogs: {
    		cmd: 'rm *.log',
            stderr: false
    	},
        removeTmp: {
            cmd: 'rm -rf .tmp',
            stderr: false
        }
    }
  });

  grunt.registerTask('default', ['exec:removeLogs', 'exec:removeTmp']);
};
