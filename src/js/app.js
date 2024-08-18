import { Modal } from 'bootstrap'

import {
  addFormElement,
  editFormElemet,
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
  handleSubmitEditForm
} from './handlers.js'


setInterval(clock, 1000)
render(getDataFromLocalStorage())

addFormElement.addEventListener('submit', hadleSubmitAddForm)
boardElement.addEventListener('click', hadleClickEditButton)
editFormElemet.addEventListener('click', handleSubmitEditForm)



// const instanceModal = new Modal('#exampleModal')
// instanceModal.show()

