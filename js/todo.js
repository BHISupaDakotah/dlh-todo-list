/* 
Todo List

Build a todo list with html, css(try scss), and vanilla js (styled nicely, best practices)
- Page Header (ToDO LIst)
- Input (add todos)
- Button (submit todo)
- Render your todos with a title and delete button
- Completed "Todos" section. This should include some conditional rendering (if there are no todos, render a message [ie, "no completed todos"])

- Adding todos -> Delete Todos -> Complete Todos
  - Completing a todo item will remove it from the todo list, but add it to the completed list.
  - Clicking a completed todo should remove it from completed, but add it back to the open todos

**KEEP UX in mind (user experience). IE: submitting a todo item will clear the input.

BONUS: Persist the todo list in the browser (cookies, localstorage, sessionstorage, etc)
*/

const newToDoInput = document.getElementById("new-task");
const addBtn = document.getElementById("add-btn");
const openToDoList = document.getElementById("open-todo-ul");
const completedToDoList = document.getElementById("closed-todo-ul");

const createNewToDoItem = (userInput) => {
  let listItem = document.createElement("li");

  let checkBox = document.createElement("input");

  let label = document.createElement("label");

  let deleteButton = document.createElement("button");

  checkBox.type = "checkBox";

  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = userInput;

  listItem.appendChild(label);

  listItem.appendChild(checkBox);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addToDo = function () {
  if (newToDoInput.value === "") {
    window.alert("input needed");
  } else {
    let listItem = createNewToDoItem(newToDoInput.value);

    openToDoList.appendChild(listItem);
    bindTaskEvents(listItem, completeToDo);
    newToDoInput.value = "";
  }
};

const deleteToDo = function () {
  userAnswer = window.confirm(`are you sure you want to delete?`);
  if (!userAnswer) {
    console.log("didnt delete");
  } else {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;

    ul.removeChild(listItem);
  }
};

const completeToDo = function () {
  let listItem = this.parentNode;
  completedToDoList.appendChild(listItem);

  bindTaskEvents(listItem, openToDo);
};

const openToDo = function () {
  let listItem = this.parentNode;
  openToDoList.appendChild(listItem);

  bindTaskEvents(listItem, completeToDo);
};

addBtn.addEventListener("click", addToDo);

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  let checkBox = taskListItem.querySelector('input[type="checkbox"]');
  let deleteButton = taskListItem.querySelector("button.delete");

  deleteButton.onclick = deleteToDo;

  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < openToDoList.children.length; i++) {
  bindTaskEvents(openToDoList.children[i], completeToDo);
}

for (let i = 0; i < completedToDoList.children.length; i++) {
  bindTaskEvents(completedToDoList.children[i], openToDo);
}
