/**
 * Model to delete task from database
 * @param {string} id id of the task to be deleted from database
 * @param {string} address database URL
 */
class DeleteTask {
	constructor(id, address) {
		this.id = parseInt(id);
		this.address = address;
		this.category = 'todo';
	}

	/**
	 * Removes task Object from database
	 * @returns {Promise} promise
	 */
	deleteTask() {
		return new Promise((resolve, reject) => {
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
	};
};

export default DeleteTask;
