## [Blog post](http://grunt-tasks.com/grunt-usemin/ "grunt usemin")

grunt-usemin is an amazing grunt plugin that allows you to specify the build and concatenation stylesheets and javascript inside html references. This helps you to maintain only one file from where you can define dependencies as well as how to minify them.

It scans your html files or your template files and optimizes javascript files and stylesheets as specified.

## Getting Started

To install this in your project, run
`npm install grunt-usemin --save-dev`

This will add it in node_modules and the flag --save-dev will also add it in devDependencies of package.json

Usemin exports two tasks, viz. usemin and useminPrepare as well as other grunt plugins like [concat](http://grunt-tasks.com/grunt-contrib-copy/), [uglify](http://grunt-tasks.com/grunt-contrib-uglify/), cssmin, filerev

You will also have to install them manually.
`npm install grunt-contrib-copy grunt-contrib-uglify grunt-contrib-cssmin grunt-filerev --save-dev`

We will also require [grunt-contrib-copy](http://grunt-tasks.com/grunt-contrib-copy/) for copying the index.html to the

dist folder which will be for production only.
*useminPrepare*  : This task prepares the configuration to transform specific blocks in the scrutinized file into a single line, targeting an optimized version of the files. This is done by generating subtasks called generated for each of the optimization steps handled by the Grunt plugins

*usemin*: This task replaces the blocks by the file they reference, and replaces all references to assets by their revisioned version if it is found on the disk. This target modifies the files it is working on.

In short, useminPrepare is where you define the configuration while usemin is where you define the files.
How to specify dependencies inside html:

``` html
<!-- build:<type>(alternate search path) <path> -->
... HTML Markup, list of script / link tags.
<!-- endbuild -->
```

> The full Gruntfile.js

js
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

Folder and File structure

```
.
├── css
│   ├── bootstrap.css
│   ├── codemirror.css
│   └── jquery.sidr.light.css
├── dist <- folder where all new files are generated
│   ├── css
│   │   └── styles.7dea81d829f10a1fc486.css <- filerev
│   ├── index.html
│   └── js
│       └── script.459446c51efa85dbade2.js <- filerev
├── Gruntfile.js
├── index.html
├── js
│   ├── angular.min.js
│   ├── bootstrap.min.js
│   ├── jquery.js
│   └── jquery.superscrollorama.js
├── package.json
└── README.md
```

Grunt usemin first copies index.html to dist/, concat then copies as well as concatenates all css and js files to
dist/js and dist/css. Uglify and cssmin then minifies the javascript and css files.
Filerev runs then runs the concatenated files through a file content has and gives a revision to each file.
usemin is the final task that changes index.html to point to the rev version.

Therefore you can grunt-usemin for your build process easily.
Using the same above configuration you can add more html files and folders and make a complex build process easier to manage, change and use.

Futher: [How to use grunt-usemin with grunt-remove-logging](http://grunt-tasks.com/grunt-remove-logging/)

Above post will explain how you can still keep those pesky yet required console.log statements in your development folder and remove them in your production files.

Further 2: [How to use grunt-usmin with grunt-htmlmin](http://grunt-tasks.com/grunt-htmlmin/)

Above post explains the steps to minify html, css and js files using the above plugins.

Further 3: [Usage with time-grunt](http://grunt-tasks.com/time-grunt/)

Further 4: [Usage with grunt-image-embed](http://grunt-tasks.com/grunt-image-embed/)

Above post will explain how to replace your small image assets referenced in your css files by data-uris.