import {
  todosBoxElement,
  inProgresBoxElement,
  doneBoxElement,
  todosCounterElement,
  inProgressCounterElement,
  doneCounterElement,
  defaultColors,
  currentColors
} from './declarations.js'

import { buildTaskTemplate } from './templates.js'

function clock() {
  const date = new Date()
  const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()
  const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
  const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()

  document.getElementById("clock").innerHTML = `
    <p class="fs-1 fw-semibold m-2">
    ${hours}<span class="clock_separator">:</span>${minutes}<span class="clock_separator">:</span>${seconds}
    </p>
  `
}

async function loadUsersList(url) {
  const data = await (await fetch(url)).json()
  return data.map(user => user.name)
}


function setDataToLocalStorage(data) {
  localStorage.setItem('tasks', JSON.stringify(data))
}

function getDataFromLocalStorage() {
  const tasks = localStorage.getItem('tasks')
  if (tasks) {
    return JSON.parse(tasks)
  } else {
    return []
  }
}

function render(payload) {
  const todoList = payload.filter(task => task.status === 'todo')
  const inProgressList = payload.filter(task => task.status === 'in-progress')
  const doneList = payload.filter(task => task.status === 'done')

  todosCounterElement.textContent = todoList.length
  inProgressCounterElement.textContent = inProgressList.length
  doneCounterElement.textContent = doneList.length

  todosBoxElement.innerHTML = ''
  inProgresBoxElement.innerHTML = ''
  doneBoxElement.innerHTML = ''

  todoList.forEach(element => {
    todosBoxElement.insertAdjacentHTML('beforeend', buildTaskTemplate(element))
  })
  inProgressList.forEach(element => {
    inProgresBoxElement.insertAdjacentHTML('beforeend', buildTaskTemplate(element))
  })
  doneList.forEach(element => {
    doneBoxElement.insertAdjacentHTML('beforeend', buildTaskTemplate(element))
  })
}

function getThemeColorsFromLocalStorage() {
  const colors = localStorage.getItem('colors')
  if (colors) {
    return JSON.parse(colors)
  } else {
    return defaultColors
  }
}

function setThemeColorsToLocalStorage(data) {
  localStorage.setItem('colors', JSON.stringify(data))
}

function updateColors() {
  const columns = ['todo', 'in-progress', 'done']

  columns.forEach(column => {
    const headerElement = document.querySelector(`.board__header-${column}`)
    const columnElement = document.querySelector(`.board__column-${column}`)
    const color = currentColors.find(item => item.column === column).color

    headerElement.style.setProperty('background-color', color)
    columnElement.style.setProperty('background-color', color)
  })
}

export {
  clock,
  loadUsersList,
  setDataToLocalStorage,
  getDataFromLocalStorage,
  render,
  getThemeColorsFromLocalStorage,
  setThemeColorsToLocalStorage,
  updateColors
}

