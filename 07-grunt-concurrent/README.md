## [Blog post](http://grunt-tasks.com/grunt-concurrent/ "grunt concurrent")

grunt-concurrent is an amazing grunt plugin that allows you to run grunt tasks concurrently / in parallel.
This is important because many grunt tasks are slower or take a lot of time which hampers your build process.You dont want your build time to be more than 5 minutes.
Using grunt-concurrent will speed up your build process by running grunt-tasks in parallel using your machines multiple cores, thus saving you critical time.

To install this in your project, run
`npm install grunt-concurrent --save-dev`
This will add it in node_modules and the flag --save-dev will also add it in devDependencies of package.json

## Getting Started

For your current project, you have two grunt tasks run [copy](http://grunt-tasks.com/grunt-contrib-copy/ "copy" ) and [grunt-uglify](http://grunt-tasks.com/grunt-contrib-uglify/ "grunt uglify") and we want them to run in parallel.
First lets install them:
`npm install grunt-contrib-copy grunt-contrib-uglify --save-dev`

The below code will make sure that target1 tasks run concurrently, if you have got an 4 core machine, this will mean 4 tasks can be carried out in parallel.
```
concurrent: {
	target1: ['copy', 'uglify']
}
```

> The full Gruntfile.js

```
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
```
The above code will copy whatever is inside src/ to dist/ while also running uglify-js on the js files in libraries folder and minifying them to dist/library.js

Folder and File structure

```
.
├── dist
│   ├── jquery.js
│   ├── jquery.mobile.js
│   └── library.js
├── Gruntfile.js
├── libraries
│   ├── jquery.js
│   └── jquery.mobile.js
├── package.json
├── README.md
├── server.js
└── src
    ├── jquery.js
    └── jquery.mobile.js
```

## Other options

You can specify some options in grunt-concurrent like :-

- limit > limits the number of grunt tasks carried out simultaneously.[]
- logConcurrentOutput > log the output of your concurrent tasks together. [Default is false]
