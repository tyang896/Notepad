const notes = require('express').Router();


notes.get('/api/notes', (req, res) =>
    console.log(`${req.method} received`)

)

module.exports = notes;