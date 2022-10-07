const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const searchInput = document.querySelector('#search-input');
const eraseBtn = document.querySelector('#erase-button');
const filterBtn = document.querySelector('#filter-select');

let oldInputValue;

//Functions
const saveTodo = (text) => {
  const todo = document.createElement("div")
  todo.classList.add("todo")

  const todoTitle = document.createElement("h4")
  todoTitle.innerText = text
  todo.appendChild(todoTitle)
  
  const doneBtn = document.createElement("button")
  doneBtn.innerHTML = '<i class="fa-solid fa-check finish-todo"></i>'
  todo.appendChild(doneBtn)

  const editBtn = document.createElement("button")
  editBtn.innerHTML = '<i class="fa-solid fa-pen edit-todo"></i>'
  todo.appendChild(editBtn)

  const deleteBtn = document.createElement("button")
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark remove-todo"></i>'
  todo.appendChild(deleteBtn)
  
  taskList.appendChild(todo)

  taskInput.value = ""
}

const toggleForms = () => {
  editForm.classList.toggle("hide");
  taskForm.classList.toggle("hide");
  taskList.classList.toggle("hide");
}

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h4");

    if(todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
}
//LocalStorage Data

//Events
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = taskInput.value;

  if(inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target
  const parentEl = targetEl.closest("div")
  let todoTitle;

  if(parentEl && parentEl.querySelector("h4")) {
    todoTitle = parentEl.querySelector("h4").innerText;
  }

  if(targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done")
  }

  if(targetEl.classList.contains("edit-todo")) {
    toggleForms()

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
 
  if(targetEl.classList.contains("remove-todo")) {
    parentEl.remove()
  }
});

cancelEditBtn.addEventListener("click" , (e) => {
  e.preventDefault();
  toggleForms();
})

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if(editInputValue){
    updateTodo(editInputValue);
  }

  toggleForms();
})