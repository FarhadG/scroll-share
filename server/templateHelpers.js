var jsdom = require('jsdom');

function injectScript (scriptTag, htmlFile) {
	return new Promise(function(res, rej) {
		res(
			htmlFile.split('</body>').join(scriptTag + '</body>')
		);
	});
}

function addBaseToHTML (baseTag, htmlFile) {
	console.log(baseTag)
	return new Promise(function(res, rej) {
		res(
			htmlFile.split('<head>').join('<head>' + baseTag)
		);
	});
}

function editAnchorTagPaths (baseURL, htmlFile) {
	return new Promise(function(res, rej) {
		jsdom.env(
			htmlFile,
			[],
			function(error, window) {
				var href;

				if (error) {
					return console.log('ERROR parsing DOM: ', error);
				}
				else {
					var anchorTags = window.document.querySelectorAll('a');
					var linkTags = window.document.querySelectorAll('link');
					var imgTags = window.document.querySelectorAll('img');
					var scriptTags = window.document.querySelectorAll('script');
					var inputTags = window.document.querySelectorAll('input');

					for (var i = 0; i < anchorTags.length; i++) {
						addBaseURLToElement(anchorTags[i], 'href', baseURL);
					}

					for (var i = 0; i < imgTags.length; i++) {
						addBaseURLToElement(imgTags[i], 'src', baseURL);
					}

					for (var i = 0; i < linkTags.length; i++) {
						addBaseURLToElement(linkTags[i], 'href', baseURL);
					}

					for (var i = 0; i < scriptTags.length; i++) {
						addBaseURLToElement(scriptTags[i], 'src', baseURL);
					}

					for (var i = 0; i < inputTags.length; i++) {
						addBaseURLToElement(inputTags[i], 'src', baseURL);
					}

					var html = jsdom.serializeDocument(window.document);
					return res(html);
				}
			}
		)
	});
}

function addBaseURLToElement (element, attribute, baseURL) {
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

module.exports = {
	injectScript: injectScript,
	addBaseToHTML: addBaseToHTML,
	editAnchorTagPaths: editAnchorTagPaths
};