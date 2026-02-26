// Create task button selectors
const createTaskButton = document.querySelector(".new-task-button");
const editTaskButton = document.querySelector(".edit-task-button");

const taskModal = document.querySelector("#task-modal");
const closeTaskModal = document.querySelector("#close-task-modal");

// Modal selectors
const taskModalContent = document.querySelector("#task-content");
const taskModalBgColor = document.querySelector("#task-bg-color-picker"); // Background color
const taskModalTextColor = document.querySelector("#task-fg-color-picker"); // Text color
const cancelTaskModal = document.querySelector("#cancel-task");
const confirmTaskModal = document.querySelector("#confirm-task");

// Get tasks already created
const tasksContainer = document.querySelector(".current-tasks-container");

// Selected task
let selectedTask = null;

// Get task clicked
tasksContainer.addEventListener("click", (e) => {
  const taskBox = e.target.closest(".task-box");

  if (taskBox) {
    taskBox.classList.toggle("task-box-selected");
    selectedTask = taskBox;
  }
});

// Variable to check if modal is for a new task or to edit
let isModalForNewTask = true;

// Button & Modal listeners
createTaskButton.addEventListener("click", () => {
  taskModal.style.display = "block"; // Make modal visible
  isModalForNewTask = true;
});

editTaskButton.addEventListener("click", () => {
  const selectedTasks = document.querySelectorAll(".task-box-selected");

  if (selectedTasks.length > 1) {
    alert("Multiple tasks are selected");
    return;
  } else if (selectedTasks.length < 1) {
    alert("No tasks selected");
    return;
  }

  selectedTask = selectedTasks[0];
  isModalForNewTask = false;

  taskModalContent.value = selectedTask.textContent;

  const bg = selectedTask.style.backgroundColor;
  const fg = selectedTask.style.color;

  // Si no hay style inline, usar el valor por defecto del input (ya en hex)
  if (bg) {
    taskModalBgColor.value = rgbToHex(bg);
  } else {
    taskModalBgColor.value = taskModalBgColor.defaultValue;
  }

  if (fg) {
    taskModalTextColor.value = rgbToHex(fg);
  } else {
    taskModalTextColor.value = taskModalTextColor.defaultValue;
  }

  openModal();
});

closeTaskModal.addEventListener("click", () => {
  taskModal.style.display = "none"; // Make modal not visible
});

cancelTaskModal.addEventListener("click", () => {
  // Clear fields and make modal not visible
  taskModalContent.value = "";
  taskModal.style.display = "none";
});

confirmTaskModal.addEventListener("click", () => {
  if (!isModalForNewTask) {
    // Edit current task
    saveTask(selectedTask);
  } else {
    // Create new task
    saveTask(null);
  }

  closeModal();
  selectedTask = null;
});

function saveTask(task) {
  if (task) {
    // Edit task
    task.textContent = taskModalContent.value;
    task.style.backgroundColor = taskModalBgColor.value;
    task.style.color = taskModalTextColor.value;
  } else {
    // Create task
    const newTask = document.createElement("div");
    newTask.classList.add("task-box");
    newTask.textContent = taskModalContent.value;
    newTask.style.backgroundColor = taskModalBgColor.value;
    newTask.style.color = taskModalTextColor.value;
    tasksContainer.appendChild(newTask);
  }
}

function openModal() {
  taskModal.style.display = "block";
}

function closeModal() {
  taskModal.style.display = "none";
  taskModalContent.value = "";
}

// Convert RGB to HEX, to use selected task color values
function rgbToHex(rgb) {
  // If it's already rgb, return it
  if (rgb.startsWith("#")) return rgb;

  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
  if (!result) return "#000000"; // fallback negro
  return (
    "#" +
    ("0" + parseInt(result[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(result[2], 10).toString(16)).slice(-2) +
    ("0" + parseInt(result[3], 10).toString(16)).slice(-2)
  );
}
