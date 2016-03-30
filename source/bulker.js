class Bulker {
  constructor(entities) {
    this.elements = [];
    this.selectors = [];

    const parse = (entity) => {
      if (entity instanceof HTMLElement && this.elements.indexOf(entity) === -1) {
        this.elements.push(entity);
      } else if (entity instanceof NodeList) {
        for (const element of Array.from(entity)) {
          parse(element);
        }
      } else if (entity instanceof Array) {
        for (const element of entity) {
          parse(element);
        }
      } else if (typeof entity === 'string') {
        if (this.selectors.indexOf(entity) === -1) {
          this.selectors.push(entity);
        }

        for (const element of Array.from(document.querySelectorAll(entity))) {
          parse(element);
        }
      } else if (entity instanceof Bulker) {
        this.elements = this.elements.concat(entity.elements);
      }
    };

    for (const entity of entities) {
      parse(entity);
    }
  }

  /**
   * Gets bulker elements properties.
   *
   * @param  {string} property The existing element property (e.g. 'textContent').
   * @return {*}               The property value (or array of values).
   */
  get(property) {
    const result = [];

    for (const element of this.elements) {
      if (property in element) {
        result.push(element[property]);
      }
    }

    return result.length === 1 ? result[0] : result;
  }

  /**
   * Sets bulker elements properties.
   *
   * @param  {string} property The existing element property (e.g. 'textContent').
   * @return {*}               The property value to be set.
   */
  set(property, value) {
    for (const element of this.elements) {
      if (property in element) {
        element[property] = value;
      }
    }

    return this;
  }

  /**
   * Calls a method on each of bulker elements.
   *
   * @param {string} method The method name to be called.
   * @param {*}      args   Method arguments.
   */
  call(method, ...args) {
    for (const element of this.elements) {
      if (typeof element[method] === 'function') {
        element[method].apply(element, args);
      }
    }

    return this;
  }

}

export default function (...args) {
  return new Bulker(args);
}
