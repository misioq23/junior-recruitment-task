/**
 * Model to update task data by update object
 * @param {string} id id of the task to be edited
 * @param {object} data object with updated data
 * @param {string} address database URL
 */
class UpdateTask {
	constructor(id, update, address) {
		this.id = parseInt(id);
		this.update = JSON.stringify(update);
		this.address = address;
		this.category = 'todo';
	}

	/**
	 * Updates task in database
	 * @returns {Promise<object>} promise with updated object
	 */
	updateTask() {
		return new Promise((resolve, reject) => {
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
	};
};
export default UpdateTask;
