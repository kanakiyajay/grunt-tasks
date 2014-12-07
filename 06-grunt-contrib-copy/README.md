## [Blog post](http://grunt-tasks.com/grunt-contrib-imagemin/ "grunt imagemin")

grunt-contrib-copy is an official grunt plugin for advanced files and folders copying/moving for automated front end development.
You can set up a grunt task in your 'build' that will copy certain files and folders to locations that you specify, for example config files, pdf assets.
To install this in your project just run :
`npm install grunt-contrib-copy --save-dev`
This will add it in node_modules and the flag --save-dev will also add it in devDependencies of package.json

## Getting started

First we will create a simple grunt task that just copies all files and folders from src/* and saves them to dist/*.

Folder and File Structure:

```
.
├── Gruntfile.js
└── src
    ├── assets
    	└── copyThis.txt
```

Gruntfile.js
```
module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**'],
					dest: 'dist/'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['copy']);
};
```

On running grunt from cmd:

```
$ grunt
Running "copy:main" (copy) task
Created 2 directories, copied 1 file

Done, without errors.
```

You should now find the assets folder containing copyThis.txt inside dist/ folder.