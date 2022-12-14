const slides = document.querySelectorAll('.slide')

for (const slide of slides) {
    slide.addEventListener('click', () => {
        clearActiveClasses()

        slide.classList.add('active')
    })
}


function clearActiveClasses () {
    slides.forEach((slide) => {
        slide.classList.remove('active')
    })
}


const tasksListElement = document.querySelector('.tasks_list')
const taskElements = tasksListElement.querySelectorAll('.task_item')

for (const task of taskElements){
    task.draggable = true
}

tasksListElement.addEventListener('dragstart', (evt) => {
    evt.target.classList.add('selected')
})

tasksListElement.addEventListener('dragend', (evt) => {
    evt.target.classList.remove('selected')
})

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect()
    const currentElementCenter = currentElementCoord.y+currentElementCoord.height/2

    const nextElement = (cursorPosition < currentElementCenter) ? currentElement : currentElement.nextElementSibling

    return nextElement
}

tasksListElement.addEventListener('dragover', (evt) => {
    evt.preventDefault()

    const activeElement = tasksListElement.querySelector('.selected')
    const currentElement = evt.target
    const isMoveable = activeElement !== currentElement && currentElement.classList.contains('tasks_item')

    if(!isMoveable) {
        return
    }

    const nextElement = getNextElement(evt.clientY, currentElement)

    if (nextElement && activeElement === nextElement.previousElementSibiling || activeElement === nextElement ) {
        return
    }

    tasksListElement.insertBefore(activeElement, nextElement)
})

