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

## Getting Started
