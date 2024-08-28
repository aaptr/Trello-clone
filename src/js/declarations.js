import { getThemeColorsFromLocalStorage } from './helpers.js'

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
const setDefaultColorButtonElement = document.querySelector('#defaultColorButton')
const colorFormElement = document.querySelector('#colorForm')
let usersList = []

const defaultColors = [
  {
    column: 'todo',
    color: '#f9efa1'
  },
  {
    column: 'in-progress',
    color: '#abcdef'
  },
  {
    column: 'done',
    color: '#80aa80'
  }
]

const currentColors = getThemeColorsFromLocalStorage()

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
  usersList,
  colorFormElement,
  defaultColors,
  currentColors,
  setDefaultColorButtonElement
}