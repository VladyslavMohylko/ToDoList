const taskListDom = document.querySelector('ul');
const addNewTask = document.getElementById('addTask');
const searchTask = document.querySelector('#searchTask');
const progress = document.getElementById('progress');
const findMessage = document.getElementById('searchMessage');

function deleteTaskButtonDom() {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', deleteTask);
    return deleteBtn;
}

function confirmTaskDom(state = false) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check';
    checkbox.checked = state;
    checkbox.addEventListener('click', taskStatus);
    return checkbox;
}

function taskDescriptionDom(description) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'todo-text';
    input.value = description;
    input.addEventListener('change', descriptionChange);
    input.addEventListener('focus', (event) => {
        event.target.style.background = 'cyan';
    });
    input.addEventListener('blur', (event) => {
        event.target.style.background = '';
    });
    return input;
}

function taskListItemDom({complete, description} = {}) {
    const li = document.createElement('li');
    li.className = 'list-element';
    li.append(confirmTaskDom(complete), taskDescriptionDom(description), deleteTaskButtonDom())
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
        taskListDom.appendChild(taskListItemDom(task));
        localStorage.setItem('saveTasks', JSON.stringify(createdTasks));
        // let saveTasks = localStorage.setItem
        progressFunc();
        addNewTask.value = '';
    }
}


function taskStatus(e) {
    for (const task of createdTasks) {
        if (task.description === e.currentTarget.nextSibling.value) {
            task.complete = e.currentTarget.checked;
            localStorage.setItem('saveTasks', JSON.stringify(createdTasks));
        }
    }
    progressFunc();
}

function descriptionChange(e) {
    const tasksDom = [...taskListDom.children];
    tasksDom.forEach((taskDom, i) => {
        if (e.currentTarget.parentElement === taskDom) {
            if (tasksDom.length === createdTasks.length) {
                createdTasks[i].description = e.currentTarget.value;
                localStorage.setItem('saveTasks', JSON.stringify(createdTasks));
            }
        }
    }) 
}

function deleteTask(e) {
    createdTasks = createdTasks.filter(task => e.currentTarget.previousElementSibling.value !== task.description && task !== undefined);
    localStorage.setItem('saveTasks', JSON.stringify(createdTasks));
    e.currentTarget.parentElement.remove();
    progressFunc();
}

function domTasksRebuild(tasks) {
    for (const task of tasks) {
        taskListDom.appendChild(taskListItemDom(task));
    }
}

function domTasksRemove(tasks) {
    for (const taskDom of tasks) {
        taskDom.remove();
    }
}

function searchTaskFunc() {
    const tasksDom = [...taskListDom.children];
    const tasksFound = createdTasks.filter(task => task.description === addNewTask.value);
    if (tasksFound.length !== createdTasks.length || tasksFound.length === 1) {
        if (tasksFound.length !== 0) {
            findMessage.style.visibility = 'visible';
            domTasksRemove(tasksDom);
            domTasksRebuild(tasksFound);
        }
    }
}

function searchRedAlert() {
    for (const task of createdTasks) {
        if (addNewTask.value === task.description) {
            addNewTask.classList.add('red');
            return;
        } else {
            addNewTask.classList.remove('red');
        }
    }
}

function tasksRebuilding() {
    const tasksDom = [...taskListDom.children];
        domTasksRemove(tasksDom);
        domTasksRebuild(createdTasks);
}

function searchTimer() {
    setTimeout(searchTaskFunc, 0);
}

function searchAlertAndRebuilding() {
    const tasksDom = [...taskListDom.children];
    searchRedAlert();
    if (tasksDom.length !== createdTasks.length || createdTasks.length === 1) {
        for (const task of createdTasks) {
            if (task.description !== addNewTask.value) {
                findMessage.style.visibility = 'hidden';
                tasksRebuilding();
            }
        }
    }
    if (addNewTask.value !== '') {
        searchTimer();
    }
}

const progressFunc = () => {
    let taskCount = createdTasks.length;
    if (createdTasks.length == 0) {
        taskCount = 0;
    }
    let completeCount = 0;
    createdTasks.forEach(task => {
        if (task.complete === true) {
            completeCount += 1;
        }
    });
    progress.textContent = `Progress: ${completeCount} / ${taskCount}`;
}

const highlight = (e) => {
    const target = e.currentTarget;
    target.classList.add('highlight');
    target.removeEventListener('mouseover', highlight);
    target.addEventListener('mouseout', resetHighlight);
}

const resetHighlight = (e) => {
    const target = e.currentTarget;
    target.classList.remove('highlight');
    target.removeEventListener('mouseout', resetHighlight);
    target.addEventListener('mouseover', highlight);
}

function initListeners() {
    addNewTask.addEventListener('keydown', createTaskListener);

    addNewTask.addEventListener('input', searchAlertAndRebuilding);

    searchTask.addEventListener('click', searchTaskFunc);
}

initListeners();

window.addEventListener('load', () => {
    const getTasks = JSON.parse(localStorage.getItem('saveTasks'));
    console.log(getTasks);

    for (const task of getTasks) {
        createdTasks.push(task);
        taskListDom.appendChild(taskListItemDom(task));
    }

    progressFunc();
})


