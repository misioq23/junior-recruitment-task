import CompleteTask from '../model/CompleteTask';
import { toggleCompleteUI } from '../view/tasksView';
import { setup } from '../config';

const state = {};

const completeTaskControl = async (taskID, isTaskChecked) => {
	const updatedData = {
		Finished: isTaskChecked ? '1' : '0'
	};

	state.task = new CompleteTask(taskID, updatedData, setup.URL);

	try {
		// 1) Toggle .todo__task--complete
		toggleCompleteUI(taskID, isTaskChecked);
		// 2) Change complete in database
		await state.task.toggleComplete();
	} catch (err) {
		console.log(`Task cannot change complete state: ${err}`);
	}
};

export default completeTaskControl;
