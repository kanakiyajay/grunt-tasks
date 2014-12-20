module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			main: {
				files: [
					{ src: 'libraries/*.js', dest: 'dist/library.js' }
				]
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**'],
					dest: 'dist/'
				}]
			}
		},
		concurrent: {
			target1: ['copy', 'uglify']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['concurrent:target1']);
};