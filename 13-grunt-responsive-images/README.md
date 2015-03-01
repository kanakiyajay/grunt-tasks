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
```js
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


But this will only generate the images, not replace them in the src in your html.
Ideally it should do both, replace all img tags with the picture polyfill as well as generate the new images.

Thankfully, [Stephan Max](http://stephanmax.is/) has written another grunt plugin [grunt-responsive-images-extender](https://github.com/smaxtastic/grunt-responsive-images-extender) to complement grunt-responsive-image

Similarly, install it and add it to devDependencies
`npm install grunt-responsive-images-extender --save-dev`

The default options for sizes in both the grunt plugins is
```js
	[{
		name: 'small', width: 320
	}, {
		name: 'medium', width: 640
	},{
		name: 'large', width: 1024
	}]
```

This is the grunt task used for responsive images extender:

```js
responsive_images_extender: {
 main: {
   options: {
     sizes: [{
       selector: 'img',
       sizeList: [{
           cond: 'min-width: 300px',
           size: '50vw'
         }, {
           cond: 'min-width: 700px',
           size: '70vw'
         }, {
           cond: 'default',
           size: '100vw'
       }]
     }]
   },
   files: [{
     expand: true,
     src: ['**/*.{html,htm,php}'],
     cwd: 'src/',
     dest: 'dist/'
   }]
 }
}
```

On running the above `grunt`, it will find all the images as specified in `selector` property and add the corresponding attributes as specified in `sizes`.
In this case I am using the default grunt-responsive-image property of producing three images with suffix large, medium and small.


Source: src/index.html
```html
<img src="img/grunt-usemin.jpg" alt="a cute kitten">
```

Production: dist/index.html
```html
 <img src="img/grunt-usemin.jpg" alt="a cute kitten" srcset="img/grunt-usemin-small.jpg 320w, img/grunt-usemin-medium.jpg 640w, img/grunt-usemin-large.jpg 1024w" sizes="(min-width: 300px) 50vw, (min-width: 700px) 70vw, 100vw">
```

Read more about srcset and sizes [here](http://martinwolf.org/2014/05/07/the-new-srcset-and-sizes-explained/ "srcset")

Make sure to also add picturefill.js to the head for older browsers.
