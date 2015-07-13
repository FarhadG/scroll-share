function renderStatus(statusText, url) {
    copyToClipboard(url);
    chrome.browserAction.setBadgeText({ text: 'done' });
    setTimeout(function() {
        chrome.browserAction.setBadgeText({ text: '' });
    }, 1500);
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

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest([
        {
            content: text + " one",
            description: "the first one"
        },
        {
            content: text + " number two",
            description: "the second entry"
        }
    ]);
});

chrome.omnibox.onInputEntered.addListener(function(text) {
    alert('You just typed "' + text + '"');
});

document.addEventListener("DOMContentLoaded", function(event) {
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'clicked' }, function(response) {
                renderStatus(response.url, response.url);
            });
        });
    });
});

