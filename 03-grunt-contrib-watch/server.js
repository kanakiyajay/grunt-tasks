var express = require("express");
var path = require("path");
var app = express();

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000);
console.log("Listening on 3000");

module.exports = app;