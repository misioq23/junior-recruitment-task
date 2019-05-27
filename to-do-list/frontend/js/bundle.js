(function () {
	'use strict';

	const elements = {
	  todo: document.querySelector('.todo'),
	  todoList: document.querySelector('.todo__list'),
	  todoNewTask: document.querySelector('.todo__new-task'),
	  addBtn: document.querySelector('.todo__add-btn'),
	  addInput: document.querySelector('.todo__task-input')
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
	  dataBaseUrl: 'https://qunabu.com/api'
	};
	setup.URL = `${setup.proxy}${setup.dataBaseUrl}`;

	/**
	 * Model to get array from database with all todo tasks
	 * @class
	 * @param {string} address database URL
	 */
	class Tasks {
	  constructor(address) {
	    this.address = address;
	    this.category = 'todos';
	  }
	  /**
	   * Returns from database array with all todo tasks
	   * @returns {Promise<array>} promise with the todo tasks array
	   */


	  getTasks() {
	    return new Promise((resolve, reject) => {
	      const xhr = new XMLHttpRequest();
	      xhr.open('GET', `${this.address}/${this.category}`, true);
	      xhr.addEventListener('load', () => {
	        if (xhr.status === 200) {
	          const data = JSON.parse(xhr.responseText);
	          resolve(this.result = data);
	        } else {
	          reject(`Error: ${xhr.status}`);
	        }
	      });
	      xhr.send();
	    });
	  }

	}

	/**
	 * Removes all tasks from DOM
	 * @return {undefined}
	 */

	const clearList = () => {
	  const range = document.createRange();
	  range.selectNodeContents(elements.todoList);
	  range.deleteContents();
	};
	/**
	 * Finds task by id and removes it from DOM
	 * @param {number} taskID task id number
	 * @return {undefined}
	 */


	const deleteTask = taskID => {
	  document.querySelector(`[data-id="${taskID}"]`).remove();
	};
	/**
	 * Creates task markup
	 * @param {object} task object
	 * @return {string} task's markup
	 */


	const _makeTaskMarkup = task => {
	  const taskFinished = parseInt(task.Finished, 10);
	  return `
		<li class="todo__task ${taskFinished ? 'todo__task--complete' : ''}" data-id="${task[API.id]}" data-sort="${task[API.sort]}">
			<div class="todo__task-action">
				<input class="${elementStrings.completeCheckbox}" data-id="${task[API.id]}" type="checkbox" id="task-${task[API.id]}" ${taskFinished ? 'checked' : ''}>
				<label class="todo__hidden" for="task-${task[API.id]}">${taskFinished ? 'Deselect the completed task:' : 'Mark it as done:'} ${task[API.content]}</label>
			</div>
			<h2 class="todo__task-name">${task[API.content]}</h2>
			<button class="${elementStrings.delBtn}" data-id="${task[API.id]}" ${taskFinished ? 'disabled' : ''}>
				<span class="todo__hidden">Delete: ${task[API.content]}</span>
			</button>
		</li>`;
	};
	/**
	 * Iterates the tasks, making one markup string and inserts it into DOM
	 * @param {array} tasks array with task objects
	 * @return {undefined}
	 */


	const renderTasks = tasks => {
	  const markup = tasks.map(_makeTaskMarkup).join(' ');
	  elements.todoList.insertAdjacentHTML('beforeend', markup);
	};
	/**
	 * Changes task appearance by toggle taskComplete class and disabling delete button
	 * @param {number} taskID id of clicked task
	 * @param {boolean} isChecked whether task is completed
	 * @return {undefined}
	 */


	const toggleCompleteUI = (taskID, isChecked) => {
	  const checkedTask = document.querySelector(`[data-id="${taskID}"]`);
	  const clickedDeleteBtn = document.querySelector(`button[data-id="${taskID}"]`);
	  checkedTask.classList.toggle(elementStrings.taskComplete);

	  if (isChecked) {
	    clickedDeleteBtn.setAttribute('disabled', '');
	  } else {
	    clickedDeleteBtn.removeAttribute('disabled');
	  }
	};
	/**
	 * Checks last task sort number and increments it for next task
	 * @return {number} sort number for new task
	 */


	const getSortNumber = () => {
	  const tasks = document.querySelectorAll(`.${elementStrings.todoTask}`);
	  const lastTaskNumber = tasks.length; // if there's no tasks return 1

	  if (!lastTaskNumber) {
	    return 1;
	  }

	  const lastTaskSortNumber = parseInt(tasks[lastTaskNumber - 1].dataset.sort, 10);
	  return lastTaskSortNumber + 1;
	};

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
	    clearList(); // Get data from serv

	    await state.tasks.getTasks(); // Print data on screen

	    renderTasks(state.tasks.result.todos);
	  } catch (err) {
	    console.log(`Tasks can't be rendered: ${err}`);
	  }
	};

	/**
	 * Model to add a task to the database
	 * @class
	 * @param {string} address database URL
	 */
	class AddTask {
	  constructor(address) {
	    this.address = address;
	    this.category = 'todos';
	  }
	  /**
	   * Sends task Object to database and returns ID number
	   * @param {object} data task object
	   * @return {Promise<number>} promise with the assigned id number to the task
	   */


	  postTask(data) {
	    return new Promise((resolve, reject) => {
	      const xhr = new XMLHttpRequest();
	      xhr.open('POST', `${this.address}/${this.category}`, true);
	      xhr.setRequestHeader('Content-Type', 'application/json');
	      xhr.addEventListener('load', () => {
	        if (xhr.status === 200) {
	          const response = JSON.parse(xhr.responseText);
	          resolve(this.response = response);
	        } else {
	          reject(`Error: ${xhr.status}`);
	        }
	      });
	      this.data = JSON.stringify(data);
	      xhr.send(this.data);
	    });
	  }

	}

	/**
	 * Factory function to manage validation and popups errors
	 * @returns {Object} methods
	 */

	const CreateInputValidator = function () {
	  const scriptPattern = /<[^>]*>/g;
	  const state = {
	    error: '',
	    isPopupActive: false
	  };
	  /**
	   * Removes blur eventListener from 'add new task input' and popup element from DOM
	   * @memberof CreateInputValidator
	   * @returns {undefined}
	   */

	  const _removePopup = () => {
	    state.error = '';
	    state.isPopupActive = false;
	    document.querySelector(`.${elementStrings.popup}`).remove();
	    elements.addInput.removeEventListener('blur', _removePopup);
	  };
	  /**
	   * Adds to DOM popup element with error text and also adds blur eventListener to 'add new task input'
	   * @memberof CreateInputValidator
	   * @param {string} error popup alert content
	   * @returns {undefined}
	   */


	  const _showPopup = error => {
	    const popupMarkup = `
			<div class="${elementStrings.popup}">
				<div class="${elementStrings.popupWrapper}">
					<p class="${elementStrings.popupContent}">${error}</p>
				</div>
			</div>`;
	    state.isPopupActive = true;
	    elements.todoNewTask.insertAdjacentHTML('beforeend', popupMarkup);
	    elements.addInput.addEventListener('blur', _removePopup);
	  };

	  return {
	    /**
	     * Deletes the entered input value and removes focus from button and inuput
	     * @instance
	     * @method clearAddForm
	     * @memberof CreateInputValidator
	     * @returns {undefined}
	     */
	    clearAddForm() {
	      elements.addInput.value = '';
	      elements.addInput.blur();
	      elements.addBtn.blur();
	    },

	    /**
	     * Input validator. Validates: 1) non empty string 2) no html tags
	     * @instance
	     * @method validate
	     * @memberof CreateInputValidator
	     * @returns {{isTaskValid: boolean, taskContent: string, errorContent: string}} isTaskValid: returns whether task is valid; taskContent: input value; errorContent: if input is invalid there is error
	     */
	    validate() {
	      const response = {
	        isTaskValid: true,
	        taskContent: elements.addInput.value
	      };

	      if (elements.addInput.validity.valueMissing) {
	        response.isTaskValid = false;
	        response.errorContent = 'Please fill out this field.';
	      }

	      if (response.taskContent.match(scriptPattern)) {
	        response.isTaskValid = false;
	        response.errorContent = 'No html tags allowed';
	      }

	      return response;
	    },

	    /**
	     * Shows popup error
	     * @instance
	     * @method showError
	     * @memberof CreateInputValidator
	     * @param {string} error text to show in popup
	     * @returns {undefined}
	     */
	    showError(error) {
	      if (error !== state.error) {
	        if (state.isPopupActive) {
	          _removePopup();
	        }

	        _showPopup(error);
	      }
	    }

	  };
	};

	const state$1 = {};
	const inputValidator = CreateInputValidator();
	/**
	 * Controller responsible for creating and adding new tasks
	 * @return {undefined}
	 */

	const addTaskControl = async () => {
	  const taskInput = inputValidator.validate();

	  if (taskInput.isTaskValid) {
	    inputValidator.clearAddForm();
	    const newTask = {
	      [API.content]: taskInput.taskContent,
	      [API.finished]: false,
	      [API.sort]: getSortNumber()
	    };
	    state$1.task = new AddTask(setup.URL);

	    try {
	      // Posts task on serv
	      await state$1.task.postTask(newTask); // Adds just granted id number to newTask object

	      newTask[API.id] = state$1.task.response[API.id]; // Prints new task on screen

	      renderTasks([newTask]);
	    } catch (err) {
	      console.log(`Cannot add task: ${err}`);
	    }
	  } else {
	    inputValidator.showError(taskInput.errorContent);
	  }
	};

	/**
	 * Model to delete task from database.
	 * @class
	 * @param {string} address database URL
	 */
	class DeleteTask {
	  constructor(address) {
	    this.address = address;
	    this.category = 'todo';
	  }
	  /**
	   * Removes task Object from database
	   * @param {string} id id of the task to be deleted from database
	   * @return {Promise} promise
	   */


	  deleteTask(id) {
	    return new Promise((resolve, reject) => {
	      this.id = id;
	      const xhr = new XMLHttpRequest();
	      xhr.open('DELETE', `${this.address}/${this.category}/${this.id}`, true);
	      xhr.addEventListener('load', () => {
	        if (xhr.status === 200) {
	          resolve('done');
	        } else {
	          reject(`Error: ${xhr.status}`);
	        }
	      });
	      xhr.send();
	    });
	  }

	}

	const state$2 = {};
	/**
	 * Controller responsible for deleting tasks by id
	 * @param {number} taskID task id number
	 * @return {undefined}
	 */

	const deleteTaskControl = async taskID => {
	  // Validate taskID
	  if (taskID) {
	    state$2.task = new DeleteTask(setup.URL);

	    try {
	      // Delete task from database
	      await state$2.task.deleteTask(taskID); // Delete task from DOM

	      deleteTask(taskID);
	    } catch (err) {
	      console.log(`Cannot delete task: ${err}`);
	    }
	  }
	};

	/**
	 * Model to update task data by update object
	 * @class
	 * @param {string} address database URL
	 */
	class UpdateTask {
	  constructor(address) {
	    this.address = address;
	    this.category = 'todo';
	  }
	  /**
	   * Updates task in database
	   * @param {string} id id of the task to be edited
	  	 * @param {object} update data object with updated data
	   * @return {Promise<object>} promise with updated object
	   */


	  updateTask(id, update) {
	    return new Promise((resolve, reject) => {
	      this.id = id;
	      this.update = JSON.stringify(update);
	      const xhr = new XMLHttpRequest();
	      xhr.open('PATCH', `${this.address}/${this.category}/${this.id}`, true);
	      xhr.setRequestHeader('Content-Type', 'application/json');
	      xhr.addEventListener('load', () => {
	        if (xhr.status === 200) {
	          const response = JSON.parse(xhr.responseText);
	          resolve(this.response = response);
	        } else {
	          reject(`Error: ${xhr.status}`);
	        }
	      });
	      xhr.send(this.update);
	    });
	  }

	}

	const state$3 = {};
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
	  state$3.task = new UpdateTask(setup.URL);

	  try {
	    // Toggle .todo__task--complete
	    toggleCompleteUI(taskID, isTaskChecked); // Change complete in database

	    await state$3.task.updateTask(taskID, updatedData);
	  } catch (err) {
	    console.log(`Task cannot change complete state: ${err}`);
	  }
	};

	tasksControl();
	/**
	 * Main eventListener controller for finishing, deleting and adding tasks
	 * @return {undefined}
	 */

	elements.todo.addEventListener('click', event => {
	  const clickedClass = event.target.classList; // toggle complete task

	  if (clickedClass.contains(elementStrings.completeCheckbox)) {
	    completeTaskControl(event.target.dataset.id, event.target.checked);
	  } // delete task


	  if (clickedClass.contains(elementStrings.delBtn)) {
	    deleteTaskControl(event.target.dataset.id);
	  } // add task


	  if (clickedClass.contains(elementStrings.addBtn)) {
	    event.preventDefault();
	    addTaskControl();
	  }
	});

}());
