function Task(title, description, executiveUser) {
  const date = new Date()

  this.id = crypto.randomUUID()
  this.title = title
  this.createdAt = date.toLocaleDateString('pl-PL')
  this.description = description
  this.executiveUser = executiveUser
  this.status = 'todo'
}

export { Task }