import Tasks from '../model/Tasks';
import { renderTasks, clearList } from '../view/tasksView';
import { setup } from '../config';

const state = {};

const tasksControl = async () => {
	state.tasks = new Tasks(setup.URL);

	try {
		// 1) Clear UI
		clearList();
		// 2) Get data from serv
		await state.tasks.getTasks();
		// 3) Print data on screen
		renderTasks(state.tasks.result.todos);

	} catch (err) {
		console.log(`Tasks can't be rendered: ${err}`);
	}
};

export default tasksControl;
