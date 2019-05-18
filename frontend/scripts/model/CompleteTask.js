class CompleteTask {
	constructor(id, isChecked, address) {
		this.id = parseInt(id);
		this.finished = JSON.stringify({ Finished: isChecked ? '1' : '0' });
		this.address = address;
		this.category = 'todo';
	}

	toggleComplete() {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('PATCH', `${this.address}/${this.category}/${this.id}`, true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.addEventListener('load', () => {
				if (xhr.status === 200) {
					// response with updated task
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
