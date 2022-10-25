const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

//Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//ROUTE: api/notes
notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    }
    );
});

//ROUTE: api/notes
//Adds a new note to the database
notes.post('/notes', (req, res) => {
    //This is the req.body object --> req.body = {title: 'This is a title', text: 'this is a description'...}
    const { title, text } = req.body;
    if (title && text !== "") {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        //{title: 'This is a title', text: 'this is a text', id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' }
        //Reads the data from the db.json file
        fs.readFile("./db/db.json", 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let exists = false;
                const parseData = JSON.parse(data);
                parseData.forEach(object => {
                    if (object.note_id === newNote.note_id) {
                        exists = true;
                    }
                })
                //if data already esists inside this, then don't save, else save
                if (!exists) {
                    parseData.push(newNote);
                    fs.writeFile("./db/db.json", JSON.stringify(parseData), (err) =>
                        err ? console.error(err) : res.json({ message: "Item successfully added to the database!" }));
                } else {
                    res.json({ message: "item already exists in the database" })
                }
            }
        })
    } else {
        res.json(`Error: No title or body in note. Note not saved`)
    }

})

// ROUTE: api/notes/:id
// Deletes a note from the database
notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id !== noteId);
            fs.writeFile('./db/db.json', JSON.stringify(result, null, 4), (err) => {
                err ? console.error(err) : res.json(`Successfully deleted note!`);
            })

        });
});

module.exports = notes;