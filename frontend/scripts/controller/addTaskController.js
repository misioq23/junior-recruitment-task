import AddTask from '../model/AddTask';
import createInputValidator from '../view/inputValidator';
import { renderTasks } from '../view/tasksView';
import { setup, API } from '../config';

const state = {};
const inputValidator = createInputValidator();

const addTaskControl = async () => {

	const taskInput = inputValidator.validate();

	if (taskInput.isTaskValid) {
		inputValidator.clearAddForm();
		const newTask = {
			[API.content]: taskInput.taskContent,
			[API.finished]: '0',
			[API.sort]: `${document.querySelectorAll('.todo__task').length}`
		};

		state.task = new AddTask(setup.URL);
		try {
			// 1) Post data on serv
			await state.task.postTask(newTask);
			// 2) Print data on screen
			newTask[API.id] = state.task.response[API.id];
			renderTasks([newTask]);

		} catch (err) {
			console.log(`Cannot add task: ${err}`);
		}
	} else {
		inputValidator.showError(taskInput.errorContent);
	}

};

export default addTaskControl;
