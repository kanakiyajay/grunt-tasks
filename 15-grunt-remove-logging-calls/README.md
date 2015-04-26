## [Blog post](http://grunt-tasks.com/grunt-remove-logging-calls/ "grunt remove logging calls")

Grunt Remove logging Calls is a grunt plugin for removing the console logging statements made in your javascript files.
You can use this plugin to remove logging for production while also keeping console.log statements for development
for better debugging.

There are two plugins for this grunt-remove-logging and grunt-remove-logging-calls.
For simple use you should use grunt-remove-logging and for more comprehensive development grunt-remove-logging-calls will be a better option

## Getting Started

Depending upon your use case, To install this in your project, run
`npm install grunt-remove-logging-calls grunt-remove-logging --save-dev`

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

You have got some console.log statements for debugging purposes in your js files which you want to remove for production. This can be easily done using grunt-remove-logging-calls.

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

After you run grunt from the command line, new js files are created in dist/ folder and the logging statements are removed the new myscript.js:

```js
$(document).ready(function() {

  $("#submit").on("click", function() {

  });
});
```

## How to use grunt-remove-logging with [grunt-usemin](http://grunt-tasks.com/grunt-usemin/)

For most of my projects, grunt-usemin is the plugin that I will use because its easy to setup.
I have already written a blog post about using [grunt-usemin](http://grunt-tasks.com/grunt-usemin/) in your projects.

Grunt-remove-logging-calls is based on Esprima tree, so it can handle minified code as well as complicated cases like
`console.log('hello: ' + foo(), bar())` easily.

The below configuration for grunt files will make only comment all the console.logs statements not remove them.

```js
removeLoggingCalls: {
  files: ['dist/js/*.js'],
  options: {
    methods: ['log', 'info', 'assert'],
    strategy: function(consoleStatement) {
      return '/* ' + consoleStatement + '*/';
    }
  }
}
```
But one parameter that I found difficult to handle was the addition of comma in minified js files. [Github Issue](https://github.com/jdborowy/grunt-remove-logging-calls/issues/2).

So if my script.js file is:

```js
$(document).ready(function(){
  console.log('Document is ready');
  $("#submit").on("click", function() {
    console.log("Submit Button Clicked");
  });
})
```

the resultant js file minified by uglify looks like:

```js
$(document).ready(function(){console.log("Document is ready"),$("#submit").on("click",function(){console.log("Submit Button Clicked")})});
```

the resultant javascript file after applying remove logging calls:

```js
$(document).ready(function(){/*console.log("Document is ready")*/,$("#submit").on("click",function(){/*console.log("Submit Button Clicked")*/})});
```

which when run in the browser results in an error of `Unexpected token ,`
So how do we use grunt-remove-loggging in conjunction with grunt-usemin without breaking the existing javascript was the problem statement which lead me to this [blog post](http://blog.vjeux.com/2011/javascript/javascript-comma-trick.html) which gave me the idea for the trick.

> By using any variable like debugVar before the comma, we can avoid syntax error.

So this will not result in an error:
```js
var debugVar = '';
$(document).ready(function(){$("#submit").on("click",function(){if(window.DEBUG){console.log("Submit Button Clicked")}debugVar})});
```

Of course we need to define debugVar before
```html
<script>
    window.debugVar = '';
</script>
```

This is what the resultant Gruntfile.js looks like:

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
    removeLoggingCalls: {
      files: ['dist/js/*.js'],
      options: {
        methods: ['log', 'info', 'assert'],
        strategy: function(consoleStatement) {
          return 'if(window.DEBUG){' + consoleStatement + '}debugVar';
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
    'removeLoggingCalls'
  ]);
};
```

Go run this in your browser.

The strategy parameter in removeLoggingCalls accepts a function with console.log statement as the first argument and will replace that with whatever string you return.
Simply put you can even have this:

```js
removeLoggingCalls: {
  files: ['dist/js/*.js'],
  options: {
    methods: ['log', 'info', 'assert'],
    strategy: function(consoleStatement) {
      return 'if(window.DEBUG){' + consoleStatement + '}debugVar';
    }
  }
}
```

This would make sure that if you have window.DEBUG = true, all the console.logs will be printed in production as well.
As usual this blog post as well as this code is available on [github](https://github.com/kanakiyajay/grunt-tasks/tree/master/15-grunt-remove-logging-calls).



