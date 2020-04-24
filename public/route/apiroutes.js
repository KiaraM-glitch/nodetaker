var dbJSON = require("../db/db.json");
var fs = require("fs")
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(dbJSON);
    })
    app.post("/api/notes", function (req, res) {
        var note = (req.body);
        note.id = dbJSON.length + 1;
        dbJSON.push(note);
    
        fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(dbJSON), function (err) {
            if (err) {
                return console.log(err);
            }
            res.json(dbJSON);
        })
    })
    app.delete("/api/notes/:id", function (req, res) {
        
        var noteKeep = dbJSON.filter(function (note) {
            return note.id !== req.params.id
        });
        
        fs.writeFileSync(__dirname + "/../db/db.json", JSON.stringify(noteKeep), function (err) {
            if (err) {
                return console.log(err);
            }
        })
        return res.json(dbJSON)
        res.json(dbJSON);
    })
}
    //Find ID that needs deleting
    //Remove the note with the given ID
    