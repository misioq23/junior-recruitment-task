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
			this.id = parseInt(id);
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
