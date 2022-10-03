const taskList = document.querySelector('ul')
const listElement = [...document.querySelectorAll('li')]
const confirmTask = [...document.getElementsByClassName('check')]
const taskText = [...document.getElementsByClassName('todo-text')]
const addNewTask = document.getElementById('addTask')
const searchTask = document.querySelector('#searchTask')
const progress = document.getElementById('progress')

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
    checkbox.addEventListener('click', progressFunc)
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
    if (key === 'Enter' && addNewTask.value !== '') {
        for (const task of taskTextik) {
            if (addNewTask.value === task.value) {
                return;
            }
        }
        taskList.appendChild(createTask(value))
        taskTextik = [...taskList.querySelectorAll('LI INPUT.todo-text')]
        console.log(taskTextik.value)
        progressFunc();
        addNewTask.value = '';
    }
}

function deleteTask(e) {
    e.currentTarget.parentElement.remove()
    progressFunc()
}

function searchTaskFunc() {
    for (const el of taskTextik) {
        if (addNewTask.value === el.value) {
            console.log(el.parentElement)
            Array.from(taskList.children).forEach((childEl) => {
                childEl.style.display = 'none'
            })
            el.parentElement.style.display = 'flex'
            el.focus()
            el.addEventListener('focusout', () => {
                Array.from(taskList.children).forEach((childEl) => {
                childEl.style.display = 'flex'
                })
            })
        } 
        // else {
        //     старий код
        //     el.parentElement.style.display = 'none'
        //     addNewTask.addEventListener('click', () => {
        //         el.parentElement.style.display = 'flex'
        //     })
        // } 
      }
}

function searchTimer() {
    setTimeout(searchTaskFunc, 2000);
}

const progressFunc = () => {
    let progElements = [...taskList.children];
    let taskCount = progElements.length;
    if (progElements.length == 0) {
        taskCount = 0;
    }
    let completeCount = 0;
    progElements.forEach(el => {
        if (el.children[0].checked) {
            completeCount += 1;
        }
    });
    progress.textContent = `Progress: ${completeCount} / ${taskCount}`;
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

    addNewTask.addEventListener('change', searchTimer)

    searchTask.addEventListener('click', searchTaskFunc)
}

initListeners()


