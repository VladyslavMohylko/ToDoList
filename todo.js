const removeTask = document.getElementById('removeListEl')
const addTask = document.getElementById('addListEl')
const taskList = document.querySelector('ul')
const listElement = [...document.querySelectorAll('li')]
const confirmTask = [...document.getElementsByClassName('check')]
const taskText = [...document.getElementsByClassName('todo-text')]

addTask.addEventListener('click', (e) => {
    const c = taskList.insertAdjacentHTML('beforeend' , '<li class="list-element"><input class="check" type="checkbox"><input class="todo-text" type="text"></li>')
    listElement.push(c)

    // через клон (працює погано)
    // const elem = taskList.querySelector('li')
    // const clone = elem.cloneNode(true)
    // const c = taskList.appendChild(clone)
    // listElement.push(c)
})
removeTask.addEventListener('click', (e) => {
    taskList.lastElementChild.remove()
})

// як не срачка, то пердячка... підсвічує нові задачі, але повернувся баг із кривою підсвіткою
// і не працюють галочки-прапорці
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

taskList.addEventListener('mouseover', highlight)

// полагодив баг підсвітки, але не підсвічує нові задачі
// listElement.forEach((el) => {
//     el.addEventListener('mouseover', (e) => {
//         e.currentTarget.classList.add('highlight')
//     })
//     el.addEventListener('mouseout', (e) => {
//         e.currentTarget.classList.remove('highlight')
//     })
// })

taskText.forEach((el) => {
    el.addEventListener('input', (e) => {
        e.currentTarget.classList.add('yellow')
        console.dir(e.currentTarget)
        if (e.currentTarget.value === '') {
            e.currentTarget.classList.remove('yellow')
        }
    })
})

confirmTask.forEach((el) => {
    el.addEventListener('click', (e) => {
        console.log(el)
        if (el.nextElementSibling.value === '') {
            el.nextElementSibling.classList.toggle('red')
            el.parentElement.classList.toggle('red')
        } else {
            el.nextElementSibling.classList.toggle('green')
            el.parentElement.classList.toggle('green')
        }
    })
})
