export function Project(title) {
	this.title = title
}

export function Task(title, description, date, priority, id, project) {
	this.title = title
	this.description = description
	this.date = date
	this.priority = priority
	this.id = Date.now().toString()
}
