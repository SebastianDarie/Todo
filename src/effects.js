export const modal1 = document.querySelector('#my-modal1')
export const modal2 = document.querySelector('#my-modal2')

const toggleEffects = () => {
    const dropdown = document.querySelector('#dropdown')
    const projects = document.querySelector('.projects-list')
    const projectItem = document.querySelectorAll('.project-item')
    const projectTitle = document.querySelector('.project-title')
    const modalBtn = document.querySelector('#modal-btn')
    const addListBtn = document.querySelector('#add-list')
    const closeBtn = document.querySelectorAll('.close')

    projectTitle.innerHTML = ''
    projectTitle.innerHTML = `${projectItem[0].innerHTML}`

    dropdown.classList.toggle('rotate')
    addListBtn.classList.toggle('hidden')
    projects.style.height = '0px'

    dropdown.addEventListener('click', function() {
        dropdown.classList.toggle('rotate')
        addListBtn.classList.toggle('hidden')

        projects.style.height === '0px' ? projects.style.height = '360px' :  projects.style.height = '0px'
    })

    addListBtn.addEventListener('click', openProjectModal)
    modalBtn.addEventListener('click', openTaskModal)
    window.addEventListener('click', outsideClick)
    closeBtn.forEach(btn => btn.addEventListener('click', closeModal))

    function openProjectModal() {
        modal1.style.display = 'block'
    }

    function openTaskModal() {
        modal2.style.display = 'block'
    }

    function closeModal() {
        modal1.style.display = 'none'
        modal2.style.display = 'none'
    }

    function outsideClick(e) {
        if (e.target === modal1 || e.target === modal2) {
            modal1.style.display = 'none'
            modal2.style.display = 'none'
        }
    }
}

export default toggleEffects