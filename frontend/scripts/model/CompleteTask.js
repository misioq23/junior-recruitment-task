/**
 * Model to change task's finished value in database
 * @param {string} id id of the task to be edited
 * @param {object} data object with updated data
 * @param {string} address database URL
 */
class CompleteTask {
	constructor(id, data, address) {
		this.id = parseInt(id);
		this.finished = JSON.stringify(data);
		this.address = address;
		this.category = 'todo';
	}

	/**
	 * Overwrites task.Finished value in database
	 * @returns {Promise<object>} promise with updated object
	 */
	toggleComplete() {
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

			xhr.send(this.finished);
		});
	};
};
export default CompleteTask;
