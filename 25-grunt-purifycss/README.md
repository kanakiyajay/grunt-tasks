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

## CSS in Javascript

Grunt-purifycss also handles css classes injected using javascript and supports angular templates, React and most of the popular frameworks.

Heres a simple example of js which adds css classes:

```js
$(document).ready(function() {
  $('.m-t').on('click', function() {
    $(this).addClass('m-2t');
  });
});
```

If you run grunt over here, the tmp.css file that is generated will also contain .m-2t, [purifycss](https://github.com/purifycss/purifycss) works with all javascript frameworks.

## Integrating with grunt-usemin

Most of the front-end projects will already have a build process associated with it for concatenation, minification, htmlrevisions, etc. We have already covered [grunt-usemin](http://grunt-tasks.com/grunt-usemin/) before which uses html comments configuration to decide which files to concat, minify, and revision.
We will cover how to integrate purifycss with usemin.

Lets add build configurations in our index.html

CSS:
```html
  <!-- build:css css/styles.css -->
  <link rel="stylesheet" href="css/bootstrap.css">
  <link rel="stylesheet" href="css/custom.css">
  <!-- endbuild -->
```

Javascript:

```html
<!-- build:js js/script.js -->
  <script src="js/jquery.js"></script>
  <script>
    $(document).ready(function() {
      $('.m-t').on('click', function() {
        $(this).addClass('m-2t');
      });
    });
  </script>
  <!-- endbuild -->
```

Lets consider a the our configuration Gruntfile.js for usemin:
```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['dist'],
    copy: {
      generated: {
        src: 'src/index.html',
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
      html: 'src/index.html',
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
      'clean',
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

The above Gruntfile.js will clean your dist folder, concat & minify all js, css assets according config specified in html, put revisions, minify html and copy new folder structure to dist.

Our purifycss step should be after concat step of usemin:

```js
grunt.registerTask('default', [
    'clean',
    'copy:generated',
    'useminPrepare',
    'concat',
    'purifycss', // <---
    'uglify',
    'cssmin',
    'filerev',
    'usemin',
    'htmlmin'
]);
```

And our purifycss task as well:
```js
purifycss: {
  options: {

  },
  target: {
    src: ['src/index.html', '.tmp/concat/js/*.js'],
    css: ['.tmp/concat/css/*.css'],
    dest: '.tmp/concat/css/styles.css'
  }
},
```

After running grunt,
```
$ grunt
Running "clean:0" (clean) task
>> 1 path cleaned.

Running "copy:generated" (copy) task
Copied 1 file

Running "useminPrepare:html" (useminPrepare) task
Configuration changed for concat, uglify, cssmin

Running "concat:generated" (concat) task
File .tmp\concat\css\styles.css created.
File .tmp\concat\js\script.js created.

Running "purifycss:target" (purifycss) task
Source Files:  [ 'src/index.html' ]
Source Files:  [ '.tmp/concat/js/script.js' ]
Style Files:  [ '.tmp/concat/css/styles.css' ]
##################################
Before purify, CSS was 124406 chars long.
After purify, CSS is 27684 chars long. (4.4 times smaller)
##################################
This function took:  1951 ms
File ".tmp/concat/css/styles.css" created.

Running "uglify:generated" (uglify) task
>> 1 file created.

Running "cssmin:generated" (cssmin) task
>> 1 file created. 27.68 kB → 20.99 kB

Running "filerev:source" (filerev) task
Revved 2 files

Running "usemin:html" (usemin) task
Replaced 1 reference to assets

Running "htmlmin:dist" (htmlmin) task
Minified 1 files

Done, without errors.
```

> Note that this currently only works only for 1 css file, and I am working on a quick fix to resolve that.

Found something wrong in the above article, send a pull request in the [github repo](http://github.com/kanakiyajay/grunt-tasks/25-grunt-purifycss/) or notify in the comments below.
I will also love to hear about your usage of grunt-purifycss in your projects.
