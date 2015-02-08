## [Blog post](http://grunt-tasks.com/grunt-bump/ "grunt bump")

grunt-newer is an simple utility grunt plugin for automatic updation of package versions. grunt-bump allows you to update your versions in your file and additionally do a git-commit with pre-defined tagnames, descriptions

## [Semantic Versioning](http://semver.org/) in short

Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes,
MINOR version when you add functionality in a backwards-compatible manner, and
PATCH version when you make backwards-compatible bug fixes.
Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

## Getting Started

Install grunt-bump by
`npm install grunt-bump --save-dev`
Lets create a simple gruntfile that will just update the version param of package.json

```
module.exports = function(grunt) {

  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json'],
        commit: false,
        createTag: false,
        push: false,
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('bm', ['bump']);
};
```
On running grunt the version will be updated to 0.0.2

```
$ grunt bm
Running "bump" task
>> Version bumped to 0.0.2 (in package.json)

Done, without errors.
```