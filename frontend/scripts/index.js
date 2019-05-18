import { elements, elementStrings } from './config';
import tasksControl from './controller/tasksController';
import addTaskControl from './controller/addTaskController';
import deleteTaskControl from './controller/deleteTaskController';
import completeTaskControl from './controller/completeTaskController';
tasksControl();
elements.todoList.addEventListener('click', (event) => {
	const clickedClass = event.target.classList;

	if (clickedClass.contains(elementStrings.delBtn)) {
		// delete task method
		const idTaskNumber = event.target.dataset.id;
		deleteTaskControl(idTaskNumber);

	} else if (clickedClass.contains(elementStrings.completeCheckbox)) {
		// toggle complete task method
		completeTaskControl(event.target.dataset.id, event.target.checked);
	}
});

elements.addBtn.addEventListener('click', (event) => {
	// add task method
	addTaskControl(elements.addInput.value);
	elements.addInput.value = '';
});
