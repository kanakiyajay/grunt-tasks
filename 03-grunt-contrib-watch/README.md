
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

## Sample Gruntfile.js

Lets start with a sample Gruntfile.js :-

```
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ["**/*"],
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
