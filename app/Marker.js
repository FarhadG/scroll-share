function Marker(options) {
    if (!(this instanceof Marker)) {
        return new Marker();
    }
    this.appUrl = 'http://www.marker.com/'
    this.siteURL = options.url || window.location.href;
}

Marker.prototype.init = function init() {
    this.checkPagePosition();
    this.initListener();
    var debouncedUpdatePosition = this.debounce(this.updateURLPosition, 500);
    window.onscroll = debouncedUpdatePosition.bind(this);
    return this;
};

Marker.prototype.checkPagePosition = function checkPagePosition() {
    if (~this.siteURL.indexOf('#scroll=')) {
        var params = this.siteURL.split('#scroll=');
        var offset = params.slice(-1)[0];
        this.setScrollTop(offset);
        this.siteURL = params[0];
    }
    return this;
};

Marker.prototype.initListener = function initListener() {
    var el = document.getElementsByTagName('h1')[1];
    el.addEventListener('click', function() {
        var url = this.getPositionedURL();
        console.log(url);
    }.bind(this));
};

Marker.prototype.debounce = function debounce(func, wait) {
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

Marker.prototype.getScrollTop = function getScrollTop() {
    if (typeof pageYOffset !== 'undefined') {
        return pageYOffset;
    }
    else {
        var el = document.body ? document.body : document.documentElement;
        return el.scrollTop;
    }
};

Marker.prototype.setScrollTop = function setScrollTop(value) {
    var el = document.body ? document.body : document.documentElement;
    el.scrollTop = value;
    return this;
};

Marker.prototype.updateURLPosition = function updateURLPosition() {
    var pageOffset = this.getScrollTop();
    window.location.href = this.siteURL +'#scroll='+ pageYOffset;
};

Marker.prototype.getPositionedURL = function getPositionedURL() {
    var pageOffset = this.getScrollTop();
    return [
        this.appUrl,
        '?root='+ this.siteURL,
        '&scroll='+ pageOffset,
    ].join('');
};
