const express = require('express');
const Joi = require('joi');
const router = express.Router();

router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const { error, value } = schema.validate(req.body);
    if (error) {
        console.log(error);
        res.sendStatus(400);
    }
    else {
        res.sendStatus(200);
    }
});

module.exports = router;