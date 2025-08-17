const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
let date = new Date();

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();
  monthYear.innerText = date.toLocaleString("default", { month: "long" }) + " " + year;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  daysContainer.innerHTML = "";
  for (let i = 0; i < firstDay; i++) {
    daysContainer.innerHTML += "<div></div>";
  }
  for (let i = 1; i <= lastDate; i++) {
    let today = new Date();
    let className = "";
    if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      className = "today";
    }
    daysContainer.innerHTML += `<div class="${className}">${i}</div>`;
  }
}

document.getElementById("prev").onclick = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};
document.getElementById("next").onclick = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

renderCalendar();

// To-Do List with localStorage
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <span class="delete" onclick="deleteTask(${index})">&#10006;</span>`;
    taskList.appendChild(li);
  });
}
function addTaskFunc() {
  const task = taskInput.value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
  }
}
function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

addTask.addEventListener("click", addTaskFunc);
window.onload = loadTasks;
