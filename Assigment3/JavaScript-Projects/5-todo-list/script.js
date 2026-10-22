const form = document.getElementById("todo-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");

function updateCount() {
  const remaining = list.querySelectorAll("li:not(.completed)").length;
  const total = list.querySelectorAll("li").length;
  count.textContent = `${remaining} of ${total} tasks remaining`;
}

function addTask(taskText) {
  const item = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("aria-label", `Mark "${taskText}" as completed`);

  const text = document.createElement("span");
  text.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete "${taskText}"`);

  checkbox.addEventListener("change", () => {
    item.classList.toggle("completed", checkbox.checked);
    updateCount();
  });

  deleteButton.addEventListener("click", () => {
    item.remove();
    updateCount();
  });

  item.append(checkbox, text, deleteButton);
  list.appendChild(item);
  updateCount();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskText = input.value.trim();

  if (!taskText) return;

  addTask(taskText);
  input.value = "";
  input.focus();
});
