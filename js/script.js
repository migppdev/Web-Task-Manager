const tasksContainer = document.querySelector(".current-tasks-container");

tasksContainer.addEventListener("click", (e) => {
  const taskBox = e.target.closest(".task-box");

  if (taskBox) {
    taskBox.classList.toggle("task-box-selected");
  }
});

