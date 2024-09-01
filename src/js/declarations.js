import { getThemeColorsFromLocalStorage } from './helpers.js'

// DOM elements: forms
const addFormElement = document.querySelector('#addForm')
const editFormElement = document.querySelector('#editForm')
const deleteFormElement = document.querySelector('#deleteForm')
const colorFormElement = document.querySelector('#colorForm')

// DOM elements: containers
const boardElement = document.querySelector('.board')
const todosBoxElement = document.querySelector('#todos-box')
const inProgresBoxElement = document.querySelector('#in-progress-box')
const doneBoxElement = document.querySelector('#done-box')

// DOM elements: buttons & selects
const addButtonElement = document.querySelector('#addTaskButton')
const setDefaultColorButtonElement = document.querySelector('#defaultColorButton')
const addUserSelectElement = document.querySelector('#addUserSelect')

// DOM elements: modal windows
const deleteModalElement = document.querySelector('#deleteModal')

// DOM elements: counters
const todosCounterElement = document.querySelector('#todosCounter')
const inProgressCounterElement = document.querySelector('#inProgressCounter')
const doneCounterElement = document.querySelector('#doneCounter')

// color adjustment variables
const defaultColors = [
  {
    column: 'todo',
    color: '#fffdc0'
  },
  {
    column: 'in-progress',
    color: '#b7dbff'
  },
  {
    column: 'done',
    color: '#bcf4bc'
  }
]
const currentColors = getThemeColorsFromLocalStorage()

// Users list
let usersList = []
function setUsersList(value) {
  usersList = value
}

export {
  addFormElement,
  editFormElement,
  deleteFormElement,
  colorFormElement,
  boardElement,
  todosBoxElement,
  inProgresBoxElement,
  doneBoxElement,
  addButtonElement,
  setDefaultColorButtonElement,
  addUserSelectElement,
  deleteModalElement,
  todosCounterElement,
  inProgressCounterElement,
  doneCounterElement,
  defaultColors,
  currentColors,
  usersList,
  setUsersList
}