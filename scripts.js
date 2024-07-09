let tasks = [];
let editTaskId = null;

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        const toggleCompletionButton = document.createElement('input');
        toggleCompletionButton.type = 'checkbox';
        toggleCompletionButton.checked = task.completed;
        toggleCompletionButton.onchange = () => toggleCompletion(index);

        taskItem.appendChild(toggleCompletionButton);
        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText) {
        if (editTaskId !== null) {
            tasks[editTaskId].text = taskText;
            editTaskId = null;
        } else {
            tasks.push({ text: taskText, completed: false });
        }
        taskInput.value = '';
        renderTasks();
    }
}

function editTask(index) {
    const taskInput = document.getElementById('new-task');
    taskInput.value = tasks[index].text;
    editTaskId = index;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

document.addEventListener('DOMContentLoaded', renderTasks);
