const express = require('express');
require("../src/db/conn")
const mensRanking = require("../src/models/mens")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app.get("/", async (req,res)=>{
//     res.send("Hello from Server")
// })

//Handling POST request
app.post("/mens", async (req, res) => {
    try {
        const addingMensRecords = new mensRanking(req.body)
        const addedRecord = await addingMensRecords.save();
        res.status(201).send(addedRecord)
    } catch (error) {
        res.status(400).send(error);
    }
})

//Handling GET request
app.get("/mens", async (req, res) => {
    try {
        const searchingRecords = await mensRanking.find().sort({"ranking": 1});
        res.send(searchingRecords)
    } catch (error) {
        res.status(400).send(error);
    }
})

//Handling GET request for individual
app.get("/mens/:id", async (req, res) => {
    try {
        const searchingRecord = await mensRanking.find({
            _id: req.params.id
        });
        res.send(searchingRecord)
    } catch (error) {
        res.status(400).send(error);
    }
})

//Handling PUT/PATCH request for individual
app.patch("/mens/:id", async (req, res) => {
    try {
        const updatedRecord = await mensRanking.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });
        res.send(updatedRecord)
    } catch (error) {
        res.status(500).send(error);
    }
})

//Handling DELETE request for individual
app.delete("/mens/:id", async (req, res) => {
    try {
        const recordDeleted = await mensRanking.findOneAndDelete({ _id: req.params.id });
        res.send(recordDeleted)
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`connection sucessfull at port no. ${port}`);
})
