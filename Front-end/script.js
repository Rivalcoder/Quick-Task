function addTask(){

    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value;

    if (taskValue === '') return;

    const newTask = document.createElement('li');

    const checkbox = createCheckbox();
    const taskText = createTaskText(taskValue);
    const deleteButton = createDeleteButton();

    newTask.appendChild(checkbox);
    newTask.appendChild(taskText);
    newTask.appendChild(deleteButton);

    const taskList = document.getElementById('taskList');
    taskList.appendChild(newTask);
    saveTask(taskValue);
    taskInput.value = '';
}

function createCheckbox() {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.transform="scale(1.5)";
    checkbox.style.marginRight="15px";

    checkbox.onclick = function(){
        if (this.checked) {
            this.nextSibling.style.textDecoration = 'line-through';
        } else {
            this.nextSibling.style.textDecoration = 'none';
        }
    };
    return checkbox;
}

function createTaskText(taskValue) {
    const taskText = document.createElement('span');
    taskText.textContent = taskValue;
    return taskText;
}

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.className="delete"
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    deleteButton.onclick = dele ;
    return deleteButton;
}

function dele()
{
    this.parentElement.remove();
    removeTask(this.parentElement.textContent.trim());
}




//Storage using this functions



function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function displayTasks() {
    const taskList = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const newTask = document.createElement('li');

        const checkbox = createCheckbox();
        const taskText = createTaskText(task);
        const deleteButton = createDeleteButton();

        newTask.appendChild(checkbox);
        newTask.appendChild(taskText);
        newTask.appendChild(deleteButton);

        taskList.appendChild(newTask);
    });
}


window.onload = displayTasks;
