class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;

    this.html = this.html.bind(this);
    this.empty = this.empty.bind(this);
    this.append = this.append.bind(this);
  }

  html(inner) {
    if (inner === undefined) {
      return this.elements[0].innerHTML;
    } else {
      for(let element of this.elements) {
        element.innerHTML = inner;
      }
    }
  }

  empty() {
    return this.html('');
  }

  append(el) {
    var outer = '';

    if (el instanceof DOMNodeCollection) {
      for (let newEl of el.elements) {
        outer << newEl.outerHTML;
      }
    } else if (el instanceof HTMLElement) {
      outer = el.outerHTML;
    } else {
      outer = el;
    }

    for(let element of this.elements) {
      element.innerHTML = (element.innerHTML + outer);
    }
  }

  attr(name, value) {
    if (value === undefined) {
      return this.elements[0].getAttribute(name);
    } else {
      for(let element of this.elements) {
        element.setAttribute(name, value);
      }
    }
  }

  addClass(classes) {
    for(let element of this.elements) {
        element.classlist.add(classes);
    }
  }

  removeClass(classes) {
    for(let element of this.elements) {
        element.classlist.remove(classes);
    }
  }
}

module.exports = DOMNodeCollection;
