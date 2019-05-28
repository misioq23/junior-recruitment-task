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
				}
			});
	}
});

module.exports = db
