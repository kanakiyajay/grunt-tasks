## Introduction

Grunt open is a simple to use plugin for opening a file or urls in a browser.
This is a plugin that is generally used in conjunction with grunt-connect or any static server for more automation by opening localhost after starting the server.
In this short tutorial I am going to demonstrate its usage:

## Getting Started

You can install it from the command line:
`npm install grunt-open --save-dev`
 The flag --save-dev will get it installed in your project's package.json as well.

In the below very basic example I will have a simple task that will open up a particular url / file.

Gruntfile.js

```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      open: {
        dev: {
          path: 'http://localhost/'
        }
      }
  });

  grunt.registerTask('default', [
    'open:dev'
  ]);
};
```

The above task will open up localhost in your default browser.

Found something wrong in the above article, send a pull request in the [github repo](http://github.com/kanakiyajay/grunt-tasks/26-grunt-open/) or notify in the comments below.
I will also love to hear about your usage of grunt-purifycss in your projects.
