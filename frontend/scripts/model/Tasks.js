/**
 * Model to get array from database with all todo tasks
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
	};
};

export default Tasks;
