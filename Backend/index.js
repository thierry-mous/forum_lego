const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded(extended = true));




app.use('/public/', express.static(path.join(__dirname, 'public')))


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});