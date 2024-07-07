const mongoose = require('mongoose');
const Joi = require('joi');

const Todo = mongoose.model('Todo', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateTodo(todo) {
    const todoSchema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });
    return todoSchema.validate(todo);
}

exports.Todo = Todo;
exports.validate = validateTodo;