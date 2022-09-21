const express = require("express");
const routers = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/notes', routers);


app.use(express.static("public"));

app.listen(PORT, () => console.log(`app listening for http://localhost:${PORT} `));