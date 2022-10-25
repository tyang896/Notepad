const html = require('express').Router();
const path = require('path');

// ROUTE: /notes
html.get('/', (req, res) => {
    console.info(`${req.method} received`)
    res.sendFile(path.join(__dirname, '../public/notes.html'))
}
)

html.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html' ))
)

module.exports = html;
// console.log(html);
// console.log(typeof(html));