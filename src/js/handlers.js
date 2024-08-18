import {
  addFormElement,
  editFormElemet
} from './declarations.js'

import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
  render
} from './helpers.js'

import { Task } from './models.js'


function hadleSubmitAddForm({ target }) {
  let taskList = getDataFromLocalStorage()
  const formData = new FormData(target)
  const title = formData.get('addTitle')
  const description = formData.get('addText')
  const executiveUser = formData.get('users')
  const newTask = new Task(title, description, executiveUser)

  taskList.push(newTask)
  setDataToLocalStorage(taskList)
  addFormElement.reset()
}

function hadleClickEditButton({ target }) {
  if (target.dataset.role === 'edit') {
    const editModal = document.querySelector('#editModal')
    const modalIdInput = editModal.querySelector('#formIdInput')
    const modalTitleInput = editModal.querySelector('#formTitleInput')
    const modalDescriptionTextArea = editModal.querySelector('#formDescriprionTextArea')
    const modalUserSelect = editModal.querySelector('#user-select')
    const modalStatusSelect = editModal.querySelector('#status-select')

    let taskList = getDataFromLocalStorage()

    let targetId = target.closest('.task').dataset.id
    let taskForEdit = taskList.find(item => item.id === targetId)

    editFormElemet.setAttribute('data-id', targetId)
    modalTitleInput.value = taskForEdit.title
    modalDescriptionTextArea.value = taskForEdit.description
    modalUserSelect.value = taskForEdit.executiveUser
    modalStatusSelect.value = taskForEdit.status
  }
}

function handleSubmitEditForm({ target }) {
  const formElement = target.closest('form')
  let taskList = getDataFromLocalStorage()
  const formData = new FormData(formElement)
  const id = editFormElemet.dataset.id
  const taskForEdit = taskList.find(item => item.id === id)

  taskForEdit.title = formData.get('editTitle')
  taskForEdit.description = formData.get('editText')
  taskForEdit.executiveUser = formData.get('users')
  taskForEdit.status = formData.get('status')

  setDataToLocalStorage(taskList)
}

function handleChangeStatusSelect({ target }) {
  if (target.dataset.role === 'status-select') {
    let taskList = getDataFromLocalStorage()
    const taskElement = target.closest('.task')
    const id = taskElement.dataset.id

    const task = taskList.find((task) => task.id === id)
    task.status = target.value

    setDataToLocalStorage(taskList)
    render(getDataFromLocalStorage())
  }
}

function handleClickRemoveTask({ target }) {
  if (target.dataset.role === 'removeTask') {
    let taskList = getDataFromLocalStorage()
    const taskElement = target.closest('.task')
    const { id } = taskElement.dataset

    taskList.splice(taskList.findIndex((task) => task.id === id), 1)

    setDataToLocalStorage(taskList)
    render(getDataFromLocalStorage())
  }
}

export {
  hadleSubmitAddForm,
  hadleClickEditButton,
  handleSubmitEditForm,
  handleChangeStatusSelect,
  handleClickRemoveTask
}