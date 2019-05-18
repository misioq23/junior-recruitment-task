import { elementStrings, elements } from '../config';

// Function clears every element inside todo__list
const clearList = () => {
	const range = document.createRange();
	range.selectNodeContents(elements.todoList);
	range.deleteContents();
};

// Function to delete only one task
const deleteTask = (id) => {
	document.querySelector(`[data-id="${id}"]`).remove();
};

// Function returns markup of one todo__task
const showTask = (task) => {
	// changes Finished string into number (can be read like boolean)
	const taskFinished = parseInt(task.Finished);
	return `
		<li class="todo__task ${taskFinished ? 'todo__task--complete' : ''}" data-id="${task.ID}">
			<div class="todo__task-action">
				<input class="${elementStrings.completeCheckbox}" data-id="${task.ID}" type="checkbox" id="task-${task.ID}" ${taskFinished ? 'checked' : ''}>
				<label class="todo__hidden" for="task-${task.ID}">${taskFinished ? 'Deselect the completed task:' : 'Mark it as done:'} ${task.Content}</label>
			</div>
			<h2 class="todo__task-name">${task.Content}</h2>
			<button class="${elementStrings.delBtn}" data-id="${task.ID}" ${taskFinished ? 'disabled' : ''}>
				<span class="todo__hidden">Delete: ${task.Content}</span>
			</button>
		</li>`;
};

// Function change task look and add disable to delete button
const toggleCompleteUI = (taskID, isChecked) => {
	document.querySelector(`[data-id="${taskID}"]`).classList.toggle(elementStrings.taskComplete);
	if (isChecked) {
		document.querySelector(`button[data-id="${taskID}"]`).setAttribute('disabled', '');
	} else {
		document.querySelector(`button[data-id="${taskID}"]`).removeAttribute('disabled');
	}
};

// Function join all todo__tasks and insert it into todo__list
const renderTasks = (tasks) => {
	const markup = tasks.map(showTask).join(' ');
	elements.todoList.insertAdjacentHTML('beforeend', markup);
};

export { renderTasks, clearList, deleteTask, toggleCompleteUI };
