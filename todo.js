const taskListDom = document.querySelector('ul')
// const listElement = [...document.querySelectorAll('li')]
// const confirmTasks = [...document.getElementsByClassName('check')]
// const taskText = [...document.getElementsByClassName('todo-text')]
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
    input.addEventListener('change', inputChange);
    input.addEventListener('focus', (event) => {
        event.target.style.background = 'cyan';
    });
    input.addEventListener('blur', (event) => {
        event.target.style.background = '';
    });
    return input;
}

function taskListItem({complete, description} = {}) {
    const li = document.createElement('li');
    li.className = 'list-element';
    li.append(confirmTask(complete), taskDescription(description), deleteTaskButton())
    li.addEventListener('mouseover', highlight)
    return li;
}

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

        taskListDom.appendChild(taskListItem(task));
        
        console.log(createdTasks)

        progressFunc();
        addNewTask.value = '';
    }
}


function checkBox(e) {
    if (e.currentTarget.checked) {
        for (const task of createdTasks) {
            if (task.description === e.currentTarget.nextSibling.value) {
                task.complete = true;
            }
        }
    } else {
        for (const task of createdTasks) {
            if (task.description === e.currentTarget.nextSibling.value) {
                task.complete = false;
            }
        }
    }
    // ось так
    // for (const task of createdTasks) {
    //     if (task.description === e.currentTarget.nextSibling.value) {
    //         task.complete = e.currentTarget.checked;
    //     }
    // }

}

function inputChange(e) {
    let tasksDom = [...taskListDom.children];
    tasksDom.forEach((taskDom, i) => {
        if (e.currentTarget.parentElement === taskDom) {
            createdTasks[i].description = e.currentTarget.value;
        }
    }) 
}

function deleteTask(e) {
    let tasksDom = [...taskListDom.children];
    //якщо видалити знайдену таску, то зі створених видаляється перша --- баг
    // можливо спрацює -> переробити на createdTasks.forEach ->
    // -> e.currenttarget.child.value === task.description
    // tasksDom.forEach((taskDom, i) => {
    //     if (e.currentTarget.parentElement === taskDom) {
    //         delete createdTasks[i];
    //         createdTasks = createdTasks.filter(task => task !== undefined);
    //     }
    // }) 
    createdTasks = createdTasks.filter(task => e.currentTarget.previousElementSibling.value !== task.description && task !== undefined);
    // createdTasks.forEach((task) => {
    //     console.dir(e.currentTarget.previousElementSibling.value)
    //     if (e.currentTarget.previousElementSibling.value === task.description) {
    //         console.log(task)
    //         delete task;
    //         createdTasks = createdTasks.filter(task => task !== undefined);
    //     }
    // }) 
    e.currentTarget.parentElement.remove();
    progressFunc();
}

function searchTaskFunc() {
    // localStorage.setItem('tasks', JSON.stringify(createdTasks));

    let tasksDom = [...taskListDom.children];
    let tasksFound = createdTasks.filter(task => {
        if (task.description === addNewTask.value) {
            return true;
        }
    })

    console.log(tasksFound)

    if (tasksFound.length !== createdTasks.length) {
        for (const taskDom of tasksDom) {
            // мув в окрему функцію
            taskDom.remove();
        }
        for (const task of tasksFound) {
            if (tasksFound.length !== 0) {
                taskListDom.appendChild(taskListItem(task));
            }
        }
    }
}

function tasksRebuilding() {
    let tasksDom = [...taskListDom.children];
    if (tasksDom.length !== 0) {
        for (const taskDom of tasksDom) {
            taskDom.remove();
        }
    }
    if (createdTasks.length !== 0) {
        for (const task of createdTasks) {
            taskListDom.appendChild(taskListItem(task));
            // переробити в окремі функції а масив передавати в параметри
            //погано, бо воно перемальовує
        }
    }   
}

// function searchTimer() {
//     setTimeout(searchTaskFunc, 0);
// }

// function searchHighlight() {
//     for (const el of taskTextik) {
//         if (addNewTask.value === el.value) {
//             addNewTask.classList.add('red')
//             return
//         } else {
//             addNewTask.classList.remove('red')
//         }
//     }
// }

const progressFunc = () => {
    let progElementsDom = [...taskListDom.children];
    let taskCount = progElementsDom.length;
    if (progElementsDom.length == 0) {
        taskCount = 0;
    }
    let completeCount = 0;
    progElementsDom.forEach(el => {
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

    addNewTask.addEventListener('input', tasksRebuilding)

    // addNewTask.addEventListener('change', searchTimer)

    // addNewTask.addEventListener('input', searchHighlight)

    searchTask.addEventListener('click', searchTaskFunc)
}

initListeners()


