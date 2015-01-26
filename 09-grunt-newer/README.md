## [Blog post](http://grunt-tasks.com/grunt-newer/ "grunt newer")

grunt-newer is an simple yet extremely useful grunt plugin that allows you to configure specific tasks to run only when the the file has changed. If you have a long build process or one that takes a lot of time, you can use this to cut down that time, by only running certain tasks when its related files has changed.

For example, you can use this for uglify which sometimes take a good deal of them. By correctly configuring both the tasks you can only run 'uglify' when its source files have changed.

## Getting Started

The best way to integrate grunt-newer in your build process is to add newer as the first argument when running other tasks. For example `jscs:all` will become `newer:jscs:all`
Lets create a simple Grunt file that will uglify js src files into minified files.

Heres the folder file structure:
.
├── dist
│   └── js
│       └── minified.js
├── Gruntfile.js
├── package.json
├── README.md
└── src
    └── js
        ├── app.js
        ├── jquery.js
        └── jquery.superscrollorama.js

Heres the Gruntfile.js:
```
module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      all: {
        files: {
          'dist/js/minified.js': ['src/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['uglify:all']);
  grunt.registerTask('nw', ['newer:uglify:all']);

};
```

The default task runs uglify while the nw task will only run uglify if either of the three files have changed.
On running `grunt nw` first time:

```
$ grunt nw
Running "newer:uglify:all" (newer) task

Running "uglify:all" (uglify) task
>> 1 file created.

Running "newer-postrun:uglify:all:1:H:\grunt-tasks.com\github\09-grunt-newer\node_modules\grunt-newer\.cache" (newer-postrun) task

Done, without errors.
```

On running `grunt nw` second time
```
$ grunt nw
Running "newer:uglify:all" (newer) task
No newer files to process.

Done, without errors.
```

If you see the outputs of the commands, grunt-newer does not uglify task once again.
It does all this by keeping track of the last modified time of each file and keeping them in .cache
Then during runtime if theres a diff in any files last modified time, run the task, and update in .cache

