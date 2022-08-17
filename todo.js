const header = document.querySelector('h1')
const ul = document.querySelector('ul')
const li = [...document.querySelectorAll('li')]
const check = [...document.getElementsByClassName('check')]
const text = [...document.getElementsByClassName('todo-text')]

header.addEventListener('click', (e) => {
    header.classList.toggle('white')
})

li.forEach((el) => {
    el.addEventListener('mouseover', (e) => {
        console.dir(e.target)
        e.target.classList.add('highlight')

    }, true)
    el.addEventListener('mouseout', (e) => {
        console.dir(e.target)
        e.target.classList.remove('highlight')
    }, true)
})



// ul.addEventListener('mouseover', (e) => {
//     console.dir(e.target)
//     if (e.target.tagName === "LI") {
//         console.log('good')
//         e.target.classList.add('highlight')
//     }
// })

// ul.addEventListener('mouseout', (e) => {
//     console.dir(e.target)
//     if (e.target.tagName === "LI") {
//         console.log('good')
//         e.target.classList.remove('highlight')
//     }
// })

text.forEach((el) => {
    // check.textContent = 'dsa'
    el.addEventListener('input', (e) => {
        el.classList.add('yellow')
        console.log(el)
        if (el.value === '') {
            el.classList.remove('yellow')
        }
    })
})

check.forEach((el) => {
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
