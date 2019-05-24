import AddTask from '../model/AddTask';
import createInputValidator from '../view/inputValidator';
import { renderTasks, getSortNumber } from '../view/tasksView';
import { setup, API } from '../config';

const state = {};
const inputValidator = createInputValidator();

const addTaskControl = async () => {

	const taskInput = inputValidator.validate();

	if (taskInput.isTaskValid) {
		inputValidator.clearAddForm();

		const newTask = {
			[API.content]: taskInput.taskContent,
			[API.finished]: false,
			[API.sort]: getSortNumber()
		};

		state.task = new AddTask(setup.URL);
		try {
			// Posts task on serv
			await state.task.postTask(newTask);
			// Adds just granted id number to newTask object
			newTask[API.id] = state.task.response[API.id];
			// Prints new task on screen
			renderTasks([newTask]);

		} catch (err) {
			console.log(`Cannot add task: ${err}`);
		}
	} else {
		inputValidator.showError(taskInput.errorContent);
	}

};

export default addTaskControl;
