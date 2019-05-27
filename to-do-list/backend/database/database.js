const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbSource = path.resolve(__dirname + '/db.sqlite');

const db = new sqlite3.Database(dbSource, (err) => {
	if (err) {
		// Cannot open database
		console.error(err.message);
		throw err
	} else {
		console.log('Connected to the SQLite database.')
		db.run(`CREATE TABLE todo (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
			Content TEXT,
            Finished INTEGER, 
            Sort INTEGER
            )`,
			(err) => {
				if (err) {
					// Table already created
				} else {
					// Table just created, creating some rows
					const insert = 'INSERT INTO todo (Content, Finished, Sort) VALUES (?,?,?)';
					db.run(insert, ['First task', 0, 1]);
					db.run(insert, ['Second task', 0, 2]);
				}
			});
	}
});

module.exports = db
