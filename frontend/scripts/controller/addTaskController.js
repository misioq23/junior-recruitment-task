import AddTask from '../model/AddTask';
import { renderTasks, clearAddForm } from '../view/tasksView';
import { setup, API } from '../config';

const state = {};

const addTaskControl = async (taskName) => {
	// Validate taskName
	if (taskName) {
		const newTask = {
			[API.content]: taskName,
			[API.finished]: '0',
			[API.sort]: `${document.querySelectorAll('.todo__task').length}`
		};

		state.task = new AddTask(newTask, setup.URL);
		try {
			// 1) Post data on serv
			await state.task.postTask();
			// 2) Print data on screen
			newTask[API.id] = state.task.response[API.id];
			renderTasks([newTask]);

			clearAddForm();

		} catch (err) {
			console.log(`Cannot add task: ${err}`);
		}
	} else {
		alert('Field cannot be empty!');
	}

};

export default addTaskControl;
