# bulker

Query a [live](https://www.w3.org/TR/dom/#concept-collection-live) DOM collection and perform bulk manipulations with its elements.

Bulker queries are live and backed by [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver). This means that on any DOM change underlying collections are changed accordingly (and all [listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) are updated as well).

## Installation
```sh
npm install bulker
```
## Basic Example
Pass a selector to `bulker` as you do with [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).
```javascript
import bulker from 'bulker';

// query <div> elements matching the selector
const divs = bulker('#my .awesome > div');

divs
  // put text in all <div>s
  .set('textContent', 'whoa, I\'m a div!')
  // add click listener to all <div>s
  // (elements matching the selector that are added to the DOM after this
  // will also have the listener on them)
  .call('addEventListener', 'click', event => console.log(event));
  // get elements text in array (if there are multiple elements) or a string (if single)
  .get('textContent');
```

## Advanced Example
```html

<h2>todos</h2>

<ul class="todos">
  <li class="todo">
    <span>buy milk</span>
    <button>done</button>
  </li>
  <li class="todo">
    <span>catch a unicorn</span>
    <button>done</button>
  </li>
</ul>

<form>
  <input type="text" name="title" placeholder="new todo">
  <button type="submit">Submit</button>
</form>

```
```javascript
import bulker from 'bulker';

/**
 * Adds new todo element with provideed title
 * and a done button.
 */
function addTodo(title) {
  const list = document.querySelector('.todos');

  const todoElement = document.createElement('li');
  const titleElement = document.createElement('span');
  const doneButtonElement = document.createElement('button');

  titleElement.textContent = title;
  doneButtonElement.textContent = 'done';
  todoElement.classList.add('todo');

  todoElement.appendChild(titleElement);
  todoElement.appendChild(doneButtonElement);
  list.appendChild(todoElement);
}

/**
 * Removes a todo from DOM.
 */
function removeTodo(todo) {
  todo.parentNode.removeChild(todo);
}

// query todo elements
const todos = bulker('.todo');

// add click listener on all todos (both present and future-added)
todos.call('addEventListener', 'click', event => {
  // if click is on a done button, remove todo
  if (event.target.matches('button')) {
    removeTodo(event.target.parentNode);
  }
});

// query form element
const form = bulker('form');

// submit new todo
form.call('addEventListener', 'submit', event => {
  event.preventDefault();

  const formElement = event.target;

  addTodo(formElement.title.value);

  formElement.reset();
});

```

## Methods
All methods are run on the html sample from [Advanced Example](#advanced-example) section.

#### get
Gets a property of elements in bulk and returns them as an array.
```javascript
bulker('.todo > span').get('textContent');
// returns ['buy milk', 'catch a unicorn']
bulker('h2').get('textContent');
// returns 'todos'
```

#### set
Sets a property for each element in bulk (if such property exists).
```javascript
bulker('.todo > span').set('textContent', 'work hard');
// puts 'work hard' text in all todos titles
```

#### call
Calls a DOM method for each element in bulk (if such method exists).
```javascript
bulker('h2').call('insertAdjacentHTML', 'beforeend', '<div>a todo list</div>');
// puts a <div> in the title
```

## License
MIT
