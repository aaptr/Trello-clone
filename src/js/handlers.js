import {
  editFormElement,
  deleteModalElement,
  deleteFormElement,
  addUserSelectElement,
  usersList,
  colorFormElement,
  defaultColors,
  currentColors,
} from './declarations.js'

import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
  render,
  setThemeColorsToLocalStorage
} from './helpers.js'

import { Task } from './classes.js'

import { userSelectTemplate } from './templates.js'


// Handlers for adding new tasks
function handleClickAddButtom() {
  addUserSelectElement.innerHTML = userSelectTemplate(usersList)
}

function handleSubmitAddForm({ target }) {
  const taskList = getDataFromLocalStorage()
  const { addTitle: title, addText: description, users: executiveUser } = Object.fromEntries(new FormData(target))

  taskList.push(new Task(title, description, executiveUser))
  setDataToLocalStorage(taskList)
  target.reset()
}

// Handlers for editing tasks
function handleClickEditButton({ target }) {
  if (target.dataset.role === 'edit') {
    const editModal = document.querySelector('#editModal')
    const modalElements = {
      titleInput: editModal.querySelector('#editTitleInput'),
      descriptionTextArea: editModal.querySelector('#editDescriprionTextArea'),
      userSelect: editModal.querySelector('#editUserSelect'),
      statusSelect: editModal.querySelector('#editStatus-select')
    }

    const taskList = getDataFromLocalStorage()
    const targetId = target.closest('.task').dataset.id
    const taskForEdit = taskList.find(item => item.id === targetId)

    editFormElement.dataset.id = targetId
    modalElements.titleInput.value = taskForEdit.title
    modalElements.descriptionTextArea.value = taskForEdit.description
    modalElements.userSelect.innerHTML = userSelectTemplate(usersList, taskForEdit.executiveUser)
    modalElements.statusSelect.value = taskForEdit.status
  }
}

function handleSubmitEditForm({ target }) {
  const formElement = target.closest('form')
  const formData = new FormData(formElement)
  const taskList = getDataFromLocalStorage()
  const inProgressList = taskList.filter(task => task.status === 'in-progress')
  const taskId = editFormElement.dataset.id
  const taskForEdit = taskList.find(item => item.id === taskId)
  const taskStatus = formData.get('status')

  if (inProgressList.length === 6 && taskStatus === 'in-progress') {
    alert('You must first finish the tasks you started!')
  } else {
    Object.assign(taskForEdit, {
      title: formData.get('editTitle'),
      description: formData.get('editText'),
      executiveUser: formData.get('users'),
      status: taskStatus
    })
    setDataToLocalStorage(taskList)
  }
}

// Handlers for change setlects
function handleChangeStatusSelect({ target }) {
  if (target.dataset.role !== 'status-select') return

  const taskList = getDataFromLocalStorage()
  const inProgressList = taskList.filter(task => task.status === 'in-progress')

  if (inProgressList.length === 6 && target.value === 'in-progress') {
    alert('You must first finish the tasks you started!')
    return
  }

  const taskId = target.closest('.task').dataset.id
  const task = taskList.find(task => task.id === taskId)
  task.status = target.value

  setDataToLocalStorage(taskList)
  render(getDataFromLocalStorage())
}

function handleChangeUserSelect({ target }) {
  if (target.dataset.role !== 'user-select') return

  const taskList = getDataFromLocalStorage()
  const taskId = target.closest('.task').dataset.id
  const task = taskList.find(task => task.id === taskId)
  task.executiveUser = target.value

  setDataToLocalStorage(taskList)
  render(getDataFromLocalStorage())
}

// Handlers for deleting tasks
function handleClickRemoveTask({ target }) {
  if (target.dataset.role === 'removeTask') {
    const taskList = getDataFromLocalStorage()
    const taskId = target.closest('.task').dataset.id
    const taskForDelete = taskList.find(item => item.id === taskId)

    const modalTitle = deleteModalElement.querySelector('#deleteModalTitle')
    const modalQuestion = deleteModalElement.querySelector('#deleteQuestion')

    deleteFormElement.dataset.id = taskId
    deleteFormElement.dataset.role = 'del-one'
    modalTitle.textContent = 'Delete task'
    modalQuestion.innerHTML = `<p>Are you sure you want to delete the task with title <span class="fw-semibold">"${taskForDelete.title}"</span>?</p>`
  }
}

function handleClickRemoveAll({ target }) {
  if (target.dataset.role !== 'deleteAllDone') return

  const modalTitle = deleteModalElement.querySelector('#deleteModalTitle')
  const modalQuestion = deleteModalElement.querySelector('#deleteQuestion')

  modalTitle.textContent = 'Delete all done tasks'
  modalQuestion.textContent = 'Are you sure you want to delete all done tasks?'
  deleteFormElement.dataset.role = 'del-all'
}

function handleConfirmDelete() {
  const taskList = getDataFromLocalStorage()
  const { role, taskId } = deleteFormElement.dataset

  if (role === 'del-one') {
    const index = taskList.findIndex(task => task.id === taskId)
    if (index !== -1) {
      taskList.splice(index, 1)
    }
  } else if (role === 'del-all') {
    taskList = taskList.filter(task => task.status !== 'done')
  }

  setDataToLocalStorage(newList)
}

// Handlers for changing user theme colors
function handleClickChooseColorButton({ target }) {
  if (target.dataset.role !== 'colorChoose') return

  const colorChooseModal = document.querySelector('#colorThemeModal')
  const modalDescriptionText = colorChooseModal.querySelector('#colorChooseDescription')
  const modalColorInput = colorChooseModal.querySelector('#myColor')
  const targetColumnName = target.closest('.board__column-header').dataset.column

  colorFormElement.setAttribute('data-column', targetColumnName)
  modalDescriptionText.innerHTML = `<p>Choose background color for column <span class="fw-semibold">"${targetColumnName}"</span>.</p>`
  modalColorInput.value = currentColors.find(item => item.column === targetColumnName).color
}

function handleSubmitColorChooseForm({ target }) {
  const formElement = target.closest('form')
  const columnName = formElement.dataset.column
  const themeToChange = currentColors.find(item => item.column === columnName)
  themeToChange.color = new FormData(formElement).get('myColor')

  setThemeColorsToLocalStorage(currentColors)
}

function handleClickSetDefaultColor() {
  const columnName = colorFormElement.dataset.column
  const inputElement = colorFormElement.querySelector('#myColor')
  inputElement.value = defaultColors.find(item => item.column === columnName).color
}

export {
  handleClickAddButtom,
  handleSubmitAddForm,
  handleClickEditButton,
  handleSubmitEditForm,
  handleChangeStatusSelect,
  handleChangeUserSelect,
  handleClickRemoveTask,
  handleClickRemoveAll,
  handleConfirmDelete,
  handleClickChooseColorButton,
  handleSubmitColorChooseForm,
  handleClickSetDefaultColor
}
