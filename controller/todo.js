const { TodoModel } = require("../model/todo");

const createTodo = async (req, res) => {
  const user = req.user;
  const { title, isCompleted } = req.body;
  if (!title ) {
    return res.status(400).json({ message: "please provide valid data" });
  }
  const exist = await TodoModel.findOne({ title,user:user.id });
  if (exist) {
    return res.status(409).json({ message: "title is already exist" });
  }

  const newtodos = await TodoModel.create({
    title,
    isCompleted,
    user: user.id,
  });
  return res.status(201).json({ data: newtodos });
};

const getTodos = async (req, res) => {
  const user = req.user;
  const todos = await TodoModel.find({ user: user.id });
  return res.status(200).json({ todos });
};

const getById = async (req, res) => {
  const id = req.params.id;
  const todos = await TodoModel.findById(id);
  if (!todos) {
    return res.status(400).json({ message: "title not found" });
  }
  return res.status(200).json(todos);
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const todos = await TodoModel.findById(id);
  if (!todos) {
    return res.status(404).json({ message: "todos not found" });
  }

  await TodoModel.findByIdAndDelete(id);
  return res.status(200).json({ message: "todos deleted successfully" });
};

const updateTodo = async (req, res) => {
  const { title, isCompleted } = req.body;
  const id = req.params.id;
  const todos = await TodoModel.findById(id);
  if (!todos) {
    return res.status(400).json({ message: "todos not found" });
  }
  if (title) todos.title = title;
  if (isCompleted) todos.isCompleted = isCompleted;
  await todos.save();
  res.status(200).json({ data: todos });
};

module.exports = { createTodo, updateTodo, deleteTodo, getById, getTodos };
