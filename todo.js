const taskList = document.querySelector('ul')
const listElement = [...document.querySelectorAll('li')]
const confirmTask = [...document.getElementsByClassName('check')]
const taskText = [...document.getElementsByClassName('todo-text')]
const addNewTask = document.getElementById('addTask')

function createTask(desc) {
    const li = document.createElement('li')
    li.className = 'list-element'
    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'todo-text'
    input.value = desc
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'check'
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-btn'
    deleteBtn.textContent = 'X'
    li.append(checkbox, input, deleteBtn)
    li.addEventListener('click', deleteTask)
    return li
}

const createTaskListener = ({ key, target: { value } } = {}) => {
    if (key === 'Enter') {
        taskList.appendChild(createTask(value))
    }
}

function deleteTask(e) { 
    if (e.target.className === 'delete-btn') {
        e.currentTarget.remove()
    }
}


const taskTextLisneter = (e) => {
    e.currentTarget.classList.add('yellow')
    console.dir(e.currentTarget)
    if (e.currentTarget.value === '') {
        e.currentTarget.classList.remove('yellow')
    }
}

const confirmTaskListener = (e) => {
    console.log(el)
    if (el.nextElementSibling.value === '') {
        el.nextElementSibling.classList.toggle('red')
        el.parentElement.classList.toggle('red')
    } else {
        el.nextElementSibling.classList.toggle('green')
        el.parentElement.classList.toggle('green')
    }
}



const highlight = (e) => {
    const target = e.target
    if (target.tagName === 'LI') {
        target.classList.add('highlight')
    }
    taskList.removeEventListener('mouseover', highlight)
    taskList.addEventListener('mouseout', resetHighlight)
}

const resetHighlight = (e) => {
    const target = e.target
    target.classList.remove('highlight')
    taskList.removeEventListener('mouseout', resetHighlight)
    taskList.addEventListener('mouseover', highlight)
}



function initListeners() {
    addNewTask.addEventListener('keydown', createTaskListener)

    taskList.addEventListener('mouseover', highlight)

    taskText.forEach((el) => {
        el.addEventListener('input', taskTextLisneter)
    })

    confirmTask.forEach((el) => {
        el.addEventListener('click', confirmTaskListener)
    })
}

initListeners()


