const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const {v4: uuidv4 } = require('uuid');

//Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//ROUTE: api/notes
notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        console.log("This is the data:")
        console.log(JSON.parse(data));
        res.json(JSON.parse(data))
    }

    );
});

notes.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a new note`);
    console.info(req.body);
    console.info(typeof(req.body));
    //req.body = {title: 'This is a title', text: 'this is a description'} <--object
    const {title, text} = req.body;
    if(title && text !== ""){
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
                //{title: 'This is a title', text: 'this is a text', id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' }
        fs.readFile("./db/db.json", 'utf8', (err, data) => {//Reads the data from the db.json file
            if(err){
                console.error(err);
            }else{
                let exists = false;
                //data = [{"title":"Test Title","text":"Test text"},{"title":"asfzs","text":"asdfasf"}]
                const parseData = JSON.parse(data);//data become [{title: "Test Title"}, {text: "Test text"}...]
                parseData.forEach(object => {
                    if(object.note_id === newNote.note_id){
                        exists = true;
                    }
                })
                //if data already esists inside this, then don't save, else save
                if(!exists){
                    parseData.push(newNote);
                    fs.writeFile("./db/db.json", JSON.stringify(parseData), (err) =>
                    err ? console.error(err) : res.json({message: "Item successfully added to the database!"}));
                }else{
                    res.json({message: "item already exists in the database"})
                }
            }
        })
    }else {
        res.json(`Error: No title or body in note. Note not saved`)
    }

})

// ROUTE: api/notes/:id
notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    console.log("Here is the noteId")
    console.log(noteId);
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