## [Blog post](http://grunt-tasks.com/grunt-exec/ "grunt exec")

Grunt Exec is a powerful grunt plugin which provides a wrapper over shell (cmd) commands and which can be modified from your Gruntfile.js.

## Getting Started

`npm install grunt-exec --save-dev`

You want to execute a very simple shell command that just outputs hello
`echo hello`

So Here is the Gruntfile.js for that:

```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    exec: {
    	list_files: {
    		cmd: 'echo hello'
    	}
    }
  });

  grunt.registerTask('default', ['exec:list_files']);
};
```

Heres what you get when you run this from the command line:

```
$ grunt
Running "exec:sayHello" (exec) task
hello

Done, without errors.
```

## More advanced
