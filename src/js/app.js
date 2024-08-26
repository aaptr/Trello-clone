import { Modal } from 'bootstrap'

import {
  addFormElement,
  editFormElement,
  boardElement,
  addButtonElement,
  deleteFormElement,
  setUsersList,
  usersList
} from './declarations.js'

import {
  clock,
  render,
  getDataFromLocalStorage,
  loadUsersList
} from './helpers.js'

import {
  handleSubmitAddForm,
  handleClickEditButton,
  handleSubmitEditForm,
  handleChangeStatusSelect,
  handleClickRemoveTask,
  handleConfirmDelete,
  handleClickRemoveAll,
  handleClickAddButtom
} from './handlers.js'


loadUsersList('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    usersList = res
    setUsersList(res)
    render(getDataFromLocalStorage())
  })

setInterval(clock, 1000)
render(getDataFromLocalStorage())

addButtonElement.addEventListener('click', handleClickAddButtom)
addFormElement.addEventListener('submit', handleSubmitAddForm)
editFormElement.addEventListener('submit', handleSubmitEditForm)
boardElement.addEventListener('click', handleClickEditButton)
boardElement.addEventListener('change', handleChangeStatusSelect)
boardElement.addEventListener('click', handleClickRemoveTask)
deleteFormElement.addEventListener('submit', handleConfirmDelete)
boardElement.addEventListener('click', handleClickRemoveAll)





