## Introduction

Grunt-image-embed is a superb grunt-js plugin for converting your images in your stylesheets to base64 encoded data URI strings to reduce HTTP requests.
This plugin is extremely useful if you want to improve pagespeed by converting your small images / icons into data URIs which reduces the number of calls and thus decrease the loading time.

## Getting Started

You can install it from the command line:
`npm install grunt-image-embed --save-dev`
 The flag --save-dev will get it installed in your project's package.json as well.

For the first basic example we will consider a simple stylesheet which references an image from local folder and an image from remote url.
Using the below configuration you should be able to convert them into data URIs.
You will be able to use that

Heres the Gruntfile.js for that:

```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    imageEmbed: {
      dist: {
        src: ['css/custom.css'],
        dest: 'css/output.css'
      }
    }
  });

  grunt.registerTask('default', 'imageEmbed');
};
```

The above task will scan your `css/custom.css` file and convert all the images into data URIs.
On running grunt:
```
$ grunt
Running "imageEmbed:dist" (imageEmbed) task
Encoding file: images\grunt-logo.png
Encoding file: http://jquer.in/favicons/apple-touch-icon-57x57.png
File "css/output.css" created.
```

Previously, this is what custom.css looked like:
```css
.grunt {
  width: 128px;
  height: 128px;
  background: url('../images/grunt-logo.png') no-repeat;
}
```

After running grunt, this what output.css looks like:
```css
.grunt {
  width: 128px;
  height: 128px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABGdBTUEAALGPC/.....5CYII=) no-repeat;
}
```

There, you should reduced 2 additional HTTP requests.

## Usage with grunt-usemin

Grunt-usemin is an excellent starting point for those looking to automate their front-end development workflows, it provides all the basic tools necessary for scaffolding a basic grunt project.
We had earlier covered [grunt-usemin](http://grunt-tasks.com/grunt-usemin) before.

Grunt Usemin consists of two tasks `useminPrepare` which will prepare your scaffolding or generate the grunt code for concat, uglify, cssmin, filerev and later `usemin` which will actually do the replacement and should be called later.

The concat task creates a .tmp directory with the following structure:-

```
.tmp
└── concat
    ├── css
    └── js
```

We have to use our task grunt-image-embed after `concat:generated` task in grunt-usemin, this can be done by registerTask function by changing the order of the tasks called.
Here's the relevant snippet:
```
'copy:generated',
'useminPrepare',
'concat',
'imageEmbed',
```

One more thing to be added to the .tmp folder will be your relevant image assets because grunt-image-embed won't work for local assets unless it finds the relative paths.
This can be easily done by [grunt-contrib-copy](http://grunt-tasks.com/grunt-contrib-copy/).
Here is the relevant snippet of code:
```
copy: {
  cwd: 'images/',
  src: '**/*',
  dest: '.tmp/concat/images',
  expand: true
}
```
The above code will look inside your images folder and copy the relevant tree or file-folder structure *as it is* to .tmp/concat/images


The final Gruntfile.js using grunt-usemin and grunt-image-embed
```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    imageEmbed: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: ['css/*.css'],
          dest: '.tmp/concat'
        }]
      }
    },
    copy: {
      generated: {
        files: [{
          src: 'index.html',
          dest: 'dist/index.html'
        }, {
          cwd: 'images/',
          src: '**/*',
          dest: 'dist/images',
          expand: true
        }, {
          cwd: 'images/',
          src: '**/*',
          dest: '.tmp/concat/images',
          expand: true
        }]
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
      'imageEmbed',
      'uglify',
      'cssmin',
      'filerev',
      'usemin',
      'htmlmin',
  ]);
};
```

On running grunt:
```
$ grunt
Running "copy:generated" (copy) task
Copied 3 files

Running "useminPrepare:html" (useminPrepare) task
Configuration changed for concat, uglify, cssmin

Running "concat:generated" (concat) task
File .tmp\concat\css\styles.css created.
File .tmp\concat\js\scripts.js created.

Running "imageEmbed:dist" (imageEmbed) task
Encoding file: .tmp\concat\images\grunt-logo.png
Encoding file: http://jquer.in/favicons/apple-touch-icon-57x57.png
File ".tmp/concat/css/styles.css" created.

Running "uglify:generated" (uglify) task
>> 1 file created.

Running "cssmin:generated" (cssmin) task

Running "filerev:source" (filerev) task
Revved 4 files

Running "usemin:html" (usemin) task
Replaced 1 reference to assets

Running "htmlmin:dist" (htmlmin) task
Minified 1 files

Done, without errors.
```

Using this grunt configuration, you have concatenated, minified and revisioned your css and js files, minified your html file as well as replaced your background images by data-uris.

Found something wrong in the above article, send a pull request in the [github repo](http://github.com/kanakiyajay/grunt-tasks/22-grunt-image-embed/) or notify in the comments below.
I will also love to hear about your cool hacks around grunt-image-embed.
