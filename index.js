const addToDoInput = document.querySelector('.toDoTitleInput');
const addToDoBtn = document.getElementById('addToDoBtn');
const toDoList = document.getElementById('toDoList');
const completeToDoList = document.getElementById('completeToDo');
const modal = document.querySelector('.editToDoWrapper');
const editBtn = document.getElementById('editToDoBtn');
const editInput = document.getElementById('editToDoTitle');
const sortToDo = document.getElementById('sortToDoIcon')
const sortDoneToDo = document.getElementById('sortDoneToDoIcon')

let list = localStorage.getItem('toDo') ? JSON.parse(localStorage.getItem('toDo')) : []
let selectedTitle = ''
let toDoSort = 'ASC'
let doneSort = 'ASC'

function changeItemStatus(item) {
    const newList = list.map((element) => {
        if(element.title === item.title) {
            return {...element, done: !element.done}
        }

        return element;
    })

    list = [...newList]
    localStorage.setItem('toDo', JSON.stringify(list))

    renderList();
}

function toggleModal(title) {
    if(modal.classList.contains('openModal')){
       return modal.classList.remove('openModal');
    }

    editInput.value = title;
    selectedTitle = title;
    return modal.classList.add('openModal');
}

function editToDo() {
    const newTitle = document.getElementById('editToDoTitle').value;

    if(list.some((item) => item.title === newTitle)) return alert('to do title should be uniq');
    if(newTitle === '' ) return alert('to do title should not be empty');
    
    
    const newList = list.map((item) => {
        if(item.title === selectedTitle){
            return {...item, title: newTitle}
        }

        return item;
    })

    list = newList;
    toggleModal();
    renderList();
}

editBtn.addEventListener('click', editToDo)


function deleteTodo(title) {
    const newList = list.filter((item) => item.title !== title);

    list = newList;
    localStorage.setItem('toDo', JSON.stringify(list));
    renderList();
}

function sortCompleteToDo() {
    doneSort = doneSort === 'ASC' ? 'DSC' : 'ASC';

    if(doneSort === 'ASC') {
        sortDoneToDo.classList.add('sortToggle')
    } else {
        sortDoneToDo.classList.remove('sortToggle')
    }

    renderList()
}

function sortIncompleteToDo() {
    toDoSort = toDoSort === 'ASC' ? 'DSC' : 'ASC';

    if(toDoSort === 'ASC') {
        sortToDo.classList.add('sortToggle')
    } else {
        sortToDo.classList.remove('sortToggle')
    }

    renderList()
}

function renderList () {
    toDoList.innerHTML = ''
    completeToDoList.innerHTML = ''

    const doneToDo = list.filter((item) => item.done).sort((a,b) => {
        if(doneSort === 'ASC') return a.title > b.title ? 1 : -1;
        return b.title > a.title ? 1 : -1;
    })
    const toDo = list.filter((item) => !item.done).sort((a,b) => {
        if(toDoSort === 'ASC') return a.title > b.title ? 1 : -1;
        return b.title > a.title ? 1 : -1;
    })

    list = [...doneToDo, ...toDo]


    list.forEach((item) => {
        const li = document.createElement('li');
        const checkBox = document.createElement('input');
        const toDoTitle = document.createElement('p');
        const editIcon = document.createElement('img');
        const deleteIcon = document.createElement('img');
        const details = document.createElement('div');
        const actions = document.createElement('div');

        details.classList.add('toDoItemElementWrapper');
        actions.classList.add('toDoItemElementWrapper');



        editIcon.src = './assets/edit-icon.png';
        editIcon.classList.add('icon');

        editIcon.addEventListener('click', (e) => {
            e.stopPropagation()
            toggleModal(item.title)
        })

        deleteIcon.src = './assets/delete-icon.png';
        deleteIcon.classList.add('icon');

        deleteIcon.addEventListener('click', (e) => {
            e.stopPropagation()
            deleteTodo(item.title)
        })

        toDoTitle.textContent = item.title;
        checkBox.type = 'checkbox';
        checkBox.checked = item.done;

        details.appendChild(checkBox);
        details.appendChild(toDoTitle);

        actions.appendChild(editIcon);
        actions.appendChild(deleteIcon);

        li.appendChild(details);
        li.appendChild(actions);
        
        li.classList.add('toDoItem');
        
        li.addEventListener('click', () => changeItemStatus(item))
        if(item.done) {
           return completeToDoList.appendChild(li)
        }

        return toDoList.appendChild(li);        
    })
}

renderList()

const addToDo = () => {
    if(list.some((item) => item.title === addToDoInput.value)) return alert('to do title should be uniq');
    if(addToDoInput.value === '' ) return alert('to do title should not be empty');

    list.push({title: addToDoInput.value, done: false})   
    localStorage.setItem('toDo', JSON.stringify(list)) 
    addToDoInput.value = ''

    renderList()
}

addToDoBtn.addEventListener('click', addToDo);

const obj = {
    titlu: 'Iulik',
    func: () => console.log('new'),
    addre: {
        aaa: {
            street: 'asd',
            
        }
    }
}

