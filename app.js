// defining the UI variable
const form = document.querySelector('.form-group');
const todoList = document.querySelector('.tasks-list');
const clearBtn = document.querySelector('.clear-all');
const todoInput = document.querySelector('#create-todos');
const search = document.querySelector('.search');

// calling event listener loader
loadEventListeners();

// Loading the event listeners
function loadEventListeners() {
  // Dsable add on enter
  document.addEventListener('keypress', disableEnterKey);
  // load DOM event
  document.addEventListener('DOMContentLoaded', getTodos);
  // Add task event listener
  form.addEventListener('submit', addTodo);
  // Remove todo
  todoList.addEventListener('click', removeTodo);
  // Clear task
  clearBtn.addEventListener('click', clearTodo);
  // Search todo  // keyup
  search.addEventListener('keyup', searchTodo);
}

// Disable enter key function
function disableEnterKey(e) {
  if(e.keyCode === 13 || e.which === 13) {
    e.preventDefault();
    return false;
  }
}

// get todos from  local storage
function getTodos() {
  // Declaring todo varible
  let todos;
  let lsItem = localStorage.getItem('todos');
  // Condition for local storage
  if(lsItem === null) {
    // Set local storage to empty
    todos = [];
  } else {
    // Set local storage to input
    todos = JSON.parse(lsItem);
  }

  todos.forEach(todo => {
    // Create li element
    const li = document.createElement('li');

    // Add class name to li
    li.className = 'task-lists';

    // Create li text node and append
    li.appendChild(document.createTextNode(todo));

    // Style li to remove the list style
    li.style.listStyle = 'none';

    // Create link
    const del = document.createElement('span');
  
    // Add class to delete(del)
    del.className = 'delete-todo';

    // Add icon
    del.innerText = 'X';

    // Style the delete text
    del.style.cursor = 'pointer';
    del.style.display = 'flex';
    del.style.justifyContent = 'flex-end';
    del.style.color = 'red';
    del.style.alignItems = 'center'

    // Append link to li
    li.appendChild(del);

    // Append li to ul
    todoList.appendChild(li)
  })
}

// Add todo function
function addTodo(e) {
  if(todoInput.value !== '') {

  // Create li element
  const li = document.createElement('li');

  // Add class name to li
  li.className = 'task-lists';

  // Create li text node and append
  li.appendChild(document.createTextNode(todoInput.value));

  // Style li to remove the list style
  li.style.listStyle = 'none';

  // Create link
  const del = document.createElement('span');

  // Add class to delete(del)
  del.className = 'delete-todo';

  // Add icon text
  del.innerText = 'X';

  // Style the delete text
  del.style.cursor = 'pointer';
  del.style.display = 'flex';
  del.style.justifyContent = 'flex-end';
  del.style.color = 'red';
  del.style.alignItems = 'center'

  // Append link to li
  li.appendChild(del);

  // Append li to ul
  todoList.appendChild(li)

  // Locasl Storage
  storeTodoInLocalStorage(todoInput.value);

  // Clear input after add
  todoInput.value = ''; 
  
  e.preventDefault();
  }
}

// Local Storage function
function storeTodoInLocalStorage(todo) {
  let todos;
  let lsItem = localStorage.getItem('todos');
  if(lsItem === null) {
    todos = [];
  } else {
    todos = JSON.parse(lsItem);
  }

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove task function
function removeTodo(e) {
  // console.log('Deleted...')
  // console.log(e.target.classList)
  if(e.target.classList.contains('delete-todo')) {
    // console.log('Deleted...')
    if(confirm('Are you sure, you want to delete this task?')) {
      // console.log(e.target.parentElement);
      e.target.parentElement.remove();

      // Remove todo fron local storage
      removeTodoFromLocalStorage(e.target.parentElement);
    }
  }
  e.preventDefault()
}

// Remove from local storage function
function removeTodoFromLocalStorage(todoItem) {
  // console.log(todoItem)
  let todos;
  let lsItem = localStorage.getItem('todos');
  if(lsItem === null) {
    todos = [];
  } else {
    todos = JSON.parse(lsItem);
  }

  todos.forEach((todo, index) => {
    // console.log(`${index} ${todo}`)
    if(todoItem.textContent === todo) {
      console.log(todoItem.textContent)
      todos.splice(index, 1);
    }
  });

  localStorage.setItem('todos', JSON.stringify(todos))
}

// Clear todo function
function clearTodo() {
  // taskList.innerHTML = '';

  // While loop
  while(todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // Clear todo from local storage
  clearTodoFromLocalStorage();
}

// clear todo function
function clearTodoFromLocalStorage() {
  localStorage.clear();
}

// Search todo function
function searchTodo(e) {
  // Set the input to lower letters
  const text = e.target.value.toLowerCase();
  console.log(text)
  
  // UI variable for task search
  let searcher = Document.getElementByClassName('task-lists');
  // console.log(searcher)
  
    searcher.forEach(todo => {
    const item = todo.firstChild.textContent;
    // console.log(item)
    if(item.toLowerCase().indexOf(text) !== -1) {
      todo.style.display = 'block';
    } else {
      todo.style.display = 'none';
    }
  });

  e.preventDefault();
}
