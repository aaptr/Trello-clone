import { Modal } from 'bootstrap'

import {
  addFormElement,
  editFormElement,
  boardElement
} from './declarations.js'

import {
  clock,
  render,
  getDataFromLocalStorage
} from './helpers.js'

import {
  hadleSubmitAddForm,
  hadleClickEditButton,
  handleSubmitEditForm,
  handleChangeStatusSelect,
  handleClickRemoveTask
} from './handlers.js'


setInterval(clock, 1000)
render(getDataFromLocalStorage())

addFormElement.addEventListener('submit', hadleSubmitAddForm)
editFormElement.addEventListener('submit', handleSubmitEditForm)
boardElement.addEventListener('click', hadleClickEditButton)
boardElement.addEventListener('change', handleChangeStatusSelect)
boardElement.addEventListener('click', handleClickRemoveTask)




// const instanceModal = new Modal('#exampleModal')
// instanceModal.show()

