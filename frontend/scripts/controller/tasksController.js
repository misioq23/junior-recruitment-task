import Tasks from '../model/Tasks';
import { renderTasks, clearList } from '../view/tasksView';
import { setup } from '../config';

const state = {};
/**
 * Controller responsible for showing all tasks
 * @param {number} taskID task id number
 * @return {undefined}
 */
const tasksControl = async () => {
	state.tasks = new Tasks(setup.URL);

	try {
		// Clear UI
		clearList();
		// Get data from serv
		await state.tasks.getTasks();
		// Print data on screen
		renderTasks(state.tasks.result.todos);

	} catch (err) {
		console.log(`Tasks can't be rendered: ${err}`);
	}
};

export default tasksControl;
