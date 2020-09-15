import firebase from 'firebase/app'
import 'firebase/firestore'
// eslint-disable-next-line
import regeneratorRuntime from 'regenerator-runtime'

import { Project, Task } from './constructors'

const app = firebase.initializeApp({
	apiKey: 'AIzaSyAiVOrxLLFuxofWPmvqcvQIHUa_BbCt83Y',
	authDomain: 'todo-list-467fb.firebaseapp.com',
	projectId: 'todo-list-467fb',
})

const db = app.firestore()

const projectsList = document.querySelector('.projects-list')
const taskList = document.querySelector('.tasklist')
const taskCard = document.querySelector('#task-card')

let projectsArr = []
let tasksArr = []

export function addProject(title) {
	let project = new Project(title)

	if (duplicate(project)) return

	projectsArr.push(project)

	saveProject(title)

	getProject(title)
}

export function addTask(title, description, date, priority) {
	let task = new Task(title, description, date, priority)

	const titleEl = document.querySelector('.project-title')
	const projectTitle = titleEl.textContent

	task.project = projectTitle

	task.done = false

	if (duplicateTask(task)) return

	tasksArr.push(task)

	saveTask(title, description, date, priority, task.project, task.done)

	getTask(title)
}

export function changePriority(task) {
	const todo = tasksArr.find((item) => item.title === task.textContent)
	if (todo.priority === 'high') {
		todo.priority = 'low'
	} else if (todo.priority === 'medium') {
		todo.priority = 'high'
	} else {
		todo.priority = 'medium'
	}
}

export function render() {
	projectsList.innerHTML = ''
	taskList.innerHTML = ''

	saveToLocal()

	projectsArr.forEach((project, idx) => {
		projectsList.innerHTML += `
        <li class="project-item" data-key=${idx}>${project.title}</li>
        `
	})

	tasksArr.forEach((task, idx) => {
		taskList.innerHTML += `
        <li class="task-item" data-key=${idx}>${task.title}</li>
        `
	})

	const project = document.querySelectorAll('.project-item')
	const task = document.querySelectorAll('.task-item')

	project.forEach((prj) => {
		prj.addEventListener('click', function () {
			project.forEach((prj) => prj.classList.remove('selected'))
			prj.classList.toggle('selected')

			const idx = prj.dataset.key

			renderProject(idx)
		})
	})

	task.forEach((todo) => {
		todo.addEventListener('click', function () {
			task.forEach((todo) => todo.classList.remove('selected'))
			todo.classList.toggle('selected')

			const idx = todo.dataset.key

			renderTask(idx)
		})
	})

	renderTask(0)
}

export function renderProject(idx) {
	const title = document.querySelector('.project-title')

	title.innerHTML = ''

	title.innerHTML += `<h2 class="project-title" data-key=${idx}>${projectsArr[idx].title}</h2>`

	const project = projectsArr[idx]

	let filteredArr = tasksArr.filter((item) => item.project === project.title)

	taskList.innerHTML = ''

	filteredArr.forEach((task, idx) => {
		idx = tasksArr.indexOf(task)
		taskList.innerHTML += `
        <li class="task-item" data-key=${idx}>${task.title}</li>
        `
	})

	const task = document.querySelectorAll('.task-item')

	task.forEach((todo) => {
		todo.addEventListener('click', function () {
			task.forEach((todo) => todo.classList.remove('selected'))
			todo.classList.toggle('selected')

			const idx = todo.dataset.key

			renderTask(idx)
		})
	})

	renderTask(tasksArr.indexOf(filteredArr[0]))
}

