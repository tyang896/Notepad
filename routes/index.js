const express = require('express');
const htmlRouter = require('./htmlRoutes');
const apiRouter = require('./apiRoutes');


const app = express();

app.use('/notes', htmlRouter);
app.use('/api', apiRouter);

module.exports = app;