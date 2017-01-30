const DOMNodeCollection = require("./DOMNodeCollection.js");

const docReadyCallbacks = [];
let docReady = false;

function $l(selector) {
  if (typeof selector === 'function') {
    documentReady(selector);
  } else {
    const selected = document.querySelector(selector);
    let elements = new Array(selected);
    return new DOMNodeCollection(elements);
  }
};

$l.extend = function(base, ...args) {
  for(let obj of args) {
    for(let key of Object.keys(obj)) {
      base[key] = obj[key];
    }
  }

  return base;
};

$l.ajax = function(options) {
  const xhr = new XMLHttpRequest();
  const defaults = {
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    url: window.location.hostname,
    success: function() {},
    error: function() {},
    data: {}
  };

  options = $l.extend(defaults, options, true);
  if (options.method === "GET"){
    options.url += "?" + $l.toQueryString(options.data);
  }

  xhr.open(options.method, options.url);
  xhr.onload = function(status) {
    if (status === 200) {
      options.success(xhr.response);
    } else {
      options.success(xhr.response);
    }
  };

  xhr.send(JSON.stringify(options.data))
};

$l.documentReady = function(f) {
  if(docReady) {
    f();
  } else {
    docReadyCallbacks.push(f);
  }
};

$l.toQueryString = function(queryObj) {
  let result = '';

  for(let prop in queryObj) {
    if (queryObj[prop] !== undefined) {
      result += prop + '=' + queryObj[prop] + '&'
    }
  }

  return result.substring(0, result.length - 1);
};

document.addEventListener("DOMContentLoaded", function() {
  docReady = true;
  for(let callback of docReadyCallbacks) {
    callback();
  }
});

window.$l = $l;
window.DOMNodeCollection = DOMNodeCollection;
