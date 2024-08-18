import {
  addFormElement
} from './declarations.js'

import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
  render
} from './helpers.js'

import { Task } from './models.js'


function hadleSubmitAddForm(event) {
  let tasksList = getDataFromLocalStorage()
  const formData = new FormData(event.target)
  const title = formData.get('addTitle')
  const description = formData.get('addText')
  const executiveUser = formData.get('users')
  const newTask = new Task(title, description, executiveUser)

  console.log(tasksList);
  console.log(newTask)

  tasksList.push(newTask)
  console.log(tasksList)


  setDataToLocalStorage(tasksList)
  addFormElement.reset()

  // render(getDataFromLocalStorage())
}


export {
  hadleSubmitAddForm
}