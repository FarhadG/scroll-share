function Marker() {
    if (!(this instanceof Marker)) {
        return new Marker();
    }
    this.appUrl = 'http://www.marker.com/'
    this.siteURL = window.location.href;
}

Marker.prototype.getScrollTop = function getScrollTop() {
    if (typeof pageYOffset !== 'undefined') {
        return pageYOffset;
    }
    else {
        var el = document.body ? document.body : document.documentElement;
        return el.scrollTop;
    }
};

Marker.prototype.getPositionedURL = function getPositionedURL() {
    var pageOffset = this.getScrollTop();
    return [
        this.appUrl,
        '?root='+ this.siteURL,
        '&scroll='+ pageOffset,
    ].join('');
};

var M = new Marker();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'clicked') {
        sendResponse({
            url: M.getPositionedURL(),
            position: M.getScrollTop()
        });
    }
});
