import DeleteTask from '../model/DeleteTask';
import { setup } from '../config';
import { deleteTask } from '../view/tasksView';

const state = {};

const deleteTaskControl = async (taskID) => {
	// Validate taskID
	if (taskID) {

		state.task = new DeleteTask(taskID, setup.URL);
		try {
			// 1) Delete task
			await state.task.deleteTask();
			deleteTask(taskID);
		} catch (err) {
			console.log(`Cannot delete task: ${err}`);
		}
	}
};

export default deleteTaskControl;
