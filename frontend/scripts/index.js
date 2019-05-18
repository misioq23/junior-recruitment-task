import { elements, elementStrings } from './config';
import tasksControl from './controller/tasksController';
import addTaskControl from './controller/addTaskController';
tasksControl();
elements.todoList.addEventListener('click', (event) => {
	const clickedClass = event.target.classList;

	if (clickedClass.contains(elementStrings.delBtn)) {
		// delete task method
	} else if (clickedClass.contains(elementStrings.complete)) {
		// toggle complete task method
	}
});

elements.addBtn.addEventListener('click', (event) => {
	// add task method
	addTaskControl(elements.addInput.value);
	elements.addInput.value = '';
});
