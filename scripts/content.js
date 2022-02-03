window.onload = function () {
    // alert(1)
    console.log('initialize chrome cleaner...');
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    console.log(sender.tab
        ? "from a content script:" + sender.tab.url
        : `from the extension: ${JSON.stringify(request)}`
    );

    let amount = document.querySelectorAll('*').length;

    if (request.wanted === "amount") sendResponse({ amount });

});


// https://developer.chrome.com/docs/extensions/mv3/messaging/