## Introduction

Grunt-purifycss is a useful grunt plugin to remove unused css from your files and also detects dynamically added classes in addition to single page web apps.
In this short tutorial I am going to demonstrate its usage:

## Getting Started

You can install it from the command line:
`npm install grunt-purifycss --save-dev`
 The flag --save-dev will get it installed in your project's package.json as well.

Lets consider a very basic example which uses bootstrap and some custom css files.
Heres the project structure:-
```
.
├── css
│   ├── bootstrap.css
│   └── custom.css
├── images
│   ├── browsersync.jpg
│   └── css.jpg
├── index.html
└── js
    └── jquery.js
```

I have written some demo html content inside the project which utilizes some bootstrap css classes as well as styles from custom.css.
If you are interested, I have created a quick [codepen demo](http://codepen.io/kanakiyajay/pen/rVwbZd)

Your Gruntfile.js just be configured for the src paths of html and its css paths and the destination of where to write the new lighter css file.

```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    purifycss: {
      options: {

      },
      target: {
        src: ['src/*.html'], // Observe all html files
        css: ['src/css/*.css'], // Take all css files into consideration
        dest: 'dest/tmp.css' // Write to this path
      }
    }
  });

  grunt.registerTask('default', ['purifycss']);
};
```

After running grunt from the command line:
```
$ grunt
Running "purifycss:target" (purifycss) task
Source Files:  [ 'src/index.html' ]
Style Files:  [ 'src/css/bootstrap.css', 'src/css/custom.css' ]
##################################
Before purify, CSS was 124374 chars long.
After purify, CSS is 10680 chars long. (11.6 times smaller)
##################################
This function took:  1330 ms
File "dest/tmp.css" created.
```
If you open up `dest/tmp.css` it will contain css classes used by index.html and all the bloated css code from bootstrap has been removed.

Found something wrong in the above article, send a pull request in the [github repo](http://github.com/kanakiyajay/grunt-tasks/25-grunt-purifycss/) or notify in the comments below.
I will also love to hear about your usage of grunt-contrib-compress in your projects.
