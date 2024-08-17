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


}


export {
  clock,
  setDataToLocalStorage,
  getDataFromLocalStorage,
  render
}
