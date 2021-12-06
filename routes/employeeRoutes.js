const express = require('express');
const empModel = require('../models/employeeModels.js');
const app = express();

// All Employee resources are fetched
app.get('/api/employees', async (req, res) => {
    const emp = await empModel.find({});
    try {
        res.send(emp);
        res.status(200); // ok
    } catch (err) {
        res.status(500).send(err);
    }
});


// A new Employee resource is created
app.post('/api/employees', async (req, res) => {
    const emp = new empModel(req.body);
    try {
        await emp.save();
        res.send(emp);
        res.status(201); // created
    } catch (err) {
        res.status(500).send(err);
    }
});

// One Employee resource is fetched by ID
app.get('/api/employees/:id', async (req, res) => {
    const ID = req.params.id

    try {
        res.send(await empModel.findById(ID));
        res.status(200); // ok
    } catch (err) {
        res.status(500).send(err);
    }
});


// Employee resource is updated by ID
app.put('/api/employees/:id', async (req, res) => {
    const ID = req.params.id
    
    try {
        await empModel.findByIdAndUpdate(ID, req.body);
        emp = await empModel.save();
        res.send(emp);
        res.status(200).send("Updated successfully"); // ok
    } catch (err) {
        res.status(500).send(err);
    }
})

// Employee resource is deleted by ID
app.delete('/api/employees/:id', async (req, res) => {
    const ID = req.params.id
    try {
        const emp = await empModel.findByIdAndDelete(ID)
        if (!emp) res.status(204).send("No employee found"); // no content
        res.status(200).send("Delete Successfully"); // ok
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = app