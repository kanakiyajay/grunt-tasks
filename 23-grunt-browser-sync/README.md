## Introduction

Grunt-Browser-Sync is the official grunt-js plugin from BrowserSync to reload your browser on any css file changes. It can create its own server or hook into an existing server.
BrowserSync also automatically reloads all tabs which are dependent on that css file which enables you to work seamlessly with multiple devices. If you haven't started using [browsersync](http://www.browsersync.io/) its recommended you should.

In this tutorial I am going to demonstrate its usage with Grunt.

## Getting Started

You can install it from the command line:
`npm install grunt-browser-sync --save-dev`
 The flag --save-dev will get it installed in your project's package.json as well.

For the first example we will consider a very basic html webpage linked to to 2 css files.
On making a change inside the css file, all tabs with that html file open should refresh enabling us to quickly change properties.

Heres the Gruntfile.js for that:

```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    browserSync: {
      bsFiles: {
        src: 'css/*.css'
      },
      options: {
        server: {
          baseDir: './'
        }
      }
    }
  });

  grunt.registerTask('default', ['browserSync']);
};
```

On running grunt from the command line:

```
$ grunt
Running "browserSync:bsFiles" (browserSync) task
[BS] Access URLs:
 -------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.33:3000
 -------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.33:3001
 -------------------------------------
[BS] Serving files from: ./
[BS] Watching files...
```

Now you can open up the same url in multiple browsers as well as visit 192.168.1.33:3000 from your smartphone.
Once you change anything inside custom.css all the tabs will reload.
BrowserSync also has the ability to sync scroll, form, refresh actions and also provides you with a control panel UI.
![screenshot](https://raw.githubusercontent.com/kanakiyajay/grunt-tasks/master/23-grunt-browser-sync/images/browsersync.jpg)

## External Server

Many a times we will have an external server built on express / php / django / rails and we want to use BrowserSync and grunt with it.
Sweat not! BrowserSync has this support built-in using its proxy featured.

This is the only option that you need to change:

```js
options: {
  proxy: 'localhost:80'
}
```

You can even add port, logs watchOptions and middlewares.

Here is the [full list](http://www.browsersync.io/docs/options/) of options.

Found something wrong in the above article, send a pull request in the [github repo](http://github.com/kanakiyajay/grunt-tasks/23-grunt-browser-sync/) or notify in the comments below.
I will also love to hear about your cool hacks around grunt-image-embed.
