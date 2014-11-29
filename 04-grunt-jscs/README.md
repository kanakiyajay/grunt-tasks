## [Blog post](http://grunt-tasks.com/grunt-jscs/ "grunt jscs")

grunt jscs is grunt plugin for javascript code linting of all the javascript files for coding conventions.
The jscs has got over 60 code validation rules coveringn wide range of options like indentation, maximum line length, maximum function block length, maximum file length, line breaks. curly braces, spaces before functions, array declaration etc.

For your front-end project, you should have a .jscsrc file which contains javascript style checklist for that project.
This is the ".jscsrc" file for Airbnb style guide
*[Sample jscsrc files](https://github.com/jscs-dev/node-jscs/tree/master/presets)*
```
{
    "disallowSpacesInNamedFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "disallowSpacesInFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "disallowSpacesInAnonymousFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "disallowSpacesInFunctionDeclaration": {
        "beforeOpeningRoundBrace": true
    },
    "disallowEmptyBlocks": true,
    "disallowSpacesInsideArrayBrackets": true,
    "disallowSpacesInsideParentheses": true,
    "disallowQuotedKeysInObjects": true,
    "disallowSpaceAfterObjectKeys": true,
    "disallowSpaceAfterPrefixUnaryOperators": true,
    "disallowSpaceBeforePostfixUnaryOperators": true,
    "disallowSpaceBeforeBinaryOperators": [
        ","
    ],
    "disallowMixedSpacesAndTabs": true,
    "disallowTrailingWhitespace": true,
    "disallowTrailingComma": true,
    "disallowYodaConditions": true,
    "disallowKeywords": [ "with" ],
    "disallowMultipleLineBreaks": true,
    "requireSpaceBeforeBlockStatements": true,
    "requireParenthesesAroundIIFE": true,
    "requireSpacesInConditionalExpression": true,
    "requireMultipleVarDecl": "onevar",
    "requireBlocksOnNewline": 1,
    "requireCommaBeforeLineBreak": true,
    "requireSpaceBeforeBinaryOperators": true,
    "requireSpaceAfterBinaryOperators": true,
    "requireCamelCaseOrUpperCaseIdentifiers": true,
    "requireLineFeedAtFileEnd": true,
    "requireCapitalizedConstructors": true,
    "requireDotNotation": true,
    "requireCurlyBraces": [
        "do"
    ],
    "requireSpaceAfterKeywords": [
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "case",
        "return",
        "try",
        "catch",
        "typeof"
    ],
    "safeContextKeyword": "_this",
    "validateLineBreaks": "LF",
    "validateQuoteMarks": "'",
    "validateIndentation": 2
}
```

## Getting Started. (Commit: 37e6a597c)

Lets start by writing a sample jscs grunt task that should check Gruntfile.js for code covention errors according to the AirBnb javascript style guide. Save it as .jscsrc.
Here's its grunt file:

```
module.exports = function(grunt) {
  grunt.initConfig({
      jscs: {
        src: 'Gruntfile.js',
        options: {
          config: '.jscsrc'
        }
      }
  });

  grunt.loadNpmTasks('grunt-jscs');
  grunt.registerTask('default', ['jscs']);
};
```

On running grunt from cmd, you should get this error:

```
$ grunt
Running "jscs:src" (jscs) task
Invalid line break at Gruntfile.js :
     1 |module.exports = function(grunt) {
------------------------------------------^
     2 |  grunt.initConfig({
     3 |      jscs: {
Missing line feed at file end at Gruntfile.js :
    11 |  grunt.loadNpmTasks('grunt-jscs');
    12 |  grunt.registerTask('default', ['jscs']);
    13 |};
--------^
>> 2 code style errors found!
Warning: Task "jscs:src" failed. Use --force to continue.

Aborted due to warnings.
```

Both of them are related to line endings for windows line ending are "CRLF" for linux its "LF", this can be easily fixed in Sublime (or your text editor) by setting Settings -> Users -> as

```
"default_line_ending": "LF",
"default_line_ending": "unix",
```

After running grunt you should now be able to successfully run grunt on it.
If you want to check all the rules visit this [link](http://catatron.com/node-jscs/rules/ "jscs rules")

## For multiple files

```
module.exports = function(grunt) {
  grunt.initConfig({
      jscs: {
			main: "app.js",
			controllers: {
	        	src: ['Gruntfile.js', 'src/js/*.js'],
	        	options: {
	         	 config: '.jscsrc'
	        	}
			}
			// You can add more configurations over here
      }
  });

  grunt.loadNpmTasks('grunt-jscs');
  grunt.registerTask('default', ['jscs']);
};
```