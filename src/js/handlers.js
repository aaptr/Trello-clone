import {
  addFormElement,
  editFormElement,
  deleteModalElement,
  deleteFormElement,
  addUserSelectElement,
  usersList,
  colorFormElement,
  defaultColors,
  currentColors,
  setDefaultColorButtonElement
} from './declarations.js'

import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
  render,
  setThemeColorsToLocalStorage
} from './helpers.js'

import { Task } from './classes.js'

import { userSelectTemplate } from './templates.js'


function handleClickAddButtom() {
  addUserSelectElement.innerHTML = userSelectTemplate(usersList)
  addFormElement.addEventListener('submit', handleSubmitAddForm)
}

function handleSubmitAddForm({ target }) {
  const taskList = getDataFromLocalStorage()
  const { addTitle: title, addText: description, users: executiveUser } = Object.fromEntries(new FormData(target))

  taskList.push(new Task(title, description, executiveUser))
  setDataToLocalStorage(taskList)
  target.reset()

  target.removeEventListener('submit', handleSubmitAddForm)
}

function handleClickEditButton({ target }) {
  if (target.dataset.role === 'edit') {
    const editModal = document.querySelector('#editModal')
    const modalElements = {
      titleInput: editModal.querySelector('#formTitleInput'),
      descriptionTextArea: editModal.querySelector('#formDescriprionTextArea'),
      userSelect: editModal.querySelector('#editUserSelect'),
      statusSelect: editModal.querySelector('#status-select')
    }

    const taskList = getDataFromLocalStorage()
    let targetId = target.closest('.task').dataset.id
    let taskForEdit = taskList.find(item => item.id === targetId)

    editFormElement.dataset.id = targetId
    modalElements.titleInput.value = taskForEdit.title
    modalElements.descriptionTextArea.value = taskForEdit.description
    modalElements.userSelect.innerHTML = userSelectTemplate(usersList, taskForEdit.executiveUser)
    modalElements.statusSelect.value = taskForEdit.status

    editFormElement.addEventListener('submit', handleSubmitEditForm)
  }
}

function handleSubmitEditForm(event) {
  event.preventDefault()
  const formElement = event.target.closest('form')
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

  editFormElement.removeEventListener('submit', handleSubmitEditForm)
}

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
    modalQuestion.textContent = `Are you sure you want to delete the task with title "${taskForDelete.title}"?`

    deleteFormElement.addEventListener('submit', handleConfirmDelete)
  }
}

function handleClickRemoveAll({ target }) {
  if (target.dataset.role !== 'deleteAllDone') return

  const modalTitle = deleteModalElement.querySelector('#deleteModalTitle')
  const modalQuestion = deleteModalElement.querySelector('#deleteQuestion')

  modalTitle.textContent = 'Delete all done tasks'
  modalQuestion.textContent = 'Are you sure you want to delete all done tasks?'
  deleteFormElement.dataset.role = 'del-all'

  deleteFormElement.addEventListener('submit', handleConfirmDelete)
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
  deleteFormElement.removeEventListener('submit', handleConfirmDelete)
}

function handleClickChooseColorButton({ target }) {
  if (target.dataset.role !== 'colorChoose') return

  const colorChooseModal = document.querySelector('#colorThemeModal')
  const modalDescriptionText = colorChooseModal.querySelector('#colorChooseDescription')
  const modalColorInput = colorChooseModal.querySelector('#myColor')
  const targetColumnName = target.closest('.board__column-header').dataset.column

  colorFormElement.setAttribute('data-column', targetColumnName)
  modalDescriptionText.textContent = `Choose background color for column "${targetColumnName}"`
  modalColorInput.value = currentColors.find(item => item.column === targetColumnName).color

  colorFormElement.addEventListener('submit', handleSubmitColorChooseForm)
  setDefaultColorButtonElement.addEventListener('click', handleClickSetDefaultColor)
}

function handleSubmitColorChooseForm({ target }) {
  const formElement = target.closest('form')
  const columnName = formElement.dataset.column
  const themeToChange = currentColors.find(item => item.column === columnName)
  themeToChange.color = new FormData(formElement).get('myColor')

  setThemeColorsToLocalStorage(currentColors)

  colorFormElement.removeEventListener('submit', handleSubmitColorChooseForm)
  setDefaultColorButtonElement.removeEventListener('click', handleClickSetDefaultColor)
}

function handleClickSetDefaultColor() {
  const { columnName } = colorFormElement.dataset
  const inputElement = colorFormElement.querySelector('#myColor')
  inputElement.value = defaultColors.find(item => item.column === columnName).color
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
