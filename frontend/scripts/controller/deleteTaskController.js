import DeleteTask from '../model/DeleteTask';
import { deleteTask } from '../view/tasksView';
import { setup } from '../config';

const state = {};

const deleteTaskControl = async (taskID) => {
	// Validate taskID
	if (taskID) {

		state.task = new DeleteTask(setup.URL);
		try {
			// 1) Delete task
			await state.task.deleteTask(taskID);
			deleteTask(taskID);
		} catch (err) {
			console.log(`Cannot delete task: ${err}`);
		}
	}
};

export default deleteTaskControl;
