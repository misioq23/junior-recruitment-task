const elements = {
	todo: document.querySelector('.todo'),
	todoList: document.querySelector('.todo__list'),
	todoNewTask: document.querySelector('.todo__new-task'),
	addBtn: document.querySelector('.todo__add-btn'),
	addInput: document.querySelector('.todo__task-input'),
};
const elementStrings = {
	todoTask: 'todo__task',
	completeCheckbox: 'todo__task-checkbox',
	delBtn: 'todo__del-btn',
	addBtn: 'todo__add-btn',
	taskComplete: 'todo__task--complete',
	popup: 'popup',
	popupWrapper: 'popup__wrapper',
	popupContent: 'popup__content'
};
const API = {
	id: 'ID',
	finished: 'Finished',
	content: 'Content',
	sort: 'Sort'
};
const setup = {
	proxy: 'https://cors-anywhere.herokuapp.com/',
	dataBaseUrl: 'http://localhost:3000/api',
	dataQunabuUrl: 'https://qunabu.com/api'
};
// Qunabu database: `${setup.proxy}${setup.dataQunabuUrl}`
setup.URL = `${setup.dataBaseUrl}`;
export { elements, elementStrings, API, setup };
