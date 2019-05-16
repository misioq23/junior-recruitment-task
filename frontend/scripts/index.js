import { elements, elementStrings } from './config';

elements.todoList.addEventListener('click', (event) => {
	const clickedClass = event.target.classList;
	if (clickedClass.contains(elementStrings.delBtn)) {
		// delete task method
	} else if (clickedClass.contains(elementStrings.complete)) {
		// toggle complete task method
	} else if (clickedClass.contains(elementStrings.addBtn)) {
		// add task method
	}
});
