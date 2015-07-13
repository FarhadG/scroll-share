function getScrollTop() {
    if (typeof pageYOffset !== 'undefined') {
        return pageYOffset;
    }
    else {
        var el = document.body ? document.body : document.documentElement;
        return el.scrollTop;
    }
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting === "hello") {
        alert('test')
      sendResponse({farewell: "goodbye"});
    }
});
