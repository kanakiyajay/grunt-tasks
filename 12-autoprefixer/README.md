## [Blog post](http://grunt-tasks.com/12-autoprefixer/ "autoprefixer")

Grunt AutoPrefixer is a grunt plugin that parses all your css files in your web app and adds vendor specifix prefixes like -webkit- or -moz depending upon [Can I Use](http://caniuse.com/).
Its extremely easy to setup and requires little configuration and is recommended by Google and is actively used by Twitter.

## Some of the examples that this plugin can add :-

The following css property applied on an anchor element
```css
:fullscreen a {
	display: flex;
	transition: 1s all;
}
```

will be automatically converted to

```css
:-webkit-full-screen a {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-transition: 1s all;
	        transition: 1s all;
}
:-moz-full-screen a {
	display: flex;
	transition: 1s all;
}
:-ms-fullscreen a {
	display: -ms-flexbox;
	display: flex;
	transition: 1s all;
}
:fullscreen a {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-transition: 1s all;
	        transition: 1s all;
}
```

It requires autoprefixer-core to be explicitly declared.
To start using this in your build configuration first install it
`npm install grunt-postcss autoprefixer-core --save-dev`

Here's the grunt file that we have used:
```js
module.exports = function(grunt) {

  var autoprefixer = require('autoprefixer-core');
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      postcss: {
        options: {
          processors: [
            autoprefixer({
              browers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            }).postcss
          ]
        },
        dist: {
				files: {
					'dist/': 'css/*.css'
				}
        }
      }
  });

  grunt.registerTask('default', ['postcss']);
};
```

After running grunt on the sample.css inside folder, its replaced by the vendor prefixed version.