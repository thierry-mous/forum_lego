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




const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    