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