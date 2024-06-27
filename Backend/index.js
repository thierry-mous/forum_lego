const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const path = require('path');
const userRoutes = require('./routes/inscription_route');
const topicRoutes = require('./routes/topics_route');
const postRoutes = require('./routes/post_route');


const app = express();




app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/public/', express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api', postRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
