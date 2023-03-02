const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo_input');
const todoList = document.querySelector('.todo_items_list');

let todos = [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo_item');
    todoItem.innerHTML = `
    <div class="check">
        <div class="check_mark">
            <input type="checkbox" style="appearance:none; -webkit-appearance:none; background-color:transparent; border:none; width:16px; height:16px; vertical-align:middle;" id="todo_${index}" ${todo.completed ? 'checked' : ''}>
        </div>
    </div>
    <label class="todo_text" for="todo_${index}">${todo.title}</label>
    
        
    
    <button class="delete_todo" data-index="${index}">&times;</button>

    `;
    todoList.appendChild(todoItem);
  });
}

function addTodo() {
  const todoTitle = todoInput.value.trim();
  if (todoTitle !== '') {
    todos.push({ title: todoTitle, completed: false });
    renderTodos();
    todoInput.value = '';
  }
}

function deleteTodoByIndex(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleTodoCompletedByIndex(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  addTodo();
});

todoList.addEventListener('click', event => {
  const deleteButton = event.target.closest('.delete_todo');
  if (deleteButton) {
    const index = parseInt(deleteButton.getAttribute('data-index'));
    deleteTodoByIndex(index);
  } else {
    const checkbox = event.target.closest('input[type="checkbox"]');
    if (checkbox) {
      const index = parseInt(checkbox.getAttribute('id').split('_')[1]);
      toggleTodoCompletedByIndex(index);
    }
  }
});