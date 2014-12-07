## [Blog post](http://grunt-tasks.com/grunt-contrib-imagemin/ "grunt imagemin")

grunt-contrib-copy is an official grunt plugin for advanced files and folders copying/moving for automated front end development.
You can set up a grunt task in your 'build' that will copy certain files and folders to locations that you specify, for example config files, pdf assets.
To install this in your project just run :
`npm install grunt-contrib-copy --save-dev`
This will add it in node_modules and the flag --save-dev will also add it in devDependencies of package.json

## Getting started. (1eccb4a)

First we will create a simple grunt task that just copies all files and folders from src/* and saves them to dist/*.

Folder and File Structure:

```
├── Gruntfile.js
├── package.json
├── README.md
└── src
    └── assets
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

New folder structure

```
.
├── dist
│   └── assets
│       └── copyThis.txt
├── Gruntfile.js
├── package.json
├── README.md
└── src
    └── assets
        └── copyThis.txt
```

## Files and Folders settings

You can use different combinations of src and dest for advanced copying configuration.

*	To include files within path
	`{expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'}`

*	To include files within path and its sub-directories
	`{expand: true, src: ['path/**'], dest: 'dest/'}`

*	To make all src relative to cwd
	`{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'}`

* 	To flatten results to a single level
	`{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}`

## Process while copying

grunt-contrib-copy also provides a to replace certain placeholders in all your files but correct value.
This can be done via the `options` param
This config will replace PATH to /hello/world wherever it finds it.
```
copy: {
  main: {
    src: 'src/a',
    dest: 'src/a.bak',
    options: {
      process: function (content, srcpath) {
        return content.replace(/[PATH]/,"/hello/world");
      },
    },
  },
},
```
You can use this simple functions to do more things not just do regex replace, Eg: inform how many files contain a particular word, do some textual analysis of code.. , replacing html anchor links to point to different paths when in production etc
