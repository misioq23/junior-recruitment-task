import DeleteTask from '../model/DeleteTask';
import { deleteTask } from '../view/tasksView';
import { setup } from '../config';

const state = {};
/**
 * Controller responsible for deleting tasks by id
 * @param {number} taskID task id number
 * @return {undefined}
 */
const deleteTaskControl = async (taskID) => {
	// Validate taskID
	if (taskID) {

		state.task = new DeleteTask(setup.URL);
		try {
			// Delete task from database
			await state.task.deleteTask(taskID);
			// Delete task from DOM
			deleteTask(taskID);
		} catch (err) {
			console.log(`Cannot delete task: ${err}`);
		}
	}
};

export default deleteTaskControl;
