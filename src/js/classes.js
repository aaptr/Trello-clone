class Task {
  id = crypto.randomUUID()
  createdAt = new Date().toLocaleDateString('pl-PL')

  constructor(title, description, executiveUser) {
    this.title = title
    this.description = description
    this.executiveUser = executiveUser
    this.status = 'todo'
  }
}

export { Task }