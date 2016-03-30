class Bulker {
  constructor(entities) {
    let elements = [];

    let parse = (entity) => {
      if (entity instanceof HTMLElement && elements.indexOf(entity) === -1) {
        elements.push(entity);
      } else if (entity instanceof NodeList) {
        for (let element of Array.from(entity)) {
          parse(element);
        }
      } else if (entity instanceof Array) {
        for (let element of entity) {
          parse(element);
        }
      } else if (typeof entity === 'string') {
        for (let element of Array.from(document.querySelectorAll(entity))) {
          parse(element);
        }
      } else if (entity instanceof Bulker) {
        elements = elements.concat(entity.elements);
        entity = null;
      }
    };

    for (let entity of entities) {
      parse(entity);
    }

    this.elements = elements;
  }

  /**
   * Gets bulker elements properties.
   *
   * @param  {string} property The existing element property (e.g. 'textContent').
   * @return {*}               The property value (or array of values).
   */
  get(property) {
    let result = [];

    for (let element of this.elements) {
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

    for (let element of this.elements) {
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

    for (let element of this.elements) {
      if (typeof element[method] === 'function') {
        element[method].apply(element, args);
      }
    }

    return this;
  }

  /**
   * Adds listener to bulker elements.
   *
   * @param {string}   event    The event name.
   * @param {function} listener The listener function.
   */
  on(event, listener) {

    for (let element of this.elements) {
      if ('on' + event in element) {
        element.addEventListener(event, listener);
      }
    }

    return this;
  }

  /**
   * Removes a previously added listener from bulker elements.
   *
   * @param {string}   event    The event name.
   * @param {function} listener The listener function.
   */
  off(event, listener) {

    for (let element of this.elements) {
      if ('on' + event in element) {
        element.removeEventListener(event, listener);
      }
    }

    return this;
  }

}

export default function () {
  return new Bulker(Array.from(arguments));
}