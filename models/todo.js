const mongoose = require("mongoose");
const Joi = require("joi");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    maxLength: 255,
    required: true,
  },
});

const ToDo = mongoose.model("ToDo", todoSchema);

function validateToDo(toDo) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(toDo);
}

exports.ToDo = ToDo;
exports.validateToDo = validateToDo;
