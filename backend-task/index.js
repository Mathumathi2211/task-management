const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Task } = require('./models');

const app = express();
const PORT = process.env.PORT || 5432;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Create a task
app.post('/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a task by ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) throw new Error('Task not found');
        res.status(200).json(task);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) throw new Error('Task not found');

        await task.update(req.body);
        res.status(200).json(task);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) throw new Error('Task not found');

        await task.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
