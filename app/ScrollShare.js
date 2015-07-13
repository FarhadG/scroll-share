function ScrollShare(options) {
    if (!(this instanceof ScrollShare)) {
        return new ScrollShare();
    }
    this.appUrl = 'scrollshare.co/'
    this.siteURL = (options && options.url) || window.location.href;
}

ScrollShare.prototype.init = function init() {
    this.checkPagePosition();
    this.initListener();
    var debouncedUpdatePosition = this.debounce(this.updateURLPosition, 500);
    window.onscroll = debouncedUpdatePosition.bind(this);
    return this;
};

ScrollShare.prototype.checkPagePosition = function checkPagePosition() {
    if (~this.siteURL.indexOf('#scroll=')) {
        var params = this.siteURL.split('#scroll=');
        var offset = params.slice(-1)[0];
        this.setScrollTop(offset);
        this.siteURL = params[0];
    }
    return this;
};

ScrollShare.prototype.debounce = function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this,args = arguments;
        function later() {
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
};

ScrollShare.prototype.getScrollTop = function getScrollTop() {
    if (typeof pageYOffset !== 'undefined') {
        return pageYOffset;
    }
    else {
        var el = document.body ? document.body : document.documentElement;
        return el.scrollTop;
    }
};

ScrollShare.prototype.setScrollTop = function setScrollTop(value, time) {
    var el = document.body ? document.body : document.documentElement;
    if (time) {
        var position = 0;
        var timedInterval = setInterval(function() {
            position += (value/time);
            el.scrollTop = position;
            if (position >= value) {
                clearInterval(timedInterval);
            }
        }, value/time);
    }
    else {
        el.scrollTop = value;
    }
    return this;
};

ScrollShare.prototype.updateURLPosition = function updateURLPosition() {
    var pageOffset = this.getScrollTop();
    window.location.href = this.siteURL +'#scroll='+ pageYOffset;
};

ScrollShare.prototype.getPositionedURL = function getPositionedURL() {
    var pageOffset = this.getScrollTop();
    return [
        this.appUrl,
        '?root='+ this.siteURL,
        '&scroll='+ pageOffset,
    ].join('');
};
