import { elementStrings, elements } from '../config';
// Function clears every element inside todo__list
const clearList = () => {
	const range = document.createRange();
	range.selectNodeContents(elements.todoList);
	range.deleteContents();
};

// Function returns markup of one todo__task
const showTask = (task) => {
	// changes Finished string into boolean
	const taskFinished = task.Finished !== '0' ? true : false;
	return `
		<li class="todo__task ${taskFinished ? 'todo__task--complete' : ''}" data-id="${task.ID}">
			<div class="todo__task-action">
				<input class="${elementStrings.complete}" type="checkbox" id="task-${task.ID}" ${taskFinished ? 'checked' : ''}>
				<label class="todo__hidden" for="task-${task.ID}">${taskFinished ? 'Deselect the completed task:' : 'Mark it as done:'} ${task.Content}</label>
			</div>
			<h2 class="todo__task-name">${task.Content}</h2>
			<button class="${elementStrings.delBtn}" ${taskFinished ? 'disabled' : ''}>
				<span class="todo__hidden">Delete: ${task.Content}</span>
			</button>
		</li>`;
};

// Function join all todo__tasks and insert it into todo__list
const renderTasks = (tasks) => {
	const markup = tasks.map(showTask).join(' ');
	elements.todoList.insertAdjacentHTML('beforeend', markup);
};

export { renderTasks, clearList };
