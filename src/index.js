import toggleEffects, { modal1, modal2 } from './effects'
import { addProject, addTask, deleteTask, getLocalTasks } from './functions'

getLocalTasks()

toggleEffects()

const projectForm = document.querySelector('#project-form')
const taskForm = document.querySelector('#task-form')
const del = document.querySelector('.btn-delete')

projectForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const title = this.elements['title'].value

    addProject(title)

    modal1.style.display = 'none'
    projectForm.reset()
})

taskForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const title = this.elements['title'].value
    const description = this.elements['description'].value
    const date = this.elements['duedate'].value
    const priority = this.elements['priority'].value


    addTask(title, description, date, priority)

    modal2.style.display = 'none'
    taskForm.reset()
})

del.addEventListener('click', function(e){
    let task = e.currentTarget.parentNode.parentNode.parentNode.children[0]
    deleteTask(task)
})