Grunt contrib uglify is an official plugin in the grunt ecosystem to minify and concat your project's javascript files and integrating it with your build system.

Here's the most simplest way on how to use it:

From the command line:

## Simple Configuration

`npm install grunt grunt-contrib-uglify --save-dev`

This will install grunt as well uglifyjs in your node_modules devDependencies as well as update package.json

Inside your Gruntfile.js:

```
  module.exports = function(grunt) {
    grunt.initConfig({
      uglify: {
        my_target: {
          files: {
            'dest/minified.js': ['src/jquery.js', 'src/angular.js']
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
    grunt.registerTask('default', ['uglify']); // Default grunt tasks maps to grunt
  };
```

From the command line:

```
  $ grunt
  Running "uglify:my_target" (uglify) task
  >> 1 file created.

  Done, without errors
```

The object that we have to look at is this

```
    uglify: {
      my_target: {
        files: {
          'dest/minified.js': ['src/jquery.js', 'src/angular.js']
        }
      }
    }
```

## Multiple Folder and files

You can create multiple 'targets' or major folders while 'files' param should specify what should go inside that folder.
If you have a project configuration such as this

```
  .
  ├── dest
  │   ├── file1.min.js
  │   ├── file2.min.js
  ├── dest2
  │   └── jquery.all.min.js
  ├── src
  │   ├── angular.js
  │   └── jquery.js
  └── src2
      ├── jquery.mobile.js
      └── jquery-ui.js
```
You want dest2 is another sub-project where you require all the jquery files minified.
To achive this you need to change your Grunt-file like this:

```
  first_target: {
    files: {
      'dest/file1.min.js': ['src/jquery.js', 'src2/jquery.mobile.js'],
      'dest/file2.min.js': ['src/jquery.js', 'src/angular.js']
    }
  },
  second_target: {
    files: {
      'dest2/jquery.all.min.js': ['src/jquery.js', 'src2/jquery.mobile.js', 'src2/jquery-ui.js']
    }
  }
```

After running grunt you should see the minified files being generated.
What if you only want one first_target or only *1 sub-project* minified folder being generated ?

Run :

`grunt uglify:first_target`

## Adding banners

Generally its good practise to add comments above every minified file to indicate the package name, build information and extra information.

```
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
           banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */'
        } ...
      }
    });
```
The erb tags that you see refers to grunt template system, the grunt.template.today is a helper function while `<%= pkg.name %>` will map to 'name' in package.json file.

## Dynamic filenames

Caching of files takes place depending upon the filename, so how do we create a new min.js for every build ?

```
  first_target: {
    files: {
      'dest/script.<%= grunt.template.today('yymmddHHMM') %>.min.js': ['src/jquery.js', 'src2/jquery.mobile.js']
    }
  }
```

This will create a minified file with name script.1411161327.min.js with comment

`/*! grunt-contrib-uglifyjs - v0.0.0 - 2014-11-16 */`

## Pattern Matching for multiple files

Most of the time there are more than 6 sub-projects and more than 60 javascript files in a project.
How do map all of them using minimal grunt code ?

```
 first_target: {
    files: [
      { src: 'src/common/*js', dest: 'dest/common.js'}, // All the common files
      { src: 'src/ui/*js', dest: 'dest/ui.js'}
    ]
  }
```

[More on globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns)
