## [Blog post](http://grunt-tasks.com/grunt-remove-logging/ "grunt remove logging")

Grunt Remove logging is a grunt plugin for removing the console logging statements made in your javascript files.
You can use this plugin to remove logging for production while also keeping console.log statements for development
for better debugging.

## Getting Started

To install this in your project, run
`npm install grunt-remove-logging --save-dev`

A very simple example would be that you have got this folder structure:

```
.
├── css
│   ├── bootstrap.css
│   ├── codemirror.css
│   └── mystyle.css
├── Gruntfile.js
├── index.html
├── js
│   ├── bootstrap.min.js
│   ├── jquery.js
│   └── myscript.js
├── package.json
└── README.md
```

In your myscript.js file you have some simple logging statements:

```
$(document).ready(function() {
  console.log("document is ready");
  $("#submit").on("click", function() {
    console.log("Submit Button Clicked");
  });
});
```

You have got some console.log statements for debugging purposes in your js files which you want to remove for production. This can be easily done using grunt-remove-logging.

```js
grunt.initConfig({
  removelogging: {
    dist: {
      files: [{
        expand: true,
        src: ['*.js'],
        cwd: 'js/',
        dest: 'dist/js/'
      }]
    }
  }
});
```

After you run grunt from the command line:

```
$ grunt
Running "removelogging:dist" (removelogging) task
Removed 0 logging statements from js/bootstrap.min.js
Removed 0 logging statements from js/jquery.js
Removed 2 logging statements from js/myscript.js
```

New js files are created in dist/ folder and the logging statements are removed the new myscript.js:

```js
$(document).ready(function() {

  $("#submit").on("click", function() {

  });
});
```