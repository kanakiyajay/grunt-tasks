## [Blog post](http://grunt-tasks.com/grunt-css-comb/ "grunt css comb")

Grunt Css Comb is a grunt plugin that helps you beautify your css by arranging and formatting the properties as well as the selectors for more maintainable stylesheets.
It even helps to keep a *consistent* css coding style across all projects. The coding style might include naming, organizing,order in which selectors are defined, the way and order in which properties are defined.

Some other benefits also include:

- Maintainable and easier debuggable code
- Reading and tweaking css becomes easier
- Will also prevent unknown or accidental syntax errors.

There is a great [post](http://www.smashingmagazine.com/2012/10/02/csscomb-tool-sort-css-properties/ "csscomb") explaining the algorithms and csscomb in more detail.

## Getting Started

Depending upon your use case, To install this in your project, run
`npm install grunt-css-comb --save-dev`

We are going to consider a very basic html file and its css file.
Heres the [codepen](http://codepen.io/kanakiyajay/pen/gbZZbb) for the demo index.html
The grunt task should create a new file `css/style.comb.css` and apply all the configurations to it.

Here's the grunt task:

```js
csscomb: {
  dist: {
    files: {
      'css/style.comb.css': ['css/style.css']
    }
  }
}
```
There are many css style guidelines that companies use, according to which you can different csscomb configurations.
In your project root folder, you can have `.csscomb.json` where you can define your csscomb properties.
Here's is the config file I use:

```js
{
    "exclude": [
        ".git/**",
        "node_modules/**",
        "bower_components/**"
      ],
    "remove-empty-rulesets": true,
    "always-semicolon": true,
    "color-case": "lower",
    "block-indent": "    ",
    "element-case": "lower",
    "eof-newline": true,
    "leading-zero": true,
    "quotes": "single",
    "sort-order-fallback": "abc",
    "space-before-colon": " ",
    "space-after-colon": " ",
    "space-before-combinator": " ",
    "space-after-combinator": " ",
    "space-between-declarations": "\n",
    "space-before-opening-brace": " ",
    "space-after-opening-brace": "\n",
    "space-after-selector-delimiter": "\n",
    "space-before-selector-delimiter": "",
    "space-before-closing-brace": "\n",
    "strip-spaces": true,
    "tab-size": true,
    "unitless-zero": true,
    "vendor-prefix-align": true,
    "sort-order": "..."
}
```

Visit this [link](https://github.com/kanakiyajay/grunt-tasks/blob/master/16-grunt-csscomb/.csscomb.json)

There's is an awesome builder for this available [online](http://csscomb.com/config "csscomb config")

Below is the css properties before applying codepen:

```css
  body {
    max-width: 960px;
    margin: 0 auto;
    font-family: "Verdana", sans-serif, Arial;
  }

  h1 {
    margin-bottom: 2em;
    margin-top: 2em;
    text-align: center;
  }

  .para {
    margin-bottom: 10px;
    font-size: 1.1em;
  }

  blockquote {
    font-family: 1.3em;
    padding: 10px;
    margin: 10px;
    background-color: #ccc;
    padding-left: 20px;
  }

  #submit {
    cursor: pointer;
    padding: 10px;
    border: 0;
    margin: 0;
    font-size: 1.1em;
    color: darkgray;
  }

  #list {
    list-style-type: none;
  }

  label {
    padding-left: 10px;
  }

  #list li {
    margin: 5px;
    font-size: 1.1em;
    padding-left: 10px;
    border-left: 1px solid gray;
  }

  #txt, #txta {
    margin: 10px;
    font-size: 1.1em;
  }
```

After running grunt:

```
$ grunt
Running "csscomb:dist" (csscomb) task
>> Using custom config file "H:\grunt-tasks.com\github\16-grunt-csscomb\.csscomb.json"...
>> Sorting file "css/style.css"...

Done, without errors.
```

Here is final output css.

```css
  body {
      font-family : 'Verdana', sans-serif, Arial;
      max-width : 960px;
      margin : 0 auto;
  }

  h1 {
      margin-top : 2em;
      margin-bottom : 2em;
      text-align : center;
  }

  .para {
      font-size : 1.1em;
      margin-bottom : 10px;
  }

  blockquote {
      font-family : 1.3em;
      margin : 10px;
      padding : 10px;
      padding-left : 20px;
      background-color : #ccc;
  }

  #submit {
      font-size : 1.1em;
      margin : 0;
      padding : 10px;
      cursor : pointer;
      color : darkgray;
      border : 0;
  }

  #list {
      list-style-type : none;
  }

  label {
      padding-left : 10px;
  }

  #list li {
      font-size : 1.1em;
      margin : 5px;
      padding-left : 10px;
      border-left : 1px solid gray;
  }

  #txt,
  #txta {
      font-size : 1.1em;
      margin : 10px;
  }
```

The above css properties have been sorted perfectly according to our configuration, indentation has only been changed to match what was in our project. This leads to a cleaner, more maintainable css.

If you have any other use cases regarding css comb or a better way to use in grunt, please leave a comment below.