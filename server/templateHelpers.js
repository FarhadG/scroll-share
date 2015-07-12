var jsdom = require('jsdom');

module.exports.injectScript = function injectScript (scriptTag, htmlFile) {
	return htmlFile.split('</body>').join(scriptTag + '</body>');
}

module.exports.addBaseToHTML = function addBaseToHTML (baseTag, htmlFile) {
	return htmlFile.split('<head>').join('<head>' + baseTag);
}

module.exports.ensureAbsolutePaths = function ensureAbsolutePaths (baseURL, htmlFile) {
	return new Promise(function(res, rej) {
		jsdom.env(
			htmlFile,
			[],
			function(error, window) {
				var href;

				if (error) {
					console.log('ERROR PARSING DOM: ', error);
					return res(htmlFile);
				}
				else {
					var anchorTags = window.document.querySelectorAll('a');
					var linkTags = window.document.querySelectorAll('link');
					var imgTags = window.document.querySelectorAll('img');
					var scriptTags = window.document.querySelectorAll('script');
					var inputTags = window.document.querySelectorAll('input');

					for (var i = 0; i < anchorTags.length; i++) {
						ensureAbsolutePath(anchorTags[i], 'href', baseURL);
					}

					for (var i = 0; i < imgTags.length; i++) {
						ensureAbsolutePath(imgTags[i], 'src', baseURL);
					}

					for (var i = 0; i < linkTags.length; i++) {
						ensureAbsolutePath(linkTags[i], 'href', baseURL);
					}

					for (var i = 0; i < scriptTags.length; i++) {
						ensureAbsolutePath(scriptTags[i], 'src', baseURL);
					}

					for (var i = 0; i < inputTags.length; i++) {
						ensureAbsolutePath(inputTags[i], 'src', baseURL);
					}

					var html = jsdom.serializeDocument(window.document);
					return res(html);
				}
			}
		)
	});
}

// helpers for helpers

function ensureAbsolutePath (element, attribute, baseURL) {
	var href = element.getAttribute(attribute);

	if (href && pathIsRelative(href)) {
		if (href.charAt(0) === '/') {
			element.setAttribute(attribute, baseURL + href);
		}
		else {
			element.setAttribute(attribute, baseURL + '/' + href);
		}
	}
}

function pathIsRelative(path) {
	return !(~path.indexOf('//'));
}