## Introduction

Grunt-contrib-compress is the official grunt-js plugin from Grunt Team to zip or tar your whole project or a part of your project file and folders.
In this short tutorial I am going to demonstrate its usage:

## Getting Started

You can install it from the command line:
`npm install grunt-contrib-compress --save-dev`
 The flag --save-dev will get it installed in your project's package.json as well.

Lets consider a very basic example where we have to just zip the project folder.

```
 assets
├── css
│   ├── bootstrap.css
│   └── custom.css
├── images
│   └── browsersync.jpg
├── index.html
└── js
    ├── angular.min.js
    ├── bootstrap.min.js
    └── jquery.js
```

Heres our Gruntfile.js

```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: 'project.zip'
        },
        expand: true,
        cwd: 'assets/',
        src: ['**/*'],
        dest: '/'
      }
    }
  });

  grunt.registerTask('default', ['compress']);
};
```

On running grunt:-

```
$ grunt
Running "compress:main" (compress) task
Created project.zip (278018 bytes)

Done, without errors.
```

You will find a project.zip folder in your main directory which when unzipped will contain the css, js and images folder same as in the original.

Found something wrong in the above article, send a pull request in the [github repo](http://github.com/kanakiyajay/grunt-tasks/24-grunt-contrib-compress/) or notify in the comments below.
I will also love to hear about your usage of grunt-contrib-compress in your projects.
