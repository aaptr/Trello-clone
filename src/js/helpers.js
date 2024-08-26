import {
  todosBoxElement,
  inProgresBoxElement,
  doneBoxElement,
  todosCounterElement,
  inProgressCounterElement,
  doneCounterElement
} from './declarations.js'

import { buildTaskTemplate } from './templates.js'

function clock() {
  const date = new Date()
  let seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()
  let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
  let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()

  document.getElementById("clock").innerHTML = hours + ':' + minutes + ':' + seconds
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
  let todoList = payload.filter(function (task) {
    return task.status === 'todo'
  })
  let inProgressList = payload.filter(function (task) {
    return task.status === 'in-progress'
  })
  let doneList = payload.filter(function (task) {
    return task.status === 'done'
  })

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

async function loadUsersList(url) {
  let data = await (await fetch(url)).json()
  return data.map(x => x.name)
}

export {
  clock,
  setDataToLocalStorage,
  getDataFromLocalStorage,
  render,
  loadUsersList
}
