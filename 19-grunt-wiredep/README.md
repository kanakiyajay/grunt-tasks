## [Blog post](http://grunt-tasks.com/grunt-wiredep/ "grunt wiredep")

Grunt wiredep is a quick grunt plugin that helps you inject bower packagers, i.e., links to your dependencies in your front-end source code.

For example, if you have a jade templating system in your project and every time you install a bower module you want to update that in your source code, this is the grunt plugin to use.

The way this works is you define in your html/jade/<insert templating engine> the wrapper where you want to include dependencies

```html
<!-- bower:js -->
This is the place where your script tags will be inserted
<!-- endbower -->
```

## Using Bower

You will have to make sure you have bower installed on your machine before starting.
If not, it can be installed using `npm install -g bower`
Then run `bower init`

Follow the command line tutorial and it will generate your bower.json for your project.

## Getting started

From the command line in your project folder run the following:

`npm install grunt-wiredep --save-dev`

This will make sure that grunt-wiredep is installed a development dependency in your package.json.
Here is your Gruntfile.js:
```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    wiredep: {
      task: {
        src: ['index.html']
      }
    }
  });

  grunt.registerTask('default', ['wiredep']);
};
```

Here is your index.html, you can have configuration in multiple files:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>How to use Grunt Wirdep</title>
  <!-- bower:css -->
  <!-- endbower -->
</head>
<body>
  <!-- bower:js -->
  <!-- endbower -->
</body>
</html>
```

Now install bootstrap via bower:

`bower install bootstrap --save`
`grunt`

Now after running grunt wiredep, the bootstrap components will appear in your index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>How to use Grunt Wirdep</title>
  <!-- bower:css -->
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
  <!-- endbower -->
</head>
<body>
  <!-- bower:js -->
  <script src="bower_components/jquery/dist/jquery.js"></script>
  <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
  <!-- endbower -->
</body>
</html>
```