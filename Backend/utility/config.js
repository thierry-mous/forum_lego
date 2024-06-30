const mysql = require('mysql');

const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'forum'
};

const connection = mysql.createConnection(dbOptions);

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
        return;
    }
    console.log('Connecté à MySQL');
});

module.exports = connection;
