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
          archive: 'project.zip',
          pretty: true
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

## Configurations

Lets say you wanted to configure the way the zip folder is created or you want to create a tar, all these options are available in grunt-contrib-compress.

One of the things that you can configure is the name of the zip folder that is being generated.
archive option also accepts functions which returns strings.
```js
options: {
  archive: function() {
    return 'project' + (new Date()).getTime() + '.zip'
  }
}
```

Lets consider a case where we want to only compress only the javascript and the css files and you have a server that handles CDN and only accepts folder names of 'scripts' and 'styles'.

You can use this the Globbing patterns for files available in this grunt plugin.

Below is the configuration that will be required in order to do that.
The `dest` parameter controls the destination folder for the zipped files, `expand` makes sure the file folder structure is preserved.

```js
compress: {
  main: {
    options: {
      archive: 'project.zip'
    },
    files: [{
      cwd: 'assets/css/',
      expand: true,
      src: ['**/*'],
      dest: 'styles'
    }, {
      cwd: 'assets/js/',
      expand: true,
      src: ['**/*'],
      dest: 'scripts'
    }]
  }
}
```

On unzipping, this is the project structure:
```
project
├── scripts
│   ├── angular.min.js
│   ├── bootstrap.min.js
│   └── jquery.js
└── styles
    ├── bootstrap.css
    └── custom.css
```
Found something wrong in the above article, send a pull request in the [github repo](http://github.com/kanakiyajay/grunt-tasks/24-grunt-contrib-compress/) or notify in the comments below.
I will also love to hear about your usage of grunt-contrib-compress in your projects.
