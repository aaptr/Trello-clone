const buildTaskTemplate = ({ id, title, createdAt, description, executiveUser, status }) => {
  const statusTodo = (status == 'todo') ? 'selected' : ''
  const statusInProgress = (status == 'in-progres') ? 'selected' : ''
  const statusDone = (status == 'done') ? 'selected' : ''

  return `
    <div class="task p-3" data-id="${id}">
            <div class="task__header">
              <h3>${title}</h3>
              <h3>${createdAt}</h3>
            </div>
            <p class="task__description">${description}</p>
            <h4>${executiveUser}</h4>
            <div class="task__footer">
              <select class="task__select" name="status" id="status-select">
                <option value="todo" ${statusTodo}>ToDo</option>
                <option value="in-progres" ${statusInProgress}>In Progress</option>
                <option value="done" ${statusDone}>Done</option>
              </select>
              <div class="task__buttons">
                <button type="button" class="task__button task__button_edit" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Edit">
                  <img src="./images/edit_task_icon.svg" alt="">
                </button>
                <button type="button" class="task__button task__button_remove" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Remove">
                  <img src="./images/delete_icon.svg" alt="">
                </button>
              </div>
            </div>
          </div>
  `
}