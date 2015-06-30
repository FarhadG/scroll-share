function getCurrentTabUrl() {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        var url = tabs[0].url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        return url;
    });
}

function renderStatus(statusText, url) {
    document.getElementById('status').textContent = statusText;
    document.getElementById('url').value = url;
    copyToClipboard(url);
}

function copyToClipboard(text) {
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}

function scroll(){
    console.log("Random text");
    chrome.tabs.executeScript(1, {code: 'alert("cool"); var x= document.body.scrollTop; document.body.scrollTop+=1; var y=document.body.scrollTop; if(x==y){document.body.scrollTop=0;}'});
}

chrome.browserAction.onClicked.addListener(function() {
    var marker = new Marker({
        url: getCurrentTabUrl()
    });
    var url = marker.getPositionedURL();
    console.log(url);
    // scroll();
    // renderStatus('URL copied to clipboard!', url);
});
