const express = require('express');
const {join, dirname} = require('path');

const app = express();



app.use('/public/', express.static(join(__dirname, 'public')));


const { fileURLToPath } = require('url');

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'connexion.html'));
});

app.get('/sign_up', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'inscription.html'));
});

app.get('/topics', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'topics.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'profile.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(join(dirname, 'templates', 'about.html'));
});

app.get('/legal', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'legalmentions.html'));
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
