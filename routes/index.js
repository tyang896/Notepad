const express = require('express');
const htmlRouter = require('./htmlRoutes');
const apiRouter = require('./apiRoutes');

// console.log(htmlRouter);
// console.log(typeof(htmlRouter));

const app = express();

app.use('/notes', htmlRouter);//htmlRouter = () => {}
app.use('/api', apiRouter);

module.exports = app;