import { loadUsersList } from './helpers.js'

const addFormElement = document.querySelector('#addForm')
const editFormElement = document.querySelector('#editForm')
const deleteFormElement = document.querySelector('#deleteForm')
const deleteModalElement = document.querySelector('#deleteModal')
const todosBoxElement = document.querySelector('#todos-box')
const inProgresBoxElement = document.querySelector('#in-progress-box')
const doneBoxElement = document.querySelector('#done-box')
const todosCounterElement = document.querySelector('#todosCounter')
const inProgressCounterElement = document.querySelector('#inProgressCounter')
const doneCounterElement = document.querySelector('#doneCounter')
const boardElement = document.querySelector('.board')
const addUserSelectElement = document.querySelector('#addUserSelect')
const addButtonElement = document.querySelector('#addTaskButton')


let usersList = []

export function setUsersList(value) {
  usersList = value
}

export {
  addFormElement,
  editFormElement,
  deleteModalElement,
  todosBoxElement,
  inProgresBoxElement,
  doneBoxElement,
  todosCounterElement,
  inProgressCounterElement,
  doneCounterElement,
  boardElement,
  deleteFormElement,
  addUserSelectElement,
  addButtonElement,
  usersList
}