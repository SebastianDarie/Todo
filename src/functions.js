import { Project, Task } from './constructors'

const projectsList = document.querySelector('.projects-list')
const taskList = document.querySelector('.tasklist')
const taskCard = document.querySelector('#task-card')

let projectsArr = []
let tasksArr = []

export function addProject(title) {
    let project = new Project(title)

    if(duplicate(project)) return

    projectsArr.push(project)

    render()
}

export function addTask(title, description, date, priority) {
    let task = new Task(title, description, date, priority)

    if(duplicateTask(task)) return

    tasksArr.push(task)

    render()
}

export function deleteTask(task) {
    const todo = tasksArr.findIndex(x => x.title === task.textContent)
    tasksArr.splice(todo, 1)
}

export function markDone(task) {
    const tasks = document.querySelectorAll('.task-item')
    const todo = tasksArr.find(item => item.title === task.textContent) 
    tasks.forEach(x => {
        x.textContent === todo.title ? x.classList.toggle('task-done') : x.classList.remove('task-done')
    })
}

export function changePriority(task) {
    const todo = tasksArr.find(item => item.title === task.textContent) 
    if(todo.priority === 'high') {
        todo.priority = 'low'
    } else if(todo.priority === 'medium') {
        todo.priority = 'high'
    } else {
        todo.priority = 'medium'
    }
}

export function render () {
    projectsList.innerHTML = ''
    taskList.innerHTML = ''
    //taskCard.innerHTML = ''
    

    saveToLocal()

    projectsArr.forEach(project => {
        projectsList.innerHTML += `
        <li class="project-item">${project.title}</li>
        `
    })

    tasksArr.forEach((task, idx) => {
        taskList.innerHTML += `
        <li class="task-item" data-key=${idx}>${task.title}</li>
        `
    })

    // taskCard.innerHTML += `
    //     <div class="task-content">
    //         <h2 data-key="${tasksArr[0].id}">${tasksArr[0].title}</h2>
    //         <h4>Priority - <button class="priority-btn"><span class="priority">${tasksArr[0].priority.charAt(0).toUpperCase() + tasksArr[0].priority.slice(1)}</span></button></h4>
    //         <p class="description">${tasksArr[0].description}</p>
    //         <p class="date-text">
    //             Due date :
    //         </p>
    //         <div class="date">
    //             ${tasksArr[0].date}
    //         </div>
    //     </div>

    //     <footer class="btns">
    //         <div class="task-btns">
    //             <button id="btn-task" class="btn-delete">
    //                 <span class="delete"><svg class="del-mark" width="24" height="24" viewBox="0 0 24 24"><defs><filter id="delete-task_icon_svg__svg-404750943-a" width="113.1%" height="186.8%" x="-6.6%" y="-43.4%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><path id="delete-task_icon_svg__svg-404750943-b" d="M7.476 6.357l.09.077L11.8 10.67l4.234-4.235a.802.802 0 011.209 1.042l-.077.09L12.93 11.8l4.235 4.234a.802.802 0 01-1.042 1.209l-.09-.077L11.8 12.93l-4.234 4.235a.802.802 0 01-1.209-1.042l.077-.09L10.67 11.8 6.434 7.566a.802.802 0 011.042-1.209z"></path></defs><g fill="none" fill-rule="evenodd" filter="url(#delete-task_icon_svg__svg-404750943-a)" transform="translate(-52 -22)"><g transform="translate(52 22)"><mask id="delete-task_icon_svg__svg-404750943-c" fill="#fff"><use xlink:href="#delete-task_icon_svg__svg-404750943-b"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#delete-task_icon_svg__svg-404750943-b"></use><g fill="currentColor" mask="url(#delete-task_icon_svg__svg-404750943-c)"><path d="M0 0h24v24H0z"></path></g></g></g></svg><span class="delete-panel">Delete task</span></span>
    //             </button>
    //             <button id="btn-task" class="btn-done">
    //                 <span class="done"><svg class="del" width="24" height="24" viewBox="0 -1 24 23"><defs><filter id="mark-as-done_icon_svg__svg-253777825-a" width="113.1%" height="186.8%" x="-6.6%" y="-43.4%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><path id="mark-as-done_icon_svg__svg-253777825-b" d="M19.234 6.434a.802.802 0 011.209 1.042l-.077.09-8.8 8.8a.8.8 0 01-1.042.077l-.09-.077-4-4a.802.802 0 011.042-1.209l.09.077L11 14.67l8.234-8.235z"></path></defs><g fill="none" fill-rule="evenodd" filter="url(#mark-as-done_icon_svg__svg-253777825-a)" transform="translate(-266 -22)"><g transform="translate(266 22)"><mask id="mark-as-done_icon_svg__svg-253777825-c" fill="#fff"><use xlink:href="#mark-as-done_icon_svg__svg-253777825-b"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#mark-as-done_icon_svg__svg-253777825-b"></use><g fill="currentColor" mask="url(#mark-as-done_icon_svg__svg-253777825-c)"><path d="M1 0h24v24H1z"></path></g></g></g></svg><span class="delete-panel">Mark as done</span></span>
    //             </button>
    //         </div>
    //     </footer>
    // `

    // const colorBtn = document.querySelector('.priority-btn')

    // if(colorBtn.textContent === 'Low') {
    //     colorBtn.classList.toggle('low')
    // } else if(colorBtn.textContent === 'Medium') {
    //     colorBtn.classList.toggle('medium')
    // } else {
    //     colorBtn.classList.remove('medium')
    // }

    

    renderTask(0)
}

export function renderTask(idx) {
    taskCard.innerHTML = ''

    saveToLocal()

    taskCard.innerHTML += `
        <div class="task-content">
            <h2 data-key="${tasksArr[idx].id}">${tasksArr[idx].title}</h2>
            <h4>Priority - <button class="priority-btn"><span class="priority">${tasksArr[idx].priority.charAt(0).toUpperCase() + tasksArr[idx].priority.slice(1)}</span></button></h4>
            <p class="description">${tasksArr[idx].description}</p>
            <p class="date-text">
                Due date :
            </p>
            <div class="date">
                ${tasksArr[idx].date}
            </div>
        </div>

        <footer class="btns">
            <div class="task-btns">
                <button id="btn-task" class="btn-delete">
                    <span class="delete"><svg class="del-mark" width="24" height="24" viewBox="0 0 24 24"><defs><filter id="delete-task_icon_svg__svg-404750943-a" width="113.1%" height="186.8%" x="-6.6%" y="-43.4%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><path id="delete-task_icon_svg__svg-404750943-b" d="M7.476 6.357l.09.077L11.8 10.67l4.234-4.235a.802.802 0 011.209 1.042l-.077.09L12.93 11.8l4.235 4.234a.802.802 0 01-1.042 1.209l-.09-.077L11.8 12.93l-4.234 4.235a.802.802 0 01-1.209-1.042l.077-.09L10.67 11.8 6.434 7.566a.802.802 0 011.042-1.209z"></path></defs><g fill="none" fill-rule="evenodd" filter="url(#delete-task_icon_svg__svg-404750943-a)" transform="translate(-52 -22)"><g transform="translate(52 22)"><mask id="delete-task_icon_svg__svg-404750943-c" fill="#fff"><use xlink:href="#delete-task_icon_svg__svg-404750943-b"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#delete-task_icon_svg__svg-404750943-b"></use><g fill="currentColor" mask="url(#delete-task_icon_svg__svg-404750943-c)"><path d="M0 0h24v24H0z"></path></g></g></g></svg><span class="delete-panel">Delete task</span></span>
                </button>
                <button id="btn-task" class="btn-done">
                    <span class="done"><svg class="del" width="24" height="24" viewBox="0 -1 24 23"><defs><filter id="mark-as-done_icon_svg__svg-253777825-a" width="113.1%" height="186.8%" x="-6.6%" y="-43.4%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><path id="mark-as-done_icon_svg__svg-253777825-b" d="M19.234 6.434a.802.802 0 011.209 1.042l-.077.09-8.8 8.8a.8.8 0 01-1.042.077l-.09-.077-4-4a.802.802 0 011.042-1.209l.09.077L11 14.67l8.234-8.235z"></path></defs><g fill="none" fill-rule="evenodd" filter="url(#mark-as-done_icon_svg__svg-253777825-a)" transform="translate(-266 -22)"><g transform="translate(266 22)"><mask id="mark-as-done_icon_svg__svg-253777825-c" fill="#fff"><use xlink:href="#mark-as-done_icon_svg__svg-253777825-b"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#mark-as-done_icon_svg__svg-253777825-b"></use><g fill="currentColor" mask="url(#mark-as-done_icon_svg__svg-253777825-c)"><path d="M1 0h24v24H1z"></path></g></g></g></svg><span class="delete-panel">Mark as done</span></span>
                </button>
            </div>
        </footer>
    `

    //const colorBtn = document.querySelector('.priority-btn')
    const del = document.querySelector('.btn-delete')
    const colorBtn = document.querySelector('.priority-btn')

    del.addEventListener('click', function(e){
        let task = e.currentTarget.parentNode.parentNode.parentNode.children[0].children[0]
        deleteTask(task)
        location.reload()
        render()
    })
    
    colorBtn.addEventListener('click', function(e) {
        let task = e.currentTarget.parentNode.parentNode.children[0]
        changePriority(task)
        location.reload()
        render()
    })

    if(colorBtn.textContent === 'Low') {
        colorBtn.classList.toggle('low')
    } else if(colorBtn.textContent === 'Medium') {
        colorBtn.classList.toggle('medium')
    } else {
        colorBtn.classList.remove('medium')
    }
}

export function duplicate(curr) {
    return projectsArr.some(item => {
        if(item.title.toLowerCase() === curr.title.toLowerCase()) return true
    })
}

export function duplicateTask(curr) {
    return tasksArr.some(item => {
        if(item.title.toLowerCase() === curr.title.toLowerCase()) return true
    })
}

export function saveToLocal() {
    localStorage.setItem('projectList', JSON.stringify(projectsArr))
    localStorage.setItem('taskList', JSON.stringify(tasksArr))
}

export function getLocalTasks() {
    let localProject = JSON.parse(localStorage.getItem('projectList'))
    let localTask = JSON.parse(localStorage.getItem('taskList'))

    if (localTask === null || localTask === undefined || localTask.length === 0) {
        addTask('Eat', 'Go eat burgers', '28-08-2020' ,'High')
        localStorage.setItem('taskList', JSON.stringify(tasksArr))
    } else {
        tasksArr = localTask
        render()
    }

    if( localProject === null || localProject === undefined || localProject.length === 0 ) {
        addProject('Work')
        localStorage.setItem('projectList', JSON.stringify(projectsArr))
    } else {
        projectsArr = localProject
        render()
    }
}