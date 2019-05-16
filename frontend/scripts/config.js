const elements = {
	todoList: document.querySelector('.todo__list'),
	addBtn: document.querySelector('.todo__add-btn'),
	addInput: document.querySelector('.todo__task-input'),
};
const elementStrings = {
	complete: 'todo__task-checkbox',
	delBtn: 'todo__del-btn',
	addBtn: 'todo__add-btn',
};

const setup = {
	proxy: 'https://cors-anywhere.herokuapp.com/',
	dataBaseUrl: 'http://localhost:3000',
};
export { elements, elementStrings, setup };
