// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require ("fs"); 
const util = require ("util");

const writeFileAsync = util.promisify(fs.writeFile); 
const readFileAsync = util.promisify(rs.readFile);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

//create API routes 

app.get("/api/reservations", function(req, res){
    fs.readFile("reservations.json", "utf8", function(err, reservations){
        if (err) throw err;
        res.json(JSON.parse(reservations))
    })
})

app.get("/api/waitlist", function(req, res){
    fs.readFile("waitlist.json", "utf8", function(err, waitlist){
        if (err) throw err;
        res.json(JSON.parse(waitlist))
    })
})
  
app.post("/api/reservations", async function (req, res){
    let newReservation = req.body;
    try{
       let reservations = await readFileAsync ("reservations.json", "utf8");
        reservations = JSON.parse(reservations);
        newReservationArray= reservations.push(newReservation);
        
    await writeFileAsync("reservations.json", JSON.stringify(reservations));
    res.json(newReservation);
} catch (err){
    throw(err);
}

})
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});