# bulker

Query a set of HTML elements and perform bulk manipulations with it.

### Installation and Usage
Run
```sh
npm install bulker
```
and then use in code:
```javascript
import bulker from 'bulker';
// bulker() is ready
```

### Example
Pass any number of arguments to `bulker`. Any combination of `NodeList`, `HTMLElement` or a selector string is acceptable (including deeply nested arrays), other entities will be ignored.
```html
<body>

  <section>
    <span>One</span>
    <span>Two</span>
    <span>Three</span>
  </section>

  <div>First chunk</div>
  <div>Second chunk</div>
  <div>Third chunk</div>

  <h1>A header</h1>

  <input>

  <button>Click me</button>

</body>
```
Syntax is `bulker(arguments)`, any number of `string` or `array` arguments is accepted.
```javascript
import bulker from 'bulker';

// specify HTMLElement or/and NodeList
bulker(document.querySelector('body'), document.querySelectorAll('div'), [document.querySelectorAll('span')])
// or provide selector string(s) straight away
bulker('section > span', 'div, h1', ['input', 'button'])
// methods are chainable
bulker('span').set('textContent', 'xyz').get('textContent');
// the sample above sets text of <span>s to 'xyz'and returns ['xyz', 'xyz', 'xyz'] as result
```

### Methods
All methods are run on the html sample from [Example](#example) section.

#### get
Gets any property of elements in bulk and returns them as an array.
```javascript
bulker('div').get('textContent');
// returns ['First chunk', 'Second chunk', 'Third chunk']
bulker('h1').get('textContent');
// returns 'A header'
```

#### set
Sets a property for each element in bulk (if such property exists).
```javascript
bulker('div').set('textContent', 'Chunk');

// puts 'Chunk' text in all <div>s
```

#### call
Calls a DOM method for each element in bulk (if such method exists).
```javascript
bulker('div').call('insertAdjacentHTML', 'beforeend', '<span>I am inserted into each of three divs.</span>');

// puts a <span> in all <div>s
```

#### on
Adds a listener on each element in bulk.
```javascript
bulker('input').on('input', event => bulker('div').set('textContent', event.target.value));

// updates text in <div>s when typing in <input> field
```

#### off
Removes a listener from each element in bulk.
```javascript
bulker('input').off('input', someListenerAddedEarlier);
```
