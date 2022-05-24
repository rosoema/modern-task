// - - - - - Setting up the server and function to check with the server - - - - -

const express = require("express");
const cors = require("cors");

const server = express();
const port = 3000;

server.use(cors()); // CORS middleware

let my_data = {
    "bars": {
        "Jan.": 0, 
        "Feb.": 0, 
        "Mar.": 0, 
        "Apr.": 0, 
        "May": 0, 
        "Jun.": 0, 
        "Jul.": 0, 
        "Aug.": 0,
        "Sep.": 0, 
        "Oct.": 0, 
        "Nov.": 0, 
        "Dec.": 0
    }, 
    "pie": {
        "Data1": 0, 
        "Data2": 0, 
        "Data3": 0
    }
};

server.get("/", (req, res) => {

    let random = my_data;

    for(let [key,value] of Object.entries(random)){
        Object.keys(value).forEach( key => {
            value[key] = Math.floor(Math.random()*51)
        });
    }
    
    res.json(random);

});

server.listen(port, () => console.log(`listening on port ${port}`));