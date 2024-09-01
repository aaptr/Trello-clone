import { Modal } from 'bootstrap'

import {
  addFormElement,
  editFormElement,
  boardElement,
  addButtonElement,
  setUsersList,
  usersList,
  deleteFormElement,
  setDefaultColorButtonElement,
  colorFormElement
} from './declarations.js'

import {
  clock,
  render,
  getDataFromLocalStorage,
  loadUsersList,
  updateColors
} from './helpers.js'

import {
  handleClickEditButton,
  handleSubmitEditForm,
  handleChangeStatusSelect,
  handleClickRemoveTask,
  handleClickRemoveAll,
  handleClickAddButtom,
  handleClickChooseColorButton,
  handleSubmitAddForm,
  handleConfirmDelete,
  handleClickSetDefaultColor,
  handleSubmitColorChooseForm,
  handleChangeUserSelect
} from './handlers.js'


loadUsersList('https://jsonplaceholder.typicode.com/users') // getting user list
  .then(res => {
    usersList = res
    setUsersList(res)
    render(getDataFromLocalStorage())
  })

setInterval(clock, 1000) // starting a clock
render(getDataFromLocalStorage()) // render columns content
updateColors() // Update user theme

// Click-button event listeners
addButtonElement.addEventListener('click', handleClickAddButtom)
boardElement.addEventListener('click', handleClickEditButton)
boardElement.addEventListener('click', handleClickRemoveTask)
boardElement.addEventListener('click', handleClickRemoveAll)
boardElement.addEventListener('click', handleClickChooseColorButton)
setDefaultColorButtonElement.addEventListener('click', handleClickSetDefaultColor)

// Change event listeners
boardElement.addEventListener('change', handleChangeStatusSelect)
boardElement.addEventListener('change', handleChangeUserSelect)

// Form submit event listeners
addFormElement.addEventListener('submit', handleSubmitAddForm)
editFormElement.addEventListener('submit', handleSubmitEditForm)
deleteFormElement.addEventListener('submit', handleConfirmDelete)
colorFormElement.addEventListener('submit', handleSubmitColorChooseForm)
