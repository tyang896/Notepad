const html = require('express').Router();
const path = require('path');

// ROUTE: /notes
// Send the user the notes.html page
html.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
}
)

//Route: /notes/*
//For any other route path after /notes, send the user to the index.html page.
html.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html' ))
)

module.exports = html;