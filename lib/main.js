const DOMNodeCollection = require("./DOMNodeCollection.js");

function $l(selector) {
  if (typeof selector === 'function') {
    documentReady(selector);
  } else {
    const selected = document.querySelector(selector);
    let elements = new Array(selected);
    return new DOMNodeCollection(elements);
  }
}

function documentReady(callback) {
  document.addEventListener("DOMContentLoaded", callback);
}

window.$l = $l;
window.DOMNodeCollection = DOMNodeCollection;
