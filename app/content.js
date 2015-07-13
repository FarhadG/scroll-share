function ScrollShare(options) {
    if (!(this instanceof ScrollShare)) {
        return new ScrollShare();
    }
    this.appUrl = 'scrollshare.co/'
    this.siteURL = (options && options.url) || window.location.href;
}

ScrollShare.prototype.getScrollTop = function getScrollTop() {
    if (typeof pageYOffset !== 'undefined') {
        return pageYOffset;
    }
    else {
        var el = document.body ? document.body : document.documentElement;
        return el.scrollTop;
    }
};

ScrollShare.prototype.getPositionedURL = function getPositionedURL() {
    var pageOffset = this.getScrollTop();
    return [
        this.appUrl,
        '?root='+ this.siteURL,
        '&scroll='+ pageOffset,
    ].join('');
};

var SS = new ScrollShare();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'clicked') {
        sendResponse({
            url: SS.getPositionedURL(),
            position: SS.getScrollTop()
        });
    }
});
