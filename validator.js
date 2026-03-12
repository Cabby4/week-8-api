
const joi = require("joi");

const validateTodo = (req,res,next) => {

    const cabby = joi.object ({

        task : joi.string().min(3).max(100),
        completed : joi.boolean().default(false)
    });

    const { error } = cabby.validate(req.body)
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }

    next ();
}

module.exports = validateTodo;