# [Blog Post](http://grunt-tasks.com/grunt-contrib-watch/ "Grunt Watch")

grunt contrib watch is an amazing plugin that does one simple thing, run a grunt task whenever a file changes.
This post should get you up and running with grunt-watch as fast as possible with some tips on how to leverage its full potential.
So if your development workflow is like this

> Editor -> Save -> Restart Server -> Refresh browser -> See Changes -> Repeat.

It will change to just :

> Save -> Refresh Browser -> See Changes -> Repeat

Congratulations, you just eliminated one step.
You can eliminate one step even further:

> Save -> See Changes -> Repeat*

This might seem like a small change in time, but overtime the difference this minor workflow change will cause is huge.

## Step1: Sample Gruntfile.js

Lets start with a sample Gruntfile.js :-

```
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ["src/*.js"],
      tasks: ["uglify"]
    },
    uglify: {
      target: {
        files: {
          'dest/script.js': ['src/jquery.js', 'src/jquery.mobile.js', 'src/init.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['watch']);
};
```
The grunt configuration will run uglify command whenever any file inside changes.
After running grunt from the command line

```
$ grunt
Running "watch" task
Waiting...
>> File "README.md" changed.
Running "uglify:target" (uglify) task
>> 1 file created.

Done, without errors.
Completed in 12.352s at Sat Nov 22 2014 10:39:12 GMT+0530 (India Standard Time) - Waiting...
```

## Step 2: Only watch certain files

Ideally, we dont want this because it took 12 secs to run the command and it should only be run when the related javascript file changes.

Just change the files that are being watched:
```
watch: {
	src: {
	   files: ["src/js/*.js"],
	   tasks: ["uglify"]
	}
 }

 // Also the file configuration
 files: {
   'dest/script.js': ['src/lib/jquery.js', 'src/lib/jquery.mobile.js', 'src/js/init.js']
 }
```
This will make sure that when js files in src/js/* changes and then run uglify task.

```
$ grunt
Running "watch" task
Waiting...
>> File "src\js\init.js" changed.
Running "uglify:target" (uglify) task
>> 1 file created.

Done, without errors.
Completed in 12.359s at Sat Nov 22 2014 10:53:34 GMT+0530 (India Standard Time) - Waiting...
```

You can have multiple watch configurations using the same patterns:

### Multiple Configurations

```
watch: {
	task1: {
	   files: ["src/js/*.js"],
	   tasks: ["uglify"]
	},
	task2: {
	   files: ["src/js/*.js"],
	   tasks: ["jshint"]
	}
 }
```

## Live Refresh and Reload using Watch

> Eliminate the most repititive tasks by using grunt server and live reload.

It is critical to the `save->change->observe` cycle as fast as possible. Chances are if you are a developer you will be doing this multiple times in a day. Get started with the following template.

We are going to be using express 4.0 and a very simple app for demonstration.
The express app will run on port 3000 and live reload on port 35729
You will also need another plugin grunt-express-server

`npm install grunt-express-server --save-dev`

And here is the grunt file:
```
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      express: {
        files: ["src/js/*.js", "index.html"],
        tasks: ["uglify:dev", "express:defaults"],
        options: {
            livereload: true,
            spawn: false
        }
      }
    },
    uglify: {
      all: {
        files: {
          'dest/lib.js': ['src/lib/jquery.js', 'src/lib/jquery.mobile.js'],
          'dest/script.js': ['src/js/init.js']
        }
      },
      dev: {
        'dest/script.js': ['src/js/init.js']
      }
    },
    express: {
      options: {
        script: 'server.js',
        port: 3000
      },
      defaults: {}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express', 'watch']);

};
```

The default task first runs express server and watches the resp. files for changes, once a file changes, uglify:dev task is run and livereload will refresh the page.
So your workflow just went to *Save -> Observe*.

We will cover more options, how to run parallel tasks etc. in the next blog posts.