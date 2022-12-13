const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

//MongoModel
const Model = require('./models/model');


//MongoDB Strings
require('dotenv').config();
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
//Checking is DB connection is OK
database.on('error', (error) => {
    console.log(error)//Logs the error for debugging
})
  
database.once('connected', () => {
    console.log('Database Connected OK');//Logs ok to know if good
})


// New app using express module
const app = express();
app.use(bodyParser.urlencoded({
	extended:true
}));

//Index file | main html file that allows me to insert data for testing
app.get("/", function(req, res) {
res.sendFile(__dirname + "/Home.html");
});

//Post Method | used to insert the data
app.post("/insert", function(req, res) {
console.log("inserting data.");

const data = new Model({
    name: req.body.name,
    colour: req.body.colour,
    model: req.body.model,
    year: req.body.year,
    brand: req.body.brand,
    Partslist: req.body.Partslist,
    PriceRang: req.body.PriceRang,
})

try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave)
    console.log("inserting data done.");
}
catch (error) {
    res.status(400).json({message: error.message})
}

});

//Get all Method
app.get('/getAll', async (req, res) => {
    console.log("Getting all data.");

    try{
        const data = await  Model.find();
        res.json(data)
        console.log("Getting data done.");

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method | used to get data data with ID
app.get('/getOne/:id', async (req, res) => {
    console.log("Getting data by ID.");

    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
        console.log("Getting data done.");
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method | used to update Data
app.patch('/update/:id', async (req, res) => {
    console.log("Updating data.");
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await  Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
        console.log("Updating data done.");

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method | used the delete Data
app.delete('/delete/:id', async (req, res) => {
    console.log("Deleting data.");
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
        console.log("Deleting data done.");

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }})


//Port 3000 setup for local Testing
//app.listen(3000, function(){
    ///console.log("server is running on port 3000");
//})
