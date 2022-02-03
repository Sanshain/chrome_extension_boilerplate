function titleChange(event) {    

    // event.target.innerText = 'ok'
    if (event.target.style) event.target.style.color = 'black';

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { wanted: "amount" }, function (response) {
            // console.log(response.amount);
            // alert(response.amount)
            // event.target.innerText = response.amount + ' elements...';
            document.querySelector('.content').innerText = response.amount + ' elements';
        });
    });

}

// document.getElementById('header').onclick = titleChange;
window.onload = titleChange;




// "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
// "content_security_policy": "script-src 'self' http://xxxx 'unsafe-inline' 'unsafe-eval';",
