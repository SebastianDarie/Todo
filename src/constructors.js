export function Project(title) {
	this.title = title
}

export function Task(title, description, date, priority, project, done) {
	this.title = title
	this.description = description
	this.date = date
	this.priority = priority
}
