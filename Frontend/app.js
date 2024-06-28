const express = require('express');
const {join, dirname} = require('path');
const mysql = require('mysql');
const session = require('express-session');



const app = express();



//Gérer les routes


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
