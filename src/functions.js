import firebase from 'firebase/app'
import 'firebase/firestore'
// eslint-disable-next-line
import regeneratorRuntime from 'regenerator-runtime'

const app = firebase.initializeApp({
	apiKey: 'AIzaSyAiVOrxLLFuxofWPmvqcvQIHUa_BbCt83Y',
	authDomain: 'todo-list-467fb.firebaseapp.com',
	projectId: 'todo-list-467fb',
})

const db = app.firestore()

const projectsList = document.querySelector('.projects-list')
const title = document.querySelector('.project-title')
const taskList = document.querySelector('.tasklist')
const taskCard = document.querySelector('#task-card')

export function addProject(title) {
	saveProject(title)

	getProject(title)
}

export function addTask(title, description, date, priority) {
	const titleEl = document.querySelector('.project-title')
	const projectTitle = titleEl.textContent

	let project = projectTitle

	let done = false

	saveTask(title, description, date, priority, project, done)

	getTask(title)
}

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
	try {
		const snapshot = await db.collection('projects').limit(6).get()

		const firstProject = snapshot.docs[0]
		const data = firstProject.data()

		title.innerHTML += `<h2 class="project-title" data-key=${firstProject.id}>${data.title}</h2>`

		snapshot.forEach((doc) => {
			let project = doc.data()
			projectsList.innerHTML += `<li class="project-item" data-key=${doc.id}>${project.title}</li>`
		})

		const projects = document.querySelectorAll('.project-item')

		projects.forEach((project) =>
			project.addEventListener('click', () => {
				projects.forEach((project) =>
					project.classList.remove('selected')
				)
				project.classList.toggle('selected')

				getProjectTasks(project.textContent, project.dataset.key)
			})
		)
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

async function getProjectTasks(project, id) {
	try {
		title.innerHTML = ''
		taskList.innerHTML = ``

		const query = await db
			.collection('tasks')
			.where('project', '==', project)
			.get()

		if (!query.empty) {
			const first = query.docs[0]
			const firstData = first.data()

			title.innerHTML += `<h2 class="project-title" data-key=${id}>${project}</h2>`

			displayTask(
				first.id,
				firstData.title,
				firstData.description,
				firstData.date,
				firstData.priority
			)

			const snapshot = query.docs
			snapshot.forEach((doc) => {
				let data = doc.data()

				if (data.done) {
					taskList.innerHTML += `<li class="task-item task-done" data-key=${doc.id}>${data.title}</li>`
				} else {
					taskList.innerHTML += `<li class="task-item" data-key=${doc.id}>${data.title}</li>`
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

export async function deleteTask(id, todo) {
	try {
		todo.parentNode.removeChild(todo)

		const snapshot = await db.collection('tasks').doc(`${id}`).get()
		const data = snapshot.data()
		const project = data.project

		await db.collection('tasks').doc(`${id}`).delete()

		getProjectTasks(project, '')
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
	const priorityText = document.querySelector('.priority')

	del.addEventListener('click', (e) => {
		const todo =
			e.currentTarget.parentNode.parentNode.parentNode.children[0]
				.children[0]

		const id = todo.dataset.key

		deleteTask(id, todo)

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

		if (
			task.textContent === todo.textContent &&
			todo.classList.value === 'task-item'
		) {
			todo.classList.toggle('task-done')
			await db.collection('tasks').doc(`${key}`).update({ done: true })
		} else if (
			task.textContent === todo.textContent &&
			todo.classList.value === 'task-item task-done'
		) {
			todo.classList.remove('task-done')
			await db.collection('tasks').doc(`${key}`).update({ done: false })
		}
	})

	colorBtn.addEventListener('click', async (e) => {
		let task = e.currentTarget.parentNode.parentNode.children[0]
		const key = task.dataset.key

		const doc = await db.collection('tasks').doc(`${key}`).get()
		const data = doc.data()

		if (data.priority === 'low') {
			priorityText.textContent = 'Medium'
			colorBtn.classList.toggle('medium')
			await db
				.collection('tasks')
				.doc(`${key}`)
				.update({ priority: 'medium' })
		} else if (data.priority === 'medium') {
			priorityText.textContent = 'High'
			colorBtn.classList.remove('low')
			colorBtn.classList.remove('medium')
			await db
				.collection('tasks')
				.doc(`${key}`)
				.update({ priority: 'high' })
		} else {
			priorityText.textContent = 'Low'
			colorBtn.classList.toggle('low')
			await db
				.collection('tasks')
				.doc(`${key}`)
				.update({ priority: 'low' })
		}
	})

	if (colorBtn.textContent === 'Low') {
		colorBtn.classList.toggle('low')
	} else if (colorBtn.textContent === 'Medium') {
		colorBtn.classList.toggle('medium')
	} else {
		colorBtn.classList.remove('medium')
	}
}
