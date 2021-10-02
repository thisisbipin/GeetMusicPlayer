const express = require('express');
const { exec } = require("child_process");
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;
let songs = [];


app.use(express.static('public'));


exec("python public/generatelist.py", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

/* This function just returns the list of available songs in a JSON format 
   and also updates the song variable which is needed in sending the respective audio file */
app.get('/music/list/', (req, res) => {
   
    const content = fs.readFileSync("./public/lists.txt");
    let text = content.toString(); 
    
    songs = [];     // to empty the songs list before adding the names
    
    let namer = '';
    for (let i = 0; i < text.length; i++) {
        if (text[i] == '\n') {
            console.log(namer);
            if (namer.length >= 3)
                songs.push(namer.substr(0,namer.length-1));
            namer = '';
        }
        else
        namer += text[i];
    }
    songs.sort();

    console.log(object);
    res.send(object);
});



app.listen(port, () => {
    console.log(`Server Started @http://localhost:${port}`);
});