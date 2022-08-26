const taskList = document.querySelector('ul')
// const listElement = [...document.querySelectorAll('li')]
// const confirmTask = [...document.getElementsByClassName('check')]
// const taskText = [...document.getElementsByClassName('todo-text')]
const addNewTask = document.getElementById('addTask')
const searchTask = document.querySelector('#searchTask')

function createTask(desc) {
    const li = document.createElement('li')
    li.className = 'list-element'
    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'todo-text'
    input.value = desc
    input.addEventListener('focus', (event) => {
        console.log('kekw:')
        event.target.style.background = 'cyan';
    });
    input.addEventListener('blur', (event) => {
        event.target.style.background = '';
    });
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
        // el.addEventListener('focusout', () => {
        //     console.dir([...taskList.children])
        //     console.log(taskList.childNodes)
        //     console.dir(taskList.children[1])
        //     if (taskList.children.style.display = 'none') {
        //         taskList.children.style.display = 'flex'
        //     } 
        // });
        if (addNewTask.value === el.value) {
            console.log(el.parentElement)
            el.parentElement.style.display = 'flex'
            el.scrollIntoView(true)
            el.focus()
            el.addEventListener('focusout', () => {
                el.parentElement.style.display = 'none'
            });
        } else el.parentElement.style.display = 'none'

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


