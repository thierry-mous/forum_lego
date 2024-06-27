const express = require('express');
const {join, dirname} = require('path');
const mysql = require('mysql');
const session = require('express-session');


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

const app = express();

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const secret = generateRandomString(32);
console.log(`Generated secret: ${secret}`);

app.use(session({
    secret : secret,
    resave : false,
    saveUninitialized : false,
    cookie : {
        secure : false,
        maxAge : 1000 * 60 * 60 * 24
    }
}));

app.use(express.urlencoded({ extended: true }));




app.use('/public/', express.static(join(__dirname, 'public')));


app.get('/', (req, res) => {
    console.log(req.session);
    res.sendFile(join(__dirname, 'templates', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'connexion.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'inscription.html'));
});

app.get('/topics', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'topics.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'profile.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'about.html'));
});

app.get('/legal', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'legalmentions.html'));
});

app.get('/createtopic', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'create_topics.html'));
});

app.get('/posts', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'posts.html'));
});

app.get('/user', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'info_change.html'));
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
