class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;

    // this.html = this.html.bind(this);
    // this.empty = this.empty.bind(this);
    // this.append = this.append.bind(this);
  }

  html(inner) {
    if (inner === undefined) {
      return this.elements[0].innerHTML;
    } else {
      for(let el of this.elements) {
        el.innerHTML = inner;
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

    for(let el of this.elements) {
      el.innerHTML = (el.innerHTML + outer);
    }
  }

  attr(name, value) {
    if (value === undefined) {
      return this.elements[0].getAttribute(name);
    } else {
      for(let el of this.elements) {
        el.setAttribute(name, value);
      }
    }
  }

  addClass(classes) {
    for(let el of this.elements) {
        el.classlist.add(classes);
    }
  }

  removeClass(classes) {
    for(let el of this.elements) {
        el.classlist.remove(classes);
    }
  }

  children() {
    let children = [];

    for(let el of this.elements) {
      for (let child of el.children) {
        children.push(child);
      }
    }

    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];

    for (let el of this.elements) {
      if (el.parentElement) {
        parents.push(el.parentElement)
      }
    }

    return parents;
  }

  find(query) {
    let found = [];

    for(let el of this.elements) {
      let foundChildren = el.querySelectorAll(query);

      for(let foundChild of foundChildren) {
        found.push(foundChild);
      }
    }

    return found;
  }

  remove() {
    for(let el of this.elements) {
      el.remove();
    }
    
    this.elements = [];
  }
}

module.exports = DOMNodeCollection;
