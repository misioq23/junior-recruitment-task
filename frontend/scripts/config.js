const elements = {
	todoList: document.querySelector('.todo__list'),
	addBtn: document.querySelector('.todo__add-btn'),
	addInput: document.querySelector('.todo__task-input'),
};
const elementStrings = {
	completeCheckbox: 'todo__task-checkbox',
	delBtn: 'todo__del-btn',
	addBtn: 'todo__add-btn',
	taskComplete: 'todo__task--complete'
};

const setup = {
	proxy: 'https://cors-anywhere.herokuapp.com/',
	dataBaseUrl: 'https://qunabu.com/api',
};
setup.URL = `${setup.proxy}${setup.dataBaseUrl}`;
export { elements, elementStrings, setup };
