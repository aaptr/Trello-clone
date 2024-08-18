import { Modal } from 'bootstrap'

import {
  clock,
  render,
  getDataFromLocalStorage
} from './helpers.js'

import { addFormElement } from './declarations.js'

import { hadleSubmitAddForm } from './handlers.js'


setInterval(clock, 1000)
render(getDataFromLocalStorage())

addFormElement.addEventListener('submit', hadleSubmitAddForm)


// const instanceModal = new Modal('#exampleModal')
// instanceModal.show()

