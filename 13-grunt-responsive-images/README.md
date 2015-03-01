## [Blog post](http://grunt-tasks.com/responsive-images/ "grunt responsive images")

Grunt responsive images is a grunt-js plugin that automatically produces scales images to different sizes for different devices in order to create responsive images.

Consider a medium based website. As with most new websites image form a big part of it. Now you don't want to load the same image for a person visiting the website on an iMac or his handheld device. You want to deliver the optimum experience on all devices and responsive images form a huge part in that.

Thats why, browser vendors have come up with a new standard [picture](http://www.html5rocks.com/en/tutorials/responsive/picture-element/) that will solve the responsive images headache.

Theres also a [demo](http://googlechrome.github.io/samples/picture-element/) available on how to use picture element.

Instead of manually resizing all images, you can automate this task. Here's how:

## Getting Started

Pre-requirements: You need to have GraphicsMagick or ImageMagick installed on your machine because grunt responsive images depends on this to do the resizing.
If you are using ImageMagick, be sure to specify 'im' in engine in options.

After that

`npm install grunt-responsive-images --save-dev`

This will add the grunt-responsive images in developer dependencies of package.json
Lets say this is your folder-file structure:
```
.
├── dist
├── Gruntfile.js
├── index.html
└── src
    └── img
        └── grunt-usemin.jpg
```
Where you have all your development files in your src/ folder and your minified/production files in dist/

Add that as a task in your Gruntfile.js
```
responsive_images: {
 main: {
   options: {
     engine: 'im',
     sizes: [{
       width: 100
     }, {
       width: 250
     }]
   },
   files: [{
     expand: true,
     src: ['img/**/*.{gif,png,jpg,jpge}'],
     cwd: 'src/',
     dest: 'dist/'
   }]
 }
}
```

if you want to have scaled up images you have to add `upscale: true` in the sizes object property.
After you run grunt it will resize the images and put them in img/
```
├── dist
│   └── img
│       ├── grunt-usemin-400.jpg
│       └── grunt-usemin-800.jpg
```