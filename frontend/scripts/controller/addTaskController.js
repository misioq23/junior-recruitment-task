import AddTask from '../model/AddTask';
import { renderTasks } from '../view/tasksView';
import { setup } from '../config';

const state = {};

const addTaskControl = async (taskName) => {
	// Validate taskName
	if (taskName) {
		const newTask = {
			Content: taskName,
			Finished: '0',
			Sort: `${document.querySelectorAll('.todo__task').length}`
		};

		state.task = new AddTask(newTask, setup.URL);
		try {
			// 1) Post data on serv
			await state.task.postTask();
			// 2) Print data on screen
			newTask.ID = state.task.response.ID;
			renderTasks([newTask]);

		} catch (err) {
			console.log(`Cannot add task: ${err}`);
		}
	} else {
		alert('Field cannot be empty!');
	}

};

export default addTaskControl;
