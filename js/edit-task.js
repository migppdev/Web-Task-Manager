// Edit task button selector
const editTaskButton = document.querySelector(".edit-task-button");

editTaskButton.addEventListener("click", () => {
  const selectedTasks = document.querySelectorAll(".task-box-selected");
  if (selectedTasks.length !== 1) {
    alert("Mas de una tarea seleccionada");
    return;
  }
});
