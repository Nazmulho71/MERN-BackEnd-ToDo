const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const objectId = require("../middleware/objectId");
const { ToDo, validateToDo } = require("../models/todo");

router.get("/", async (req, res) => {
  const todos = await ToDo.find().select("-__v");
  res.send(todos);
});

router.get("/:id", async (req, res) => {
  const todos = await ToDo.findById(req.params.id).select("-__v");
  if (!todos)
    return res.status(404).send("The ToDo with the given ID was not found!");

  res.send(todos);
});

router.post("/", validate(validateToDo), async (req, res) => {
  const todo = await ToDo.create({
    title: req.body.title,
  });
  await todo.save();

  res.send(todo);
});

router.put("/:id", [validate(validateToDo), objectId], async (req, res) => {
  const todo = await ToDo.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );
  if (!todo)
    return res.status(404).send("The ToDO with the given ID was not found!");

  res.send(todo);
});

router.delete("/:id", async (req, res) => {
  const todo = await ToDo.findByIdAndDelete(req.params.id);
  res.send(todo);
});

module.exports = router;
