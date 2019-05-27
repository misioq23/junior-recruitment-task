const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/database.js');
const app = express();

app.use(bodyParser.json());
app.use('/to-do-list', express.static('frontend'));

// Get all tasks
app.get('/api/todos', (req, res, next) => {
	const sql = 'select * from todo'
	db.all(sql, (err, rows) => {
		if (err) {
			res.status(400).json({ 'error': err.message });
			return;
		}
		res.json({
			'todos': rows
		})
	});
});

// Get single task
app.get('/api/todo/:id', (req, res, next) => {
	const sql = 'select * from todo where id = ?'
	const params = [req.params.id]
	db.get(sql, params, (err, row) => {
		if (err) {
			res.status(400).json({ 'error': err.message });
			return;
		}
		res.json({
			'todo': [row]
		})
	});
});

// Add new task
app.post('/api/todos', (req, res) => {
	// Validate empty string
	if (req.body.Content === '') {
		const error = 'Field cannot be empty';
		res.status(400).json({ 'error': error });
		return;
	}

	const sql = 'insert into todo (Content, Finished, Sort) values (?,?,?)';
	const params = [req.body.Content, req.body.Finished, req.body.Sort];

	db.run(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ 'error': err.message });
			return;
		}
		res.json({
			'message': 'success',
			'id': this.lastID
		})
	});
});

// Delete task
app.delete('/api/todo/:id', (req, res, next) => {
	db.run('DELETE FROM todo WHERE id = ?', req.params.id, (err, result) => {
		if (err) {
			res.status(400).json({ 'error': res.message });
			return;
		}
		res.json({ 'message': 'deleted', changes: this.changes });
	});
})

// Edit task
app.patch('/api/todo/:id', (req, res, next) => {
	const data = {
		Content: req.body.Content ? req.body.Content : null,
		Finished: +req.body.Finished,
		Sort: req.body.Sort ? req.body.Sort : null
	};
	db.run('UPDATE todo SET Content = COALESCE(?,Content), Finished = COALESCE(?,Finished), Sort = COALESCE(?,Sort) WHERE id = ?',
		[data.Content, data.Finished, data.Sort, req.params.id], (err, result) => {
			if (err) {
				res.status(400).json({ 'error': res.message });
				return;
			};
			res.json({
				'message': 'success',
				changes: this.changes
			});
		});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
