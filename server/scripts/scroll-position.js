module.exports = function(options) {
	return '' + 

	'setTimeout(function() {' + 
		'document.body.scrollTop = ' + options.positionY + ';' + 
	'});';
}