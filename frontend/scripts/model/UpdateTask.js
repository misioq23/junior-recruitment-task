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
			this.id = parseInt(id);
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
	};
};
export default UpdateTask;
