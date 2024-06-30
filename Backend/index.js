const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topics_route');
const postRoutes = require('./routes/post_route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api', postRoutes);

app.get('/logout', (req, res) => {
  res.clearCookie('jwtToken');
  res.send('Déconnexion réussie');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
