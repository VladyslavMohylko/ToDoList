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

function saveToStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
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
        saveToStorage('saveTasks', createdTasks);
        addNewTask.value = '';
        createAfterMatch();
        progressFunc();
    }
}

function createAfterMatch() {
    const tasksDom = [...taskListDom.children];
    findMessage.style.visibility = 'hidden';
    searchYellowAlert();
    searchRedAlert();
    if (createdTasks.length !== tasksDom.length) {
        domTasksRemove(tasksDom);
        domTasksRebuild(createdTasks);
    }
}

function taskStatus(e) {
    for (const task of createdTasks) {
        if (task.description === e.currentTarget.nextSibling.value) {
            task.complete = e.currentTarget.checked;
            saveToStorage('saveTasks', createdTasks);
        }
    }
    progressFunc();
}

function descriptionChange(e) {
    const tasksDom = [...taskListDom.children];
    if (tasksDom.length === createdTasks.length) {
        tasksDom.forEach((taskDom, i) => {
            if (e.currentTarget.parentElement === taskDom) {
                createdTasks[i].description = e.currentTarget.value;
                saveToStorage('saveTasks', createdTasks);
                return;
            }
        });
    } else {
        const tasksFoundFilter = createdTasks.filter(task => {
            if (task.description.match(addNewTask.value)) {
                return true;
            }
        });

        tasksDom.forEach((taskDom, index) => {
            if (e.currentTarget.parentElement === taskDom) {
                for (const task of createdTasks) {
                    if (tasksFoundFilter[index].description === task.description) {
                        task.description = e.currentTarget.value;
                        saveToStorage('saveTasks', createdTasks);
                        return;
                    }
                }
            }
        });
    }
}

function deleteTask(e) {
    createdTasks = createdTasks.filter(task => e.currentTarget.previousElementSibling.value !== task.description && task !== undefined);
    saveToStorage('saveTasks', createdTasks);
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
    const tasksFound = createdTasks.filter(task => task.description.match(addNewTask.value));
    if (tasksFound.length !== 0) {
        findMessage.style.visibility = 'visible';
        domTasksRemove(tasksDom);
        domTasksRebuild(tasksFound);
    }
    if (tasksFound.length === 0 || addNewTask.value === '') {
        findMessage.style.visibility = 'hidden';
        tasksRebuildingAfterSearching();
    }
}

function searchRedAlert() {
    addNewTask.classList.remove('red');
    for (const task of createdTasks) {
        if (addNewTask.value === task.description) {
            addNewTask.classList.add('red');
            return;
        } 
    }
}

function searchYellowAlert() {
    addNewTask.classList.remove('yellow');
    for (const task of createdTasks) {
        if (task.description.match(addNewTask.value) && addNewTask.value !== '') {
            addNewTask.classList.add('yellow');
            return;
        } 
    }
}

function tasksRebuildingAfterSearching() {
    const tasksDom = [...taskListDom.children];
        domTasksRemove(tasksDom);
        domTasksRebuild(createdTasks);
}

function searchTimer() {
    setTimeout(searchTaskFunc, 0);
}

function searchAlertAndRebuilding() {
    searchYellowAlert();

    searchRedAlert();
    
    searchTimer();
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

    if (getTasks !== null) {
        for (const task of getTasks) {
            createdTasks.push(task);
            taskListDom.appendChild(taskListItemDom(task));
        }
    }
    progressFunc();
});

