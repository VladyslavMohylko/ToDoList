const taskList = document.querySelector('ul')
const listElement = [...document.querySelectorAll('li')]
const confirmTasks = [...document.getElementsByClassName('check')]
const taskText = [...document.getElementsByClassName('todo-text')]
const addNewTask = document.getElementById('addTask')
const searchTask = document.querySelector('#searchTask')
const progress = document.getElementById('progress')
const findMessage = document.getElementById('searchMessage')

function deleteTaskButton() {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', deleteTask);
    return deleteBtn;
}

function confirmTask(state = false) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check';
    checkbox.checked = state;
    checkbox.addEventListener('click', progressFunc);
    checkbox.addEventListener('click', checkBox);
    return checkbox;
}

function taskDescription(description) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'todo-text';
    input.value = description;
    input.addEventListener('focus', (event) => {
        event.target.style.background = 'cyan';
    });
    input.addEventListener('blur', (event) => {
        event.target.style.background = '';
    });

    // let task = {};
    // task.description = input.value;
    // createdTasks.push(task);

    return input;
}

function taskListItem({complete, description} = {}) {
    const li = document.createElement('li');
    li.className = 'list-element';
    li.append(confirmTask(complete), taskDescription(description), deleteTaskButton())
    li.addEventListener('mouseover', highlight)
    return li;
}
/*
task: {
    complete: true/false,
    description: 'dsadsadsa',
    dateComplete: data,
}
*/

let createdTasks = [];

const createTaskListener = ({ key, target: { value } } = {}) => {
    if (key === 'Enter' && addNewTask.value !== '') {
        for (const task of createdTasks) {
            if (addNewTask.value === task.description) {
                return;
            }
        }
        const task = {
            description: value,
            complete: false,
        };
        createdTasks.push(task);

        taskList.appendChild(taskListItem(task))
        
        console.log(createdTasks)

        progressFunc();
        addNewTask.value = '';
    }
}


function checkBox(e) {
    if (e.currentTarget.checked) {
        for (const el of createdTasks) {
            if (el.description === e.currentTarget.nextSibling.value) {
                el.complete = true;
            }
        }
    } else {
        for (const el of createdTasks) {
            if (el.description === e.currentTarget.nextSibling.value) {
                el.complete = false;
            }
        }
    }
    
    /* 
    1. знайти масив дом-лішок
    2. вішаю івентлістенер 
    3. через каренттаргет знаходжу велью
    4. порівнюю велю із масивом 
    5. тому елементу
    */


}

function deleteTask(e) {
    e.currentTarget.parentElement.remove()
    progressFunc()
}

function searchTaskFunc() {
    localStorage.setItem('tasks', JSON.stringify(createdTasks));
    let foundTask = createdTasks.filter(function(task) {
        if (addNewTask.value === task.childNodes[1].value) {
            return task;
        }
    });

    taskList.append(foundTask[0]);


    // for (let i of foundTask) {
    //     taskList.innerHTML = i;
    // }

    // for (const el of taskTextik) {
    //     if (addNewTask.value === el.value) {
    //         console.log(el.parentElement)
    //         findMessage.style.opacity = 1;
    //         Array.from(taskList.children).forEach((childEl) => {
    //             childEl.style.display = 'none'
    //         })
    //         el.parentElement.style.display = 'flex'
    //         el.focus()
    //         el.addEventListener('focusout', () => {
    //             findMessage.style.opacity = 0;
    //             Array.from(taskList.children).forEach((childEl) => {
    //             childEl.style.display = 'flex'
    //             })
    //         })
    //     } 
    // }
}

// function searchTimer() {
//     setTimeout(searchTaskFunc, 0);
// }

function searchHighlight() {
    // for (const el of taskTextik) {
    //     if (addNewTask.value === el.value) {
    //         addNewTask.classList.add('red')
    //         return
    //     } else {
    //         addNewTask.classList.remove('red')
    //     }
    // }
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

    // addNewTask.addEventListener('change', searchTimer)

    addNewTask.addEventListener('input', searchHighlight)

    searchTask.addEventListener('click', searchTaskFunc)
}

initListeners()


