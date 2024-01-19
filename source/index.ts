import { query } from './utils/communicate';
//@ts-check

function titleChange(event) {
    
    // event.target.innerText = 'ok'
    if (event.target?.style) event.target.style.color = 'black';

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { wanted: "amount" }, function (response) {
            // console.log(response.amount);
            // alert(response.amount)
            // event.target.innerText = response.amount + ' elements...';
            const content = document.querySelector('div.content')
            if (content) {
                content.innerText = response.amount + ' elements';
            }
        });
    });

    query('selectors', (r) => {
        const _jug = document.querySelector('.macro').parentElement
        r.selectors.forEach(w => {
            const line = _jug.appendChild(document.createElement('div')) 
            line.className = 'item';
            line.innerText = w.selector
        })
    })

}

// document.getElementById('header').onclick = titleChange;
window.onload = titleChange;


let input: HTMLInputElement = null;


document.querySelector('details').addEventListener('toggle', (e) => {
    input = e.currentTarget['querySelector']('input');
    input.focus()
})

document.querySelector('button.add').addEventListener('click', (e) => {        
    query({ selector: input?.value, hiden: true}, (r) => {
        alert(r.hiden);
    })
})

// document.querySelector('button.add').addEventListener('click', (e) => {
//     query('location', (r) => {
//         alert(r.location);
//     })
// })


// "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
// "content_security_policy": "script-src 'self' http://xxxx 'unsafe-inline' 'unsafe-eval';",





