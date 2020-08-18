import toggleEffects, { modal1, modal2 } from './effects'
import { addProject, addTask,  getLocalTasks, render, renderTask} from './functions'

getLocalTasks()

toggleEffects()

const projectForm = document.querySelector('#project-form')
const taskForm = document.querySelector('#task-form')
const task = document.querySelectorAll('.task-item')

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

task.forEach(todo => {
    todo.addEventListener('click', function(e) {
        task.forEach(todo => todo.classList.remove('selected'))
        todo.classList.toggle('selected')
        
        const idx = todo.dataset.key
        
        renderTask(idx)
    })
})