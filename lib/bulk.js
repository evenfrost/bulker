'use strict';

class Bulk {
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
      }
    };

    for (let entity of entities) {
      parse(entity);
    }

    this.elements = elements;
  }

  /**
   * Gets bulk elements properties.
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
   * Sets bulk elements properties.
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

  }

  /**
   * Calls a method on each of bulk elements.
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

  }

  /**
   * Adds listener to bulk elements.
   *
   * @param {string}   event    The event name.
   * @param {Function} listener The listener function.
   */
  on(event, listener) {

    for (let element of this.elements) {
      if ('on' + event in element) {
        element.addEventListener(event, listener);
      }
    }

  }

  /**
   * Removes a previously added listener from bulk elements.
   *
   * @param {string}   event    The event name.
   * @param {Function} listener The listener function.
   */
  off(event, listener) {

    for (let element of this.elements) {
      if ('on' + event in element) {
        element.removeEventListener(event, listener);
      }
    }

  }

}

export default function () {
  return new Bulk(Array.from(arguments));
}