export function renderTask(idx) {
	taskCard.innerHTML = ''

	saveToLocal()

	taskCard.innerHTML += `
        <div class="task-content">
            <h2 class="key" data-key="${tasksArr[idx].id}">${
		tasksArr[idx].title
	}</h2>
            <h4>Priority - <button class="priority-btn"><span class="priority">${
				tasksArr[idx].priority.charAt(0).toUpperCase() +
				tasksArr[idx].priority.slice(1)
			}</span></button></h4>
            <p class="description" contentEditable="true">${
				tasksArr[idx].description
			}</p>
            <p class="date-text">
                Due date :
            </p>
            <div class="date" contentEditable="true">
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

	//const project = tasksArr[idx].project
	//const projectIdx = projectsArr.findIndex((item) => item.title === project)

	const mark = document.querySelector('.btn-done')
	//const del = document.querySelector('.btn-delete')
	const colorBtn = document.querySelector('.priority-btn')

	mark.addEventListener('click', function (e) {
		const tasks = document.querySelectorAll('.task-item')
		let task =
			e.currentTarget.parentNode.parentNode.parentNode.children[0]
				.children[0]

		const todo = tasksArr.find((item) => item.title === task.textContent)
		tasks.forEach((item) => {
			item.textContent === todo.title
				? item.classList.toggle('task-done')
				: item.classList.remove('task-done')
		})
	})

	// del.addEventListener('click', function (e) {
	// 	let task =
	// 		e.currentTarget.parentNode.parentNode.parentNode.children[0]
	// 			.children[0]
	// 	const idx = tasksArr.findIndex((item) => item.id === task.dataset.key)
	// 	deleteTask(idx)
	// 	render()
	// 	renderTask(0)
	// 	renderProject(projectIdx)
	// })

	colorBtn.addEventListener('click', function (e) {
		let task = e.currentTarget.parentNode.parentNode.children[0]
		const idx = tasksArr.findIndex((item) => item.id === task.dataset.key)
		changePriority(task)
		renderTask(idx)
	})

	if (colorBtn.textContent === 'Low') {
		colorBtn.classList.toggle('low')
	} else if (colorBtn.textContent === 'Medium') {
		colorBtn.classList.toggle('medium')
	} else {
		colorBtn.classList.remove('medium')
	}
}

function duplicate(curr) {
	return projectsArr.some((item) => {
		if (item.title.toLowerCase() === curr.title.toLowerCase()) return true
	})
}

function duplicateTask(curr) {
	return tasksArr.some((item) => {
		if (item.title.toLowerCase() === curr.title.toLowerCase()) return true
	})
}

function saveToLocal() {
	localStorage.setItem('projectList', JSON.stringify(projectsArr))
	localStorage.setItem('taskList', JSON.stringify(tasksArr))
}

// export function getLocalTasks() {
// 	let localProject = JSON.parse(localStorage.getItem('projectList'))
// 	let localTask = JSON.parse(localStorage.getItem('taskList'))

// 	if (
// 		localTask === null ||
// 		localTask === undefined ||
// 		localTask.length === 0
// 	) {
// 		addTask('Eat', 'Go eat burgers', '28-08-2020', 'High')
// 		localStorage.setItem('taskList', JSON.stringify(tasksArr))
// 	} else {
// 		tasksArr = localTask
// 		render()
// 	}

// 	if (
// 		localProject === null ||
// 		localProject === undefined ||
// 		localProject.length === 0
// 	) {
// 		addProject('Work')
// 		localStorage.setItem('projectList', JSON.stringify(projectsArr))
// 	} else {
// 		projectsArr = localProject
// 		render()
// 	}
// }

async function saveProject(title) {
	try {
		await db.collection('projects').add({
			title: title,
		})
	} catch (error) {
		console.error(error)
	}
}

export async function getProjects() {
	const title = document.querySelector('.project-title')

	try {
		const snapshot = await db.collection('projects').limit(6).get()

		const firstProject = snapshot.docs[0]
		const data = firstProject.data()

		title.innerHTML += `<h2 class="project-title" data-key=${firstProject.id}>${data.title}</h2>`

		snapshot.forEach((doc) => {
			let project = doc.data()
			projectsList.innerHTML += `<li class="project-item" data-key=${doc.id}>${project.title}</li>`
		})
	} catch (error) {
		console.error(error)
	}
}

async function getProject(title) {
	try {
		const query = await db
			.collection('projects')
			.where('title', '==', title)
			.get()

		if (!query.empty) {
			const snapshot = query.docs[0]
			const data = snapshot.data()

			projectsList.innerHTML += `<li class="project-item" data-key=${snapshot.id}>${data.title}</li>`
		}
	} catch (error) {
		console.error(error)
	}
}

async function saveTask(title, description, date, priority, project, done) {
	try {
		await db.collection('tasks').add({
			title: title,
			description: description,
			date: date,
			priority: priority,
			project: project,
			done: done,
		})
	} catch (error) {
		console.error(error)
	}
}

export async function getTasks() {
	try {
		const snapshot = await db.collection('tasks').orderBy('date').get()

		const firstTask = snapshot.docs[0]
		const data = firstTask.data()

		displayTask(
			firstTask.id,
			data.title,
			data.description,
			data.date,
			data.priority
		)

		taskList.innerHTML = ''

		snapshot.forEach((doc) => {
			const task = doc.data()

			if (task.done) {
				taskList.innerHTML += `<li class="task-item task-done" data-key=${doc.id}>${task.title}</li>`
			} else {
				taskList.innerHTML += `<li class="task-item" data-key=${doc.id}>${task.title}</li>`
			}
		})

		const todos = document.querySelectorAll('.task-item')

		todos.forEach((todo) =>
			todo.addEventListener('click', async () => {
				const key = todo.dataset.key

				const docRef = db.collection('tasks').doc(`${key}`)

				try {
					const snapshot = await docRef.get()
					const data = snapshot.data()

					displayTask(
						snapshot.id,
						data.title,
						data.description,
						data.date,
						data.priority
					)
				} catch (error) {
					console.error(error)
				}
			})
		)
	} catch (error) {
		console.error(error)
	}
}

async function getTask(title) {
	try {
		const query = await db
			.collection('tasks')
			.where('title', '==', title)
			.get()

		if (!query.empty) {
			const snapshot = query.docs[0]
			const data = snapshot.data()

			taskList.innerHTML += `<li class="task-item" data-key=${snapshot.id}>${data.title}</li>`

			displayTask(
				snapshot.id,
				data.title,
				data.description,
				data.date,
				data.priority
			)
		}
	} catch (error) {
		console.error(error)
	}
}

export async function deleteTask(id) {
	try {
		await db.collection('tasks').doc(`${id}`).delete()
	} catch (error) {
		console.error(error)
	}
}

function displayTask(id, title, description, date, priority) {
	taskCard.innerHTML = ''

	taskCard.innerHTML += `
        <div class="task-content">
            <h2 class="key" data-key="${id}">${title}</h2>
            <h4>Priority - <button class="priority-btn"><span class="priority">${
				priority.charAt(0).toUpperCase() + priority.slice(1)
			}</span></button></h4>
            <p class="description" contentEditable="true">${description}</p>
            <p class="date-text">
                Due date :
            </p>
            <div class="date" contentEditable="true">
                ${date}
            </div>
        </div>

        <footer class="btns">
            <div class="task-btns">
                <button id="btn-task" class="btn-delete" >
                    <span class="delete"><svg class="del-mark" width="24" height="24" viewBox="0 0 24 24"><defs><filter id="delete-task_icon_svg__svg-404750943-a" width="113.1%" height="186.8%" x="-6.6%" y="-43.4%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><path id="delete-task_icon_svg__svg-404750943-b" d="M7.476 6.357l.09.077L11.8 10.67l4.234-4.235a.802.802 0 011.209 1.042l-.077.09L12.93 11.8l4.235 4.234a.802.802 0 01-1.042 1.209l-.09-.077L11.8 12.93l-4.234 4.235a.802.802 0 01-1.209-1.042l.077-.09L10.67 11.8 6.434 7.566a.802.802 0 011.042-1.209z"></path></defs><g fill="none" fill-rule="evenodd" filter="url(#delete-task_icon_svg__svg-404750943-a)" transform="translate(-52 -22)"><g transform="translate(52 22)"><mask id="delete-task_icon_svg__svg-404750943-c" fill="#fff"><use xlink:href="#delete-task_icon_svg__svg-404750943-b"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#delete-task_icon_svg__svg-404750943-b"></use><g fill="currentColor" mask="url(#delete-task_icon_svg__svg-404750943-c)"><path d="M0 0h24v24H0z"></path></g></g></g></svg><span class="delete-panel">Delete task</span></span>
                </button>
                <button id="btn-task" class="btn-done">
                    <span class="done"><svg class="del" width="24" height="24" viewBox="0 -1 24 23"><defs><filter id="mark-as-done_icon_svg__svg-253777825-a" width="113.1%" height="186.8%" x="-6.6%" y="-43.4%" filterUnits="objectBoundingBox"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5"></feGaussianBlur><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><path id="mark-as-done_icon_svg__svg-253777825-b" d="M19.234 6.434a.802.802 0 011.209 1.042l-.077.09-8.8 8.8a.8.8 0 01-1.042.077l-.09-.077-4-4a.802.802 0 011.042-1.209l.09.077L11 14.67l8.234-8.235z"></path></defs><g fill="none" fill-rule="evenodd" filter="url(#mark-as-done_icon_svg__svg-253777825-a)" transform="translate(-266 -22)"><g transform="translate(266 22)"><mask id="mark-as-done_icon_svg__svg-253777825-c" fill="#fff"><use xlink:href="#mark-as-done_icon_svg__svg-253777825-b"></use></mask><use fill="currentColor" fill-rule="nonzero" xlink:href="#mark-as-done_icon_svg__svg-253777825-b"></use><g fill="currentColor" mask="url(#mark-as-done_icon_svg__svg-253777825-c)"><path d="M1 0h24v24H1z"></path></g></g></g></svg><span class="delete-panel">Mark as done</span></span>
                </button>
            </div>
        </footer>
	`

	const del = document.querySelector('.btn-delete')
	const mark = document.querySelector('.btn-done')
	const colorBtn = document.querySelector('.priority-btn')

	del.addEventListener('click', (e) => {
		const todo =
			e.currentTarget.parentNode.parentNode.parentNode.children[0]
				.children[0]

		const id = todo.dataset.key

		deleteTask(id)

		getTasks()
	})

	mark.addEventListener('click', async (e) => {
		let tasks = document.querySelectorAll('.task-item')
		let task =
			e.currentTarget.parentNode.parentNode.parentNode.children[0]
				.children[0]

		const key = task.dataset.key

		tasks = [...tasks]

		const todo = tasks.find((item) => item.dataset.key === key)

		// task.textContent === todo.textContent
		// 	? todo.classList.toggle('task-done')
		// 	: todo.classList.remove('task-done')

		if (
			task.textContent === todo.textContent &&
			todo.classList.value === 'task-item'
		) {
			todo.classList.toggle('task-done')
			await db.collection('tasks').doc(`${key}`).update({ done: true })
		} else if (
			task.textContent === todo.textContent &&
			todo.classList.value === 'task-done'
		) {
			todo.classList.toggle('task-done')
			await db.collection('tasks').doc(`${key}`).update({ done: true })
		}
	})

	colorBtn.addEventListener('click', function () {
		//let task = e.currentTarget.parentNode.parentNode.children[0]

		if (colorBtn.textContent === 'Low') {
			colorBtn.classList.toggle('low')
		} else if (colorBtn.textContent === 'Medium') {
			colorBtn.classList.toggle('medium')
		} else {
			colorBtn.classList.remove('medium')
		}
	})
}
