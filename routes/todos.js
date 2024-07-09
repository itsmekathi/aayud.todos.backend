const express = require('express');
const { Todo, validate } = require("../models/todo");
const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.send(todos);
});

router.get('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
        return res.send(todo);
    }
    return res.status(404).send('The item with the given id was not found');
});

router.put('/:id', async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) {
        console.log(error);
        return res.sendStatus(400);
    }
    let todo = await Todo.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description }, { new: true });
    if (!todo) {
        return res.status(404).send('The item with the given id was not found');
    }
    res.send(todo);
});

router.post('/', async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400).send(''.concat(error.details.map(ed => ed.message)));
    }
    let todo = new Todo({
        title: req.body.title,
        description: req.body.description
    });
    todo = await todo.save()
    res.send(todo);
});

router.delete('/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.send(todo);
});

module.exports = router;