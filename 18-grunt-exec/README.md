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

## More advanced working

Lets say you have a more advanced working environment and when pushing to production you want to delete the temporary files or folders that might have been created.
> You might also want to delete npm-debug.log or some other log files that was useful for debuggind but you want it cleaned before pushing to production.

By using grunt-exec removing unnecessary files becomes very easy and you reduce one manual step.

For our example, we will consider a case where you have both a .tmp folder and npm-debug.log file which you want to delete before producionizing.

Here's the project tree before running the task

```
.
├── Gruntfile.js
├── npm-debug.log
├── .tmp
├── package.json
└── README.md

```

After executing grunt from the command line:


```
Running "exec:removeLogs" (exec) task

Running "exec:removeTmp" (exec) task

Done, without errors.
```

Heres the project tree after running the task

```
.
├── Gruntfile.js
├── package.json
└── README.md
```

Here is the corresponding Gruntfile.js

```js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    exec: {
        removeLogs: {
            cmd: 'rm *.log',
            stderr: false
        },
        removeTmp: {
            cmd: 'rm -rf .tmp',
            stderr: false
        }
    }
  });

  grunt.registerTask('default', ['exec:removeLogs', 'exec:removeTmp']);
};

```

See how easy it is
Every project might have some manual steps, if they can be executed from the shell, you should consider shifting them to grunt-exec.
It might save you a good deal of time by automating those small yet important tasks.


I will love to hear about your cool hacks around grunt-exec in the comments below
