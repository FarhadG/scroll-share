function getCurrentTabUrl(cb) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        var url = tabs[0].url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        cb(url);
    });
}

function renderStatus(statusText, url) {
    document.getElementById('status').textContent = statusText;
    document.getElementById('url').value = url;
    copyToClipboard(url);

    var position = marker.getPositionedURL();
    alert(position);
}

function copyToClipboard(text) {
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = 'off';
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand('Copy', false, null);
    document.body.removeChild(copyDiv);
}

document.addEventListener("DOMContentLoaded", function(event) {
    chrome.browserAction.onClicked.addListener(function(tab) {

      chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
      });


        // getCurrentTabUrl(function(url) {
        // //     var marker = new Marker({ url: url });
        // //     renderStatus('COPIED!', url);
        // });
    });
});

