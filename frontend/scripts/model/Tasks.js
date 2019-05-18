// Model to get object with all todos tasks
class Tasks {
	constructor(address) {
		// URL of database
		this.address = address;
		this.category = 'todos';
	}
	// Method returns Promise with JSON parsed data object or Error
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
