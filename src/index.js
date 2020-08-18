import toggleEffects, { modal1, modal2 } from './effects'
import { addProject, addTask,  getLocalTasks, deleteTask, changePriority ,render, renderTask, markDone } from './functions'

getLocalTasks()

toggleEffects()

const projectForm = document.querySelector('#project-form')
const taskForm = document.querySelector('#task-form')
const task = document.querySelectorAll('.task-item')
const del = document.querySelector('.btn-delete')
const mark = document.querySelector('.btn-done')
const colorBtn = document.querySelector('.priority-btn')

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

        // render(todo)

        //location.reload()
    })
})

mark.addEventListener('click', function(e) {
    let task = e.currentTarget.parentNode.parentNode.parentNode.children[0].children[0]
    markDone(task)
})

// del.addEventListener('click', function(e){
//     let task = e.currentTarget.parentNode.parentNode.parentNode.children[0].children[0]
//     deleteTask(task)
//     location.reload()
//     render()
// })

// colorBtn.addEventListener('click', function(e) {
//     let task = e.currentTarget.parentNode.parentNode.children[0]
//     changePriority(task)
//     location.reload()
//     render()
// })