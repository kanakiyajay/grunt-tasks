## Introduction

time-grunt is a utility grunt plugin from Sindre Sorhus for calculating the time it took for each task in executing your grunt build setup. Additionally it can be used to pass the timing stats for your own analysis.

## Getting Started

Lets consider Gruntfile.js from the previous [post](http://grunt-tasks.com/grunt-htmlmin/) which utilizes grunt-usemin and grunt-contrib-html to minify, concat, revision your static assets as well as minify html file.
First you will need to install it

`npm install time-grunt --save-dev`

All you need is to add the below line to get time statistics:

`require('time-grunt')(grunt);`

On running `grunt` from the command line:
```
Execution Time (2015-05-09 08:33:15 UTC)
uglify:generated  16.2s  █████████████████████████████████████████████████████████████ 91%
cssmin:generated     1s  ████ 6%
Total 17.7s
```

You might find out that tasks that less than 1% are hidden to reduce the clutter.

On running `grunt --verbose` you will get the whole output:
```
Execution Time (2015-05-09 08:34:53 UTC)
loading tasks        20ms  0%
copy:generated       90ms  █ 1%
useminPrepare:html  100ms  █ 1%
concat:generated     90ms  █ 1%
uglify:generated     8.8s  ███████████████████████████████████████████████████████████ 91%
cssmin:generated    490ms  ████ 5%
filerev:source       30ms  0%
usemin:html          50ms  █ 1%
htmlmin:dist         30ms  0%
Total 9.7s
```