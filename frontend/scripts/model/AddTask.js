class AddTask {
	constructor(data, address) {
		this.data = JSON.stringify(data);
		this.address = address;
		this.category = 'todos';
	}

	postTask() {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', `${this.address}/${this.category}`, true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.addEventListener('load', () => {
				if (xhr.status === 200) {
					// response with given ID
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
