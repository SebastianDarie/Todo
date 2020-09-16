import './style.css'
import toggleEffects, { modal1, modal2 } from './effects'
import { addProject, addTask, getProjects, getTasks } from './functions'

getProjects()
getTasks()

toggleEffects()

const projectForm = document.querySelector('#project-form')
const taskForm = document.querySelector('#task-form')

projectForm.addEventListener('submit', function (e) {
	e.preventDefault()
	const title = this.elements['title'].value

	addProject(title)

	modal1.style.display = 'none'
	projectForm.reset()
})

taskForm.addEventListener('submit', function (e) {
	e.preventDefault()
	const title = this.elements['title'].value
	const description = this.elements['description'].value
	const date = this.elements['duedate'].value
	const priority = this.elements['priority'].value

	addTask(title, description, date, priority)

	modal2.style.display = 'none'
	taskForm.reset()
})
