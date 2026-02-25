// Create task button selectors
const createTaskButton = document.querySelector(".new-task-button");
const createTaskModal = document.querySelector("#new-task-modal");
const closeTaskModal = document.querySelector("#close-task-modal");

// Modal selectors
const newTaskContent = document.querySelector("#new-task-content");
const newTaskColor = document.querySelector("#task-color-picker");
const cancelTaskModal = document.querySelector("#cancel-task");
const confirmTaskModal = document.querySelector("#confirm-task");

// Button & Modal listeners
createTaskButton.addEventListener("click", () => {
  createTaskModal.style.display = "block"; // Make modal visible
});

closeTaskModal.addEventListener("click", () => {
  createTaskModal.style.display = "none"; // Make modal not visible
});

cancelTaskModal.addEventListener("click", () => {
  // Clear fields and make modal not visible
  newTaskContent.value = "";
  createTaskModal.style.display = "none";
});

confirmTaskModal.addEventListener("click", () => {
  const newTask = document.createElement("div");
  newTask.classList.add("task-box");
  newTask.textContent = newTaskContent.value;
  newTask.style.backgroundColor = newTaskColor.value;

  document.querySelector(".current-tasks-container").appendChild(newTask);
});
