import { elements, elementStrings } from './config';
import tasksControl from './controller/tasksController';
import addTaskControl from './controller/addTaskController';
import deleteTaskControl from './controller/deleteTaskController';
import completeTaskControl from './controller/completeTaskController';

tasksControl();

elements.todo.addEventListener('click', (event) => {
	const clickedClass = event.target.classList;

	// toggle complete task
	if (clickedClass.contains(elementStrings.completeCheckbox)) {
		completeTaskControl(event.target.dataset.id, event.target.checked);
	}

	// delete task
	if (clickedClass.contains(elementStrings.delBtn)) {
		deleteTaskControl(event.target.dataset.id);
	}

	// add task
	if (clickedClass.contains(elementStrings.addBtn)) {
		event.preventDefault();
		addTaskControl();
	}
});
