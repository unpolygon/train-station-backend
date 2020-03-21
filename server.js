const express = require('express');
const cors = require('cors');

var app = express();
app.use(cors());

const port = process.env.PORT || 5000;
app.use(express.json());

const trainRouter = require('./routes/train');
const stationRouter = require('./routes/station');

app.use('/train',trainRouter);
app.use('/station',stationRouter);

app.listen(port, () => {
    console.log(`Connected port: ${port}`);
});