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
	};
};
export default AddTask;
