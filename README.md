# bulk

Query a set of HTML elements and perform bulk manipulations with it.

## Example
```javascript
// select elements with 'foo' and 'bar' classes and 'baz' id 
bulk('.foo', document.querySelectorAll('.bar'), document.getElementById('baz'))
  // set bulk elements text content to 'bulked!'
  .set('textContent', 'bulked!')
  // add click listener to each of bulk elements
  .call('addEventListener', 'click', event => console.log(event.currentTarget))
  // insert new div element in each of bulk elements
  .call('insertAdjacentHTML', 'afterbegin', '<div></div>')
  // return first childs of bulk elements as an array
  .get('firstElementChild');
```

### Installation and Usage
Install with jspm:
```sh
jspm install bulk=github:evenfrost/bulk
```
Or with npm:
```sh
npm install https://github.com/evenfrost/bulk
```
If using with browserify, you will need some sort of [transformer](https://github.com/babel/babelify) as the package is written in ES6. Or just use [jspm](https://github.com/jspm/jspm-cli) instead.

And then use in code:
```javascript
import bulk from 'bulk';
// ready to bulk()
```

Pass arguments to `bulk`. Any combination of simple selector string, `NodeList`, `HTMLElement` or `bulk` instance itself is acceptable (including deeply nested arrays), other entities will be ignored.

### Methods
```html
<!-- test dummy -->
<body>

  <h1>A header</h1>

  <section>
    <span>One</span>
    <span>Two</span>
    <span>Three</span>
  </section>

  <div class="chunk">First chunk</div>
  <div class="chunk">Second chunk</div>
  <div class="chunk">Third chunk</div>

  <input>

  <button>Click me</button>

</body>
```

#### get(*property*)
Gets any property of elements in bulk and returns them as an array.
```javascript
bulk('.chunk').get('textContent');
// returns ['First chunk', 'Second chunk', 'Third chunk']
bulk('h1').get('textContent');
// returns 'A header'
```

#### set(*property*, *)
Sets a property for each element in bulk (if such property exists).
```javascript
bulk('.chunk').set('textContent', 'Chunk');
// puts 'Chunk' text in all <div class="chunk"></div> 
```

#### call(*method*, *...arguments*)
Calls a DOM method for each element in bulk (if such method exists).
```javascript
bulk('.chunk').call('insertAdjacentHTML', 'beforeend', '<span>I am inserted into each of three divs.</span>');
// puts a <span> in all <div>s 
```

#### on(*event*, *listener*)
Adds a listener on each element in bulk. 
```javascript
bulk('input').on('input', event => bulk('.chunk').set('textContent', event.target.value));

// updates text in <div>s when typing in <input> field
```

#### off(*event*, *listener*)
Removes a listener from each element in bulk. 
```javascript
bulk('input').off('input', someListenerAddedEarlier);
```

### Psst!
If you want to separate logic from presentation (i.e. not to use a `button` selector for both styling and scripting), you can check [em](https://github.com/evenfrost/em). 
