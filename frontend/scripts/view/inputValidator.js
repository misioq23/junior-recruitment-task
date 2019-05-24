import { elements, elementStrings } from '../config';
/**
 * Factory function to manage validation and popups errors
 * @returns {Object} methods
 */
const CreateInputValidator = function() {
	const scriptPattern = /[<^>]*script/g;
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
	const _showPopup = (error) => {
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
		 * Input validator. Validates: 1) non empty string 2) non script
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
				response.errorContent = 'You cannot input script code';
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

export default CreateInputValidator;
