## [Blog post](http://grunt-tasks.com/grunt-jsonlint/ "grunt jsonlint")

Grunt-jsonlint is a small yet a very useful tool for validating your project json files which might be some static data, some configuration file through the task-runner grunt.

## Getting Started

You have the below project folder structure:

```
├── config
│   └── config.json
├── data
│   └── cities.json
├── Gruntfile.js
├── package.json
└── README.md
```

Inside the data folder, you have some contants json list inside data for example cities.json, countries.json, currencies.json while inside config folder you will have a json folder containing the credentials/configurations for your project.
Now multiple people might be colloborating on the constants and the config files and you need to make sure all your json files are validated.
This grunt plugin will validate all your json files so that you dont run into issues in production.

From your command line run:

`npm install grunt-jsonlint --save-dev`

Lets say you have this config.json:

```js
{
  "configkey1": "configvalue1",
  "configkey2": "configvalue2",
  "configkey3": "configvalue3",
}
```

After you run `grunt` from the command line:

```
$ grunt
Running "jsonlint:sample" (jsonlint) task
>> File "config/config.json" failed JSON validation.
Warning: Parse error on line 4:
...3": "configvalue3",}
----------------------^
Expecting 'STRING', got '}' Use --force to continue.

Aborted due to warnings.
```

Oops! A typo over there on line3, Lets fix it.

```js
{
  "configkey1": "configvalue1",
  "configkey2": "configvalue2",
  "configkey3": "configvalue3"
}
```

Running grunt now:

```
$ grunt
Running "jsonlint:sample" (jsonlint) task
>> 2 files lint free.

Done, without errors.
```

You just got saved hours from debugging this in production.
if you have any json files inside your project you should integrate this plugin.

Would love to know your thoughts in the comments below: