import {
  addFormElement,
  editFormElement,
  deleteModalElement,
  deleteFormElement,
  addUserSelectElement,
  usersList,
  colorFormElement,
  defaultColors,
  currentColors
} from './declarations.js'

import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
  render,
  getThemeColorsFromLocalStorage,
  setThemeColorsToLocalStorage
} from './helpers.js'

import { Task } from './models.js'

import { userSelectTemplate } from './templates.js'

function handleClickAddButtom() {
  addUserSelectElement.innerHTML = userSelectTemplate(usersList)
  addFormElement.addEventListener('submit', handleSubmitAddForm)
}

function handleSubmitAddForm({ target }) {
  let taskList = getDataFromLocalStorage()
  const formData = new FormData(target)
  const title = formData.get('addTitle')
  const description = formData.get('addText')
  const executiveUser = formData.get('users')
  const newTask = new Task(title, description, executiveUser)

  taskList.push(newTask)
  setDataToLocalStorage(taskList)
  addFormElement.reset()

  addFormElement.removeEventListener('submit', handleSubmitAddForm)
}

function handleClickEditButton({ target }) {
  if (target.dataset.role === 'edit') {
    const editModal = document.querySelector('#editModal')
    const modalTitleInput = editModal.querySelector('#formTitleInput')
    const modalDescriptionTextArea = editModal.querySelector('#formDescriprionTextArea')
    const modalUserSelect = editModal.querySelector('#editUserSelect')
    const modalStatusSelect = editModal.querySelector('#status-select')

    let taskList = getDataFromLocalStorage()

    let targetId = target.closest('.task').dataset.id
    let taskForEdit = taskList.find(item => item.id === targetId)

    editFormElement.setAttribute('data-id', targetId)
    modalTitleInput.value = taskForEdit.title
    modalDescriptionTextArea.value = taskForEdit.description
    modalUserSelect.innerHTML = userSelectTemplate(usersList, taskForEdit.executiveUser)
    modalStatusSelect.value = taskForEdit.status
  }
}

function handleSubmitEditForm({ target }) {
  const formElement = target.closest('form')
  let taskList = getDataFromLocalStorage()
  let inProgressList = taskList.filter(function (task) {
    return task.status === 'in-progress'
  })

  const id = editFormElement.dataset.id
  const taskForEdit = taskList.find(item => item.id === id)
  const formData = new FormData(formElement)
  let taskStatus = formData.get('status')

  if (inProgressList.length === 6 & taskStatus === 'in-progress') {
    alert('You must first finish the tasks you started!')
  } else {
    taskForEdit.title = formData.get('editTitle')
    taskForEdit.description = formData.get('editText')
    taskForEdit.executiveUser = formData.get('users')
    taskForEdit.status = taskStatus
    setDataToLocalStorage(taskList)
  }
}

function handleChangeStatusSelect({ target }) {
  if (target.dataset.role === 'status-select') {
    let taskList = getDataFromLocalStorage()
    let inProgressList = taskList.filter(function (task) {
      return task.status === 'in-progress'
    })

    if (inProgressList.length === 6 & target.value === 'in-progress') {
      alert('You must first finish the tasks you started!')
    } else {
      const taskElement = target.closest('.task')
      const id = taskElement.dataset.id

      const task = taskList.find((task) => task.id === id)
      task.status = target.value

      setDataToLocalStorage(taskList)
      render(getDataFromLocalStorage())
    }
  }
}

function handleClickRemoveTask({ target }) {
  if (target.dataset.role === 'removeTask') {
    let taskList = getDataFromLocalStorage()
    const taskElement = target.closest('.task')
    const { id } = taskElement.dataset
    let taskForDelete = taskList.find(item => item.id === id)

    modalTitle = deleteModalElement.querySelector('#deleteModalTitle')
    modalQuestion = deleteModalElement.querySelector('#deleteQuestion')

    deleteFormElement.setAttribute('data-id', id)
    deleteFormElement.setAttribute('data-role', 'del-one')
    modalTitle.textContent = 'Delete task'
    modalQuestion.textContent = `Are you sure you want to delete the task with title "${taskForDelete.title}"?`

    deleteFormElement.addEventListener('submit', handleConfirmDelete)
  }
}

function handleClickRemoveAll({ target }) {
  if (target.dataset.role === 'deleteAllDone') {
    modalTitle = deleteModalElement.querySelector('#deleteModalTitle')
    modalQuestion = deleteModalElement.querySelector('#deleteQuestion')

    modalTitle.textContent = 'Delete all done tasks'
    modalQuestion.textContent = 'Are you sure you want to delete all done tasks?'
    deleteFormElement.setAttribute('data-role', 'del-all')

    deleteFormElement.addEventListener('submit', handleConfirmDelete)
  }
}

function handleConfirmDelete() {
  let taskList = getDataFromLocalStorage()
  if (deleteFormElement.dataset.role === 'del-one') {
    taskList.splice(taskList.findIndex((task) => task.id === deleteFormElement.dataset.id), 1)
    setDataToLocalStorage(taskList)
  } else if (deleteFormElement.dataset.role === 'del-all') {
    const newList = taskList.filter(task => task.status !== 'done')
    setDataToLocalStorage(newList)
  }
  deleteFormElement.removeEventListener('submit', handleConfirmDelete)
}

function handleClickChooseColorButton({ target }) {
  if (target.dataset.role === 'colorChoose') {
    const colorChooseModal = document.querySelector('#colorThemeModal')
    const modalDescriptionText = colorChooseModal.querySelector('#colorChooseDescription')
    const modalColorInput = colorChooseModal.querySelector('#myColor')
    let targetColumnName = target.closest('.board__column-header').dataset.column
    colorFormElement.setAttribute('data-column', targetColumnName)
    modalDescriptionText.textContent = `Choose background color for column "${targetColumnName}"`
    modalColorInput.value = currentColors.find(item => item.column === targetColumnName).color

    colorFormElement.addEventListener('submit', handleSubmitColorChooseForm)
  }
}

function handleSubmitColorChooseForm({ target }) {
  const formElement = target.closest('form')
  const columnName = formElement.dataset.column
  const themeToChange = currentColors.find(item => item.column === columnName)
  const formData = new FormData(formElement)
  themeToChange.color = formData.get('myColor')

  setThemeColorsToLocalStorage(currentColors)
  colorFormElement.removeEventListener('submit', handleSubmitColorChooseForm)
}

export {
  handleSubmitAddForm,
  handleClickEditButton,
  handleSubmitEditForm,
  handleChangeStatusSelect,
  handleClickRemoveTask,
  handleConfirmDelete,
  handleClickRemoveAll,
  handleClickAddButtom,
  handleClickChooseColorButton,
  handleSubmitColorChooseForm
}
