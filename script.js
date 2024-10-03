function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value;

    if (taskValue === '') return;

    const newTask = document.createElement('li');

    const checkbox = createCheckbox(false);
    const taskText = createTaskText(taskValue);
    const deleteButton = createDeleteButton();

    newTask.appendChild(checkbox);
    newTask.appendChild(taskText);
    newTask.appendChild(deleteButton);

    const taskList = document.getElementById('taskList');
    taskList.appendChild(newTask);
    saveTask(taskValue, false);
    taskInput.value = '';
}

function createCheckbox(isChecked) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.transform = "scale(1.5)";
    checkbox.style.marginRight = "15px";
    checkbox.checked = isChecked;

    checkbox.onclick = function() {
        if (this.checked) {
            this.nextSibling.style.textDecoration = 'line-through';
        } else {
            this.nextSibling.style.textDecoration = 'none';
        }
        updateTask(this.nextSibling.textContent, this.checked);
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
    deleteButton.className = "delete";
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    deleteButton.onclick = dele;
    return deleteButton;
}

function dele() {
    this.parentElement.remove();
    removeTask(this.parentElement.textContent.trim());
}

// Storage functions

function saveTask(task, isChecked) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task, isChecked });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(task, isChecked) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let updatedTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        let t = tasks[i];
        if (t.task === task) {
            // If the current task matches the task we want to update
            updatedTasks.push({ task: t.task, isChecked: isChecked });
        } else {
            // If the current task does not match, add it unchanged
            updatedTasks.push(t);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.task !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(({ task, isChecked }) => {
        const newTask = document.createElement('li');

        const checkbox = createCheckbox(isChecked);
        const taskText = createTaskText(task);
        const deleteButton = createDeleteButton();

        newTask.appendChild(checkbox);
        newTask.appendChild(taskText);
        newTask.appendChild(deleteButton);

        if (isChecked) {
            taskText.style.textDecoration = 'line-through';
        }

        taskList.appendChild(newTask);
    });
}

window.onload = displayTasks;
