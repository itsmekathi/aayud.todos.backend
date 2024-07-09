const mongoose = require('mongoose');
const Joi = require('joi');

const Todo = mongoose.model('Todo', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    }
}));

function validateTodo(todo) {
    const todoSchema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(200).required()
    });
    return todoSchema.validate(todo);
}

exports.Todo = Todo;
exports.validate = validateTodo;