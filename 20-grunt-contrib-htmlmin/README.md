## Introduction

Grunt-contrib-htmlmin is an official plugin from the grunt-js team to minify your project's html source code files before pushing to production with options to remove whitespace and comments.

## Getting Started

You can install it from the command line:
`npm install grunt-contrib-htmlmin --save-dev`
 The flag --save-dev will get it installed in your project's package.json as well.

For the first example we will consider a simple html file which you need to copy and then minify to dist folder.
The index file contains some comments, some paragraphs and some buttons.

Heres the Gruntfile.js for that:
```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'index.html'
        }
      }
    }
  });

  grunt.registerTask('default', ['htmlmin:dist']);
};
```

On running grunt from the command line, a new index.html is generated in the dist folder.

Original index.html: 2.00 Kb,
Minified dist/index.html: 1.43Kb,
Savings: 0.57 Kb = 28.5% compression

## Using it with grunt usemin

We have earlier covered [grunt-usemin](http://grunt-tasks.com/grunt-usemin/) which concatenates your css and js files based on comments in your html files.
Note that grunt-contrib-htmlmin uses [html-minifier](http://github.com/kangax/html-minifier) in the background for compressing your html files.

You will also need to install the following grunt plugins:

`npm install grunt-contrib-copy grunt-contrib-uglify grunt-contrib-concat grunt-contrib-cssmin grunt-usemin grunt-filerev --save-dev`

Using the previous grunt usemin Gruntfile.js and adding the grunt-htmlmin task to it:

```js
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
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
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
      'usemin',
      'htmlmin'
  ]);
};
```

> The above grunt-task will concat, uglify, compress, revision your css.js files, change dependencies in your html, then minify your html files, and then copy those files to your dist folder.

On running grunt:

```
$ grunt
Running "copy:generated" (copy) task
Copied 1 file

Running "useminPrepare:html" (useminPrepare) task
Configuration changed for concat, uglify, cssmin

Running "concat:generated" (concat) task
File .tmp\concat\css\minified.css created.
File .tmp\concat\js\minified.js created.

Running "uglify:generated" (uglify) task
>> 1 file created.

Running "cssmin:generated" (cssmin) task

Running "filerev:source" (filerev) task
Revved 2 files

Running "usemin:html" (usemin) task
Replaced 1 reference to assets

Running "htmlmin:dist" (htmlmin) task
Minified 1 files

Done, without errors.
```

Now, the index.html in dist/ folder will contain no whitespaces and comments.
Heres the link to the [gist](https://gist.github.com/kanakiyajay/e7117037ae1d1f820947) for Gruntfile.js and package.json

Found something wrong in the above article, send a pull request in the [github repo](http://github.com/kanakiyajay/grunt-tasks/20-grunt-contrib-htmlmin/) or notify in the comments below.
I will also love to hear about your cool hacks around grunt-htmlmin.
