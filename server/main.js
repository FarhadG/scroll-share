// NPM modules

var express = require('express');
var request = require('request');
var url = require('url');
var fs = require('fs');

var app = express();

// Local modules

var helpers = require('./templateHelpers');

// Scripts to inject

var scriptSrc = fs.readFileSync('scripts/scroll-position.js', { encoding: 'utf8' });
var scriptTag = '<script>' + scriptSrc + '</script>';

// Server source

app.get('/', function(req, res) {
	var rootURL = req.query['root'];
	var scrollPos = req.query['scroll'];
	var baseTag = '<base href="' + url.parse(rootURL).host + '" target="_blank">';

	// TODO: remove this
	scrollPos = 501;

	request(rootURL, function (error, response, body) {
		var html;

		if (error) {
			console.log(error);
		}
		else if (!response.statusCode === 200) {
			console.log('INCORRECT RESPONSE CODE ', response.statusCode);
		}
		else {
			html = body;
			new Promise(function(res, rej) { res(html) })
				.then(helpers.addBaseToHTML.bind(null, baseTag))
				.then(helpers.injectScript.bind(null, scriptTag))
				.then(helpers.editAnchorTagPaths.bind(null, rootURL))
				.then(function(html) {
					res.send(html);
				})
				.catch(function(err) {
					console.log(err)
				});
		}
	})
});

// List to port

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening on port 3000')
});
