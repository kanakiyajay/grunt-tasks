## [Blog post](http://grunt-tasks.com/load-grunt-tasks/ "load grunt tasks")

load-grunt-tasks is a grunt plugin to quickly install all the required packages just using 1 line instead of loading one by one. Lets say that you have a around 10 to 12 dependencies for grunt, as the project goes older and older, manually taking care of which grunt dependency to add, and which grunt dependency to remove becomes cumbersome.
So instead, use package.json as your main configuration file, from which only load the grunt-dependencies defined inside it.

"load-grunt-tasks" automatically reads the "devDependencies" of package.json and loads them in your Gruntfile.js just using the following line;
`require('load-grunt-tasks')(grunt);`

To install:
` npm install --save-dev load-grunt-tasks`

In your Gruntfile.js replace all this lines:

```
grunt.loadNpmTasks('')
grunt.loadNpmTasks('')
grunt.loadNpmTasks('')
grunt.loadNpmTasks('')
```

by this single line
`require('load-grunt-tasks')(grunt);`

## How to use load-grunt-tasks

Lets consider a simple project with one html files and its css and js dependencies.
You want to write a simple Gruntfile.js which can automatically that html's file dependencies and concatenates, minifies revisions and copies them to the dist folder.

Heres that Gruntfile
```
module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      generated: {
        src: 'index.html',
        dest: 'dist/index.html'
      }
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
      source: {
        files: [{
          src: [
            'dist/js/*.js',
            'dist/css/*.css'
          ]
        }]
      }
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: 'dist/index.html',
      options: {
        assetsDirs: ['dist', 'dist/css', 'dist/js', 'css', 'js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-filerev');

  grunt.registerTask('default', [
      'copy:generated',
      'useminPrepare',
      'concat',
      'uglify',
      'cssmin',
      'filerev',
      'usemin'
  ]);
};
```

Observe lines #38 to #43, doesn't it seem it violates DRY, this is where load-grunt-tasks comes into play.
This is the new Gruntfile.js:

```
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    copy: {
      generated: {
        src: 'index.html',
        dest: 'dist/index.html'
      }
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
      source: {
        files: [{
          src: [
            'dist/js/*.js',
            'dist/css/*.css'
          ]
        }]
      }
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: 'dist/index.html',
      options: {
        assetsDirs: ['dist', 'dist/css', 'dist/js', 'css', 'js']
      }
    }
  });

  grunt.registerTask('default', [
      'copy:generated',
      'useminPrepare',
      'concat',
      'uglify',
      'cssmin',
      'filerev',
      'usemin'
  ]);
};
```

It produces the same output as before
```
$ grunt
Running "copy:generated" (copy) task
Copied 1 file

Running "useminPrepare:html" (useminPrepare) task
Configuration changed for concat, uglify, cssmin

Running "concat:generated" (concat) task
File .tmp\concat\css\styles.css created.
File .tmp\concat\js\script.js created.

Running "uglify:generated" (uglify) task
>> 1 file created.

Running "cssmin:generated" (cssmin) task

Running "filerev:source" (filerev) task
Revved 6 files

Running "usemin:html" (usemin) task
Replaced 1 reference to assets

Done, without errors.
```

If you have any comments, feel free to drop it below.