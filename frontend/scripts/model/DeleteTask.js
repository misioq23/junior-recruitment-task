class DeleteTask {
	constructor(id, address) {
		this.id = parseInt(id);
		this.address = address;
		this.category = 'todo';
	}
	deleteTask() {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('DELETE', `${this.address}/${this.category}/${this.id}`, true);
			xhr.addEventListener('load', () => {
				if (xhr.status === 200) {
					resolve(true);
				} else {
					reject(`Error: ${xhr.status}`);
				}
			});

			xhr.send();
		});
	};
};

export default DeleteTask;
