const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'forum'
});

db.connect((err) => {
    if (err) {
       console.log(err);
    }else{
        console.log('Connected to database');
    }
});

module.exports = db;