var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var diaper = require("./src/diaper");
var bottle = require("./src/bottle");
var kids = require("./src/kids");

app.use(bodyParser.json());

app.get("/kids", function (req, res) {
	kids(req.query.email, req.query.password).then(function(kids) {
		res.status(200).json(kids);
	}).catch(function (error) {
		res.status(500).json({ error: error });
	});
});

app.post("/diaper", function (req, res) {
	if (!req.body)  {
		return res.sendStatus(400);
	}

	diaper(req.body.email, req.body.password, req.body.kidId, req.body.type, req.body.quantity).then(function() {
		res.status(200).json({});
	}).catch(function (error) {
		res.status(500).json({ error: error });
	});
});

app.post("/bottle", function (req, res) {
	if (!req.body)  {
		return res.sendStatus(400);
	}

	bottle(req.body.email, req.body.password, req.body.kidId, req.body.type, req.body.quantity).then(function() {
		res.status(200).json({});
	}).catch(function (error) {
		res.status(500).json({ error: error });
	});
});

app.listen(process.env.PORT || 3000, function () {
	console.log("baby-connect-nightmare app listening on port 3000!");
});