import UpdateTask from '../model/UpdateTask';
import { toggleCompleteUI } from '../view/tasksView';
import { setup, API } from '../config';

const state = {};
/**
 * Controller responsible for toggle task's finish state
 * @param {number} taskID task id number
 * @param {boolean} isTaskChecked shows if 'input complete check' is active
 * @return {undefined}
 */
const completeTaskControl = async (taskID, isTaskChecked) => {
	const updatedData = {
		[API.finished]: isTaskChecked
	};

	state.task = new UpdateTask(setup.URL);

	try {
		// Toggle .todo__task--complete
		toggleCompleteUI(taskID, isTaskChecked);
		// Change complete in database
		await state.task.updateTask(taskID, updatedData);

	} catch (err) {
		console.log(`Task cannot change complete state: ${err}`);
	}
};

export default completeTaskControl;
