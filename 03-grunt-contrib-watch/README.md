
grunt contrib watch is an amazing plugin that does one simple thing, run a grunt task whenever a file changes.
This post should get you up and running with grunt-watch as fast as possible with some tips on how to leverage its full potential.
So if your development workflow is like this

*Editor -> Save -> Restart Server -> Refresh browser -> See Changes -> Repeat.*

It will change to just :

*Save -> Refresh Browser -> See Changes -> Repeat*

Congratulations, you just eliminated one step.
You can eliminate one step even further:

*Save -> See Changes -> Repeat*

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
This will make sure that when js files in src/js/* changes, run uglify task

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