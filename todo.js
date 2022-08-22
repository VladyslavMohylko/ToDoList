const taskList = document.querySelector('ul')
const listElement = [...document.querySelectorAll('li')]
const confirmTask = [...document.getElementsByClassName('check')]
const taskText = [...document.getElementsByClassName('todo-text')]
const addNewTask = document.getElementById('addTask')
const searchTask = document.querySelector('#searchTask')

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
    deleteBtn.addEventListener('click', deleteTask)
    li.addEventListener('mouseover', highlight)
    return li
}

let taskTextik = []
const createTaskListener = ({ key, target: { value } } = {}) => {
    if (key === 'Enter') {
        taskList.appendChild(createTask(value))
        taskTextik = [...taskList.querySelectorAll('LI INPUT.todo-text')]
        console.log(taskTextik)
        addNewTask.value = ''
    }
}

function deleteTask(e) { 
    e.currentTarget.parentElement.remove()
}

function searchTaskFunc() {
    taskTextik.forEach((el) => {
        if (addNewTask.value === el.value) {
            alert(`Така задача - "${el.value}" вже існує`)
            el.scrollIntoView(true)
            el.focus()
            el.addEventListener('focus', (event) => {
                event.target.style.background = 'cyan';
            });
            el.addEventListener('blur', (event) => {
                event.target.style.background = '';
            });
        }
    })
}

const highlight = (e) => {
    const target = e.currentTarget
    target.classList.add('highlight')
    target.removeEventListener('mouseover', highlight)
    target.addEventListener('mouseout', resetHighlight)
}

const resetHighlight = (e) => {
    const target = e.currentTarget
    target.classList.remove('highlight')
    target.removeEventListener('mouseout', resetHighlight)
    target.addEventListener('mouseover', highlight)
}

function initListeners() {
    addNewTask.addEventListener('keydown', createTaskListener)

    searchTask.addEventListener('click', searchTaskFunc)
}

initListeners()


