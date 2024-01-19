(() => {
  // source/utils/communicate.ts
  function query(key, clb) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (typeof key == "string") {
        chrome.tabs.sendMessage(tabs[0].id, { wanted: key }, clb);
      } else {
        chrome.tabs.sendMessage(tabs[0].id, key, clb);
      }
    });
  }

  // source/index.ts
  function titleChange(event) {
    if (event.target?.style)
      event.target.style.color = "black";
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { wanted: "amount" }, function(response) {
        const content = document.querySelector("div.content");
        if (content) {
          content.innerText = response.amount + " elements";
        }
      });
    });
    query("selectors", (r) => {
      const _jug = document.querySelector(".macro").parentElement;
      r.selectors.forEach((w) => {
        const line = _jug.appendChild(document.createElement("div"));
        line.className = "item";
        line.innerText = w.selector;
      });
    });
  }
  window.onload = titleChange;
  var input = null;
  document.querySelector("details").addEventListener("toggle", (e) => {
    input = e.currentTarget["querySelector"]("input");
    input.focus();
  });
  document.querySelector("button.add").addEventListener("click", (e) => {
    query({ selector: input?.value, hiden: true }, (r) => {
      alert(r.hiden);
    });
  });
})();
