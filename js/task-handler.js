// --- SELECTORS ---
const createTaskButton = document.querySelector(".new-task-button");
const editTaskButton = document.querySelector(".edit-task-button");
const taskDoneButton = document.querySelector(".task-done-button");
const deleteTaskButton = document.querySelector(".del-task-button");
const tasksContainer = document.querySelector(".current-tasks-container");

const taskModal = document.querySelector("#task-modal");
const closeTaskModal = document.querySelector("#close-task-modal");
const cancelTaskModal = document.querySelector("#cancel-task");
const confirmTaskModal = document.querySelector("#confirm-task");

const taskModalContent = document.querySelector("#task-content");
const taskModalBgColor = document.querySelector("#task-bg-color-picker");
const taskModalFgColor = document.querySelector("#task-fg-color-picker");

// --- STATE VARIABLES & DEFAULT VALUES ---
const defaultTaskBgColor = "#6495ED";
const defaultTaskFgColor = "#FFFFFF";

let selectedTask = null;
let isModalForNewTask = true;

// --- UTILITY FUNCTIONS ---

// Convert RGB to HEX, to use selected task color values
function rgbToHex(rgb) {
  // If it's already hex, return it
  if (rgb.startsWith("#")) return rgb;

  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
  if (!result) return "#000000"; // fallback
  return (
    "#" +
    ("0" + parseInt(result[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(result[2], 10).toString(16)).slice(-2) +
    ("0" + parseInt(result[3], 10).toString(16)).slice(-2)
  );
}

// --- MODAL & TASK ACTIONS ---

function openModal() {
  taskModal.style.display = "block";
}

function closeModal() {
  taskModal.style.display = "none";
  taskModalContent.value = "";
  taskModalBgColor.value = defaultTaskBgColor;
  taskModalFgColor.value = defaultTaskFgColor;
  clearSelection();
}

function saveTask(task) {
  if (task) {
    // Edit task
    task.textContent = taskModalContent.value;
    task.style.backgroundColor = taskModalBgColor.value;
    task.style.color = taskModalFgColor.value;
  } else {
    // Create task
    const newTask = document.createElement("div");
    newTask.classList.add("task-box");
    newTask.textContent = taskModalContent.value;
    newTask.style.backgroundColor = taskModalBgColor.value;
    newTask.style.color = taskModalFgColor.value;
    tasksContainer.appendChild(newTask);
  }
}

function markAsDone(task) {
  if (task) {
    task.classList.toggle("task-done");
  }
}

function clearSelection() {
  const selectedTasks = document.querySelectorAll(".task-box-selected");
  selectedTasks.forEach((task) => {
    task.classList.remove("task-box-selected");
    selectedTask = null;
  });
}

function deleteTask(task) {
  if (task) {
    task.remove();
    saveTasksToLocalStorage();
  }
}

// --- EVENT LISTENERS ---

// Get task clicked
tasksContainer.addEventListener("click", (e) => {
  const taskBox = e.target.closest(".task-box");

  if (taskBox) {
    taskBox.classList.toggle("task-box-selected");
    // update selected task
    selectedTask = document.querySelector(".task-box-selected");
  }
});

// Create task button listener
createTaskButton.addEventListener("click", () => {
  taskModal.style.display = "block"; // Make modal visible
  isModalForNewTask = true;
});

// Edit task button listener
editTaskButton.addEventListener("click", () => {
  // Get all tasks selected
  const selectedTasks = document.querySelectorAll(".task-box-selected");

  // Validate only one task is selected
  if (selectedTasks.length > 1) {
    alert("Multiple tasks are selected");
    return;
  } else if (selectedTasks.length < 1) {
    alert("No tasks selected");
    return;
  }

  isModalForNewTask = false;

  // Copy task content to modal
  taskModalContent.value = selectedTask.textContent;

  const bg = selectedTask.style.backgroundColor;
  const fg = selectedTask.style.color;

  // if a background color is selected, convert it to hex and apply it, otherwise apply default value
  if (bg) {
    taskModalBgColor.value = rgbToHex(bg);
  } else {
    taskModalBgColor.value = taskModalBgColor.defaultValue;
  }

  if (fg) {
    taskModalFgColor.value = rgbToHex(fg);
  } else {
    taskModalFgColor.value = taskModalFgColor.defaultValue;
  }

  openModal();
});

taskDoneButton.addEventListener("click", () => {
  const selectedTasks = document.querySelectorAll(".task-box-selected");
  selectedTasks.forEach((task) => {
    markAsDone(task);
    clearSelection();
  });
  saveTasksToLocalStorage(); // Save to storage
});

deleteTaskButton.addEventListener("click", () => {
  const selectedTasks = document.querySelectorAll(".task-box-selected");

  if (selectedTasks.length < 1) {
    alert("No tasks selected");
    return;
  }

  // Confirmation on delete
  if (selectedTasks.length > 1) {
    confirmMessage =
      "Are you sure you want to delete " + selectedTasks.length + " tasks?";
  } else {
    confirmMessage = "Are you sure you want to delete this task?";
  }

  if (confirm(confirmMessage)) {
    selectedTasks.forEach((task) => {
      deleteTask(task);
    });
    saveTasksToLocalStorage();
  }
});

// Modal control listeners
closeTaskModal.addEventListener("click", () => {
  closeModal();
});

cancelTaskModal.addEventListener("click", () => {
  closeModal();
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
  selectedTask = null; // Clear selection
  saveTasksToLocalStorage(); // Save to storage
});

// --- LOCAL STORAGE ---
function saveTasksToLocalStorage() {
  const tasks = [];
  const taskElements = document.querySelectorAll(".task-box");

  taskElements.forEach((task) => {
    tasks.push({
      content: task.textContent,
      bgColor: task.style.backgroundColor,
      fgColor: task.style.color,
      done: task.classList.contains("task-done"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  // Save tasks to variable
  const storedTasks = localStorage.getItem("tasks");

  // If no tasks, stop execution
  if (!storedTasks) return;

  const tasks = JSON.parse(storedTasks);

  // Iterate over stored tasks and restore each one
  tasks.forEach((taskData) => {
    const newTask = document.createElement("div");
    newTask.classList.add("task-box");
    newTask.textContent = taskData.content;
    newTask.style.backgroundColor = taskData.bgColor;
    newTask.style.color = taskData.fgColor;

    // Check if the task was done
    if (taskData.done) {
      newTask.classList.add("task-done");
    }

    tasksContainer.appendChild(newTask);
  });
}

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
