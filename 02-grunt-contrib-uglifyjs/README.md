Grunt contrib uglify is an official plugin in the grunt ecosystem to minify and concat your project's javascript files and integrating it with your build system.

Here's the most simplest way on how to use it:

From the command line:

`npm install grunt grunt-contrib-uglifyjs --save-dev`

Inside your Gruntfile.js

```
module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'dest/minified.js': ['src/jquery.js', 'src/angular.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};
```

From the command line:

```
$ grunt
Running "uglify:my_target" (uglify) task
>> 1 file created.

Done, without errors
```

<div class="readme-wrapper">
  <p class="readme-button">
    Readme
  </p>

  <div class="readme-toggle">
    [readme owner="gruntjs" repo="grunt-contrib-uglify"]
  </div>
</div>