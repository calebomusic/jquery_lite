const DOMNodeCollection = require("./DOMNodeCollection.js");

function $l(selector) {
  const selected = document.querySelector(selector);

  if (selected instanceof HTMLElement) {
    let elements = new Array(selected);
    return new DOMNodeCollection(elements);
  }
}

window.$l = $l;
window.DOMNodeCollection = DOMNodeCollection;
