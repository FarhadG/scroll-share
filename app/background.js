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

chrome.browserAction.setBadgeText({text: "Mark"});

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest([
      {content: text + " one", description: "the first one"},
      {content: text + " number two", description: "the second entry"}
    ]);
});
chrome.omnibox.onInputEntered.addListener(function(text) {
    alert('You just typed "' + text + '"');
});

// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     switch (request.type) {
//         case "dom-loaded":
//             alert('cool!');
//         break;
//     }
// });
//
//

document.addEventListener("DOMContentLoaded", function(event) {
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'clicked' }, function(response) {
                alert(response.url);
            });
        });
    });
});

