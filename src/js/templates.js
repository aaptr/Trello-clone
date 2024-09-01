import { usersList } from './declarations.js'

const buildTaskTemplate = ({ id, title, createdAt, description, executiveUser, status }) => {
  const statusTodo = (status === 'todo') ? 'selected' : ''
  const statusInProgress = (status === 'in-progress') ? 'selected' : ''
  const statusDone = (status === 'done') ? 'selected' : ''
  const selectDisabler = (status === 'done') ? 'disabled' : ''

  return `
    <div class="task my-2 border border-secondary rounded-3" data-id="${id}">
      <div class="px-2 my-2 border-bottom border-secondary-subtle"">
        <div class="task__header d-flex justify-content-between align-items-center ">
          <h4><span class="text-decoration-underline">Title:</span> ${title}</h4>
          <h6>${createdAt}</h6>
        </div>
      </div>
      <div class="px-2 pb-2 my-2 border-bottom border-secondary-subtle"">
        <p class="task__description px-1 bg-white opacity-75 rounded-3">${description}</p>
        <div class="d-flex flex-column gap-1">
          <div>
            <label for="user-select" class="fs-6 fw-medium text-decoration-underline">Executive user</label>
            <select class="form-select form-select-sm user__select w-100 rounded-3 border-secondary" name="users"
              id="user-select" data-role="user-select" required>
              ${userSelectTemplate(usersList, executiveUser)}
            </select>
          </div>
          <div>
            <label for="status-select" class="fs-6 fw-medium text-decoration-underline">Task status</label>
            <select class="form-select form-select-sm task__select w-100 rounded-3 border-secondary" name="status"
              id="status-select" data-role="status-select" ${selectDisabler}>
              <option value="todo" ${statusTodo}>ToDo</option>
              <option value="in-progress" ${statusInProgress}>In Progress</option>
              <option value="done" ${statusDone}>Done</option>
            </select>
          </div>
        </div>
      </div>
        <div class="task__buttons m-2 d-flex gap-3 justify-content-end">
          <button type="button" id="editButton"
            class="btn btn-sm d-flex justify-content-center align-items-center gap-2 border-secondary rounded-3 regular-btn"
            data-bs-toggle="modal" data-bs-target="#editModal" data-role="edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square pe-none" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg>
            <h6 class="m-auto pe-none">Edit</h6>
          </button>
          <button type="button" id="deleteTaskButton"
            class="btn btn-sm d-flex justify-content-center align-items-center gap-2 border-dark-subtle rounded-3 delete-btn"
            data-bs-toggle="modal" data-bs-target="#deleteModal" data-role="removeTask">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3 pe-none" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
            <h6 class="m-auto pe-none">Delete</h6>
          </button>
        </div>
    </div>
  `
}

const userSelectTemplate = ((usersList, executiveUser = '') => {
  let content = (executiveUser === '')
    ? '<option value="" selected>--Please select user--</option>\n'
    : '<option value="">--Please select user--</option>\n'

  usersList.forEach(user => {
    content += `<option value="${user}" ${(executiveUser === user) ? 'selected' : ''}>${user}</option>\n`
  });

  return content
})


export {
  buildTaskTemplate,
  userSelectTemplate
}