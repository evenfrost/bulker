# bulk

Query a set of HTML elements and perform bulk manipulations with it.

### Example
Pass any number of arguments to `bulk`. Any combination of `NodeList`, `HTMLElement` or a selector string is acceptable (including deeply nested arrays), other entities will be ignored.
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
```javascript
import bulk from 'bulk';

// specify HTMLElement or/and NodeList in any combinations
bulk(document.querySelector('body'), document.querySelectorAll('div'), [document.querySelectorAll('span')])
// or provide selector string(s)
bulk('.element', '#another', ['[data-foo="bar"]', 'footer'])
```

### Installation and usage
bulk currently can be installed via [jspm](http://jspm.io/) only.

Run
```sh
jspm install bulk=github:evenfrost/bulk
```
and then use in code:
```javascript
import bulk from 'bulk';
// ready to bulk()
```

### Methods
All methods are run on the html sample from [Example](#example) section.

#### get
Gets any property of elements in bulk and returns them as an array.
```javascript
bulk('div').get('textContent');
// returns ['First chunk', 'Second chunk', 'Third chunk']
bulk('h1').get('textContent');
// returns 'A header'
```

#### set
Sets a property for each element in bulk (if such property exists).
```javascript
bulk('div').set('textContent', 'Chunk');

// puts 'Chunk' text in all <div>s 
```

#### call
Calls a DOM method for each element in bulk (if such method exists).
```javascript
bulk('button').on('click', event => {
  bulk('div').call('insertAdjacentHTML', 'beforeend', '<span>I am inserted into each of three divs.</span>');
});

// puts a <span> in all <div>s 
```

#### on
Adds a listener on each element in bulk. 
```javascript
bulk('input').on('input', event => bulk('div').set('textContent', event.target.value));

// updates text in <div>s when typing in <input> field
```

#### off
Removes a listener from each element in bulk. 
```javascript
bulk('input').off('input', someListenerAddedEarlier);
```

### Psst!
If you want to separate logic from presentation (i.e. not to use a `button` selector for both styling and scripting), you can check [em](https://github.com/evenfrost/em). 
