class Bulker {
  /**
   * @type {Array} Stores all methods that need
   *               to be called on new bulker elements
   *               in the form of { name: 'method', args: [arguments]}.
   */
  shareableMethods = [];

  /**
   * Observes DOM changes and updates bulker instances accordingly.
   */
  static observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      Array.from(mutation.addedNodes)
        .forEach(node => {
          const bulker = node.matches &&
            Bulker.instances.find(instance => node.matches(instance.selector));

          if (bulker) {
            bulker.elements.push(node);
            for (const shareableMethod of bulker.shareableMethods) {
              if (node[shareableMethod.name]) {
                node[shareableMethod.name](...shareableMethod.args);
              }
            }
          }
        });

      Array.from(mutation.removedNodes)
        .forEach(node => {
          const bulker = node.matches &&
            Bulker.instances.find(instance => node.matches(instance.selector));


          if (bulker) {
            bulker.elements.splice(bulker.elements.indexOf(node), 1);
          }
        });
    });
  });

  // instances store
  static instances = [];
  // list of shareable methods by name
  static shareableMethods = ['addEventListener'];

  constructor(selector) {
    if (typeof selector !== 'string') {
      throw new TypeError('First argument must be a string containing one or more CSS selectors separated by commas.');
    }

    this.selector = selector;
    this.elements = Array.from(document.querySelectorAll(this.selector));
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

    if (Bulker.shareableMethods.indexOf(method) > -1) {
      this.shareableMethods.push({
        name: method,
        args,
      });
    }

    return this;
  }

}

Bulker.observer.observe(document.body, {
  childList: true,
  subtree: true,
});

export default function (selector) {
  const bulker = new Bulker(selector);

  Bulker.instances.push(bulker);

  return bulker;
}
