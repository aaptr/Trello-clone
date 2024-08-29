import { Modal } from 'bootstrap'

import {
  editFormElement,
  boardElement,
  addButtonElement,
  setUsersList,
  usersList
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
} from './handlers.js'


loadUsersList('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    usersList = res
    setUsersList(res)
    render(getDataFromLocalStorage())
  })

setInterval(clock, 1000)
render(getDataFromLocalStorage())
updateColors()

addButtonElement.addEventListener('click', handleClickAddButtom)
boardElement.addEventListener('click', handleClickEditButton)
boardElement.addEventListener('change', handleChangeStatusSelect)
boardElement.addEventListener('click', handleClickRemoveTask)
boardElement.addEventListener('click', handleClickRemoveAll)
boardElement.addEventListener('click', handleClickChooseColorButton)
