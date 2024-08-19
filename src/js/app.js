import { Modal } from 'bootstrap'

import {
  addFormElement,
  editFormElement,
  boardElement,
  confirmDeleteButtonElement,
  deleteFormElement
} from './declarations.js'

import {
  clock,
  render,
  getDataFromLocalStorage
} from './helpers.js'

import {
  handleSubmitAddForm,
  handleClickEditButton,
  handleSubmitEditForm,
  handleChangeStatusSelect,
  handleClickRemoveTask,
  handleConfirmDelete,
  handleClickRemoveAll
} from './handlers.js'


setInterval(clock, 1000)
render(getDataFromLocalStorage())

addFormElement.addEventListener('submit', handleSubmitAddForm)
editFormElement.addEventListener('submit', handleSubmitEditForm)
boardElement.addEventListener('click', handleClickEditButton)
boardElement.addEventListener('change', handleChangeStatusSelect)
boardElement.addEventListener('click', handleClickRemoveTask)
deleteFormElement.addEventListener('submit', handleConfirmDelete)
boardElement.addEventListener('click', handleClickRemoveAll)




// const instanceModal = new Modal('#exampleModal')
// instanceModal.show()

