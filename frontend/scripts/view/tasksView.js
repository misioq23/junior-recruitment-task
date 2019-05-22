import { elements, elementStrings, API } from '../config';

/**
 * Removes content and focus from new task input and add button
 * @return {undefined}
 */
const clearAddForm = () => {
	elements.addInput.value = '';
	elements.addInput.blur();
	elements.addBtn.blur();
};

/**
 * Removes all tasks from DOM
 * @return {undefined}
 */
const clearList = () => {
	const range = document.createRange();
	range.selectNodeContents(elements.todoList);
	range.deleteContents();
};

/**
 * Finds task by id and removes it from DOM
 * @param {number} taskID task id number
 * @return {undefined}
 */
const deleteTask = (taskID) => {
	document.querySelector(`[data-id="${taskID}"]`).remove();
};

/**
 * Creates task markup
 * @param {object} task object
 * @return {string} task's markup
 */
const makeTaskMarkup = (task) => {
	const taskFinished = parseInt(task.Finished);
	return `
		<li class="todo__task ${taskFinished ? 'todo__task--complete' : ''}" data-id="${task[API.id]}">
			<div class="todo__task-action">
				<input class="${elementStrings.completeCheckbox}" data-id="${task[API.id]}" type="checkbox" id="task-${task[API.id]}" ${taskFinished ? 'checked' : ''}>
				<label class="todo__hidden" for="task-${task[API.id]}">${taskFinished ? 'Deselect the completed task:' : 'Mark it as done:'} ${task[API.content]}</label>
			</div>
			<h2 class="todo__task-name">${task[API.content]}</h2>
			<button class="${elementStrings.delBtn}" data-id="${task[API.id]}" ${taskFinished ? 'disabled' : ''}>
				<span class="todo__hidden">Delete: ${task[API.content]}</span>
			</button>
		</li>`;
};

/**
 * Iterates the tasks, making one markup string and inserts it into DOM
 * @param {array} tasks array with task objects
 * @return {undefined}
 */
const renderTasks = (tasks) => {
	const markup = tasks.map(makeTaskMarkup).join(' ');
	elements.todoList.insertAdjacentHTML('beforeend', markup);
};

/**
 * Changes task appearance by toggle taskComplete class and disabling delete button
 * @param {number} taskID id of clicked task
 * @param {boolean} isChecked whether task is completed
 * @return {undefined}
 */
const toggleCompleteUI = (taskID, isChecked) => {
	const checkedTask = document.querySelector(`[data-id="${taskID}"]`);
	const clickedDeleteBtn = document.querySelector(`button[data-id="${taskID}"]`);

	checkedTask.classList.toggle(elementStrings.taskComplete);
	if (isChecked) {
		clickedDeleteBtn.setAttribute('disabled', '');
	} else {
		clickedDeleteBtn.removeAttribute('disabled');
	}
};

export { clearAddForm, clearList, deleteTask, renderTasks, toggleCompleteUI };
