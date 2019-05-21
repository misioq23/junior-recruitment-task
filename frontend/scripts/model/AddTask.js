/**
 * Model to add a task to the database
 * @param {object} data task object
 * @param {string} address database URL
 */
class AddTask {
	constructor(data, address) {
		this.data = JSON.stringify(data);
		this.address = address;
		this.category = 'todos';
	}

	/**
	 * Sends task Object to database and returns ID number
	 * @returns {Promise<number>} promise with the assigned id number to the task
	 */
	postTask() {
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

			xhr.send(this.data);
		});
	};
};
export default AddTask;
