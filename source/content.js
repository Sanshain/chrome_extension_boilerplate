//@ts-check

let selectors = []
const storeName = 'hiden_by_cleaner'

window.addEventListener('load', function () {
    // alert(1)

    let amount = 0;

    let _selectors = localStorage.getItem(storeName);
    if (_selectors) {
        (selectors = _selectors.split(',')).forEach(selector => {
            const elems = document.querySelectorAll(selector)
            if (elems.length) {
                elems.forEach(elem => {
                    elem['style']['display'] = 'none';
                    amount++;
                })
            }
        })
    }

    console.log(`cleaned ${amount} elements of ${selectors?.length || 0} selectors`);
})


chrome.runtime.onMessage.addListener(onMessage);

function onMessage(request, sender, sendResponse) {

    console.log(sender.tab
        ? "from a content script:" + sender.tab.url
        : `from the extension: ${JSON.stringify(request)}`
    );

    let amount = document.querySelectorAll('*').length;

    if (request.wanted === "amount") sendResponse({ amount });
    else if (request.wanted === 'location') {

        sendResponse({
            location: document.location.href,
        })
    }
    else if (request.wanted == 'selectors') {
        console.log(selectors)
        sendResponse({
            selectors: selectors.map(s => ({selector: s, hiden: true})),
        })        
    }
    else if (request.selector) {
        if (request.hiden) {
            
            let container = document.querySelector(request.selector)
            if (container) {      
                container.style.display = 'none'
                selectors.push(request.selector)
                localStorage.setItem(storeName, selectors.join(','))
                return sendResponse({
                    hiden: true
                })                
            }
            else if (~request.selector.indexOf(' ')) {
                
                let selector = request.selector.split(' ').shift()
                
                if (selector = treatSelector(selector)) return;
                else if (!selector.startsWith('.'))
                {
                    selector = treatSelector('.' + selector);
                    if (selector) return
                }
            }
        }
        
        sendResponse({
            hiden: false
        })
    }


    /**
     * @param {string} selector
     */
    function treatSelector(selector) {
        const container = document.querySelector(selector);
        if (container) {
            container['style'].display = 'none'
            selectors.push(selector);
            localStorage.setItem(storeName, selectors.join(','));
            sendResponse({
                selector,
                hiden: true
            });
            return selector;
        }        
        return null
    }
}


// https://developer.chrome.com/docs/extensions/mv3/messaging/