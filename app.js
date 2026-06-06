const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll("[data-filter]");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

function addTask() {
  const text = taskInput.value.trim();

  if (!text) return;

  const task = {
    id: Date.now(),
    text,
    done: false
  };

  tasks.push(task);
  save();
  renderTasks();

  taskInput.value = "";
}

function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );

  save();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  renderTasks();
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter(t => !t.done);
  }

  if (currentFilter === "done") {
    return tasks.filter(t => t.done);
  }

  return tasks;
}

function renderTasks() {
  taskList.innerHTML = "";

  const filtered = getFilteredTasks();

  filtered.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.done ? "done" : ""}">
        ${task.text}
      </span>
      <div>
        <button onclick="toggleTask(${task.id})">✓</button>
        <button onclick="deleteTask(${task.id})">✕</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

renderTasks();