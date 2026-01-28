// ========= CREATE TASK =========

// Create task button selectors
const createTaskButton = document.querySelector(".new-task-button");
const createTaskModal = document.querySelector("#new-task-modal");
const closeTaskModal = document.querySelector("#close-task-modal");

// Button & Modal listeners
createTaskButton.addEventListener("click", () => {
  createTaskModal.style.display = "block";
});

closeTaskModal.addEventListener("click", () => {
  createTaskModal.style.display = "none";
});

// Edit task button selector
const editTaskButton = document.querySelector(".edit-task-button");

// Mark task as done button selector
const taskDoneButton = document.querySelector(".task-done-button");
