const { PostModel } = require("../model/post");

const createPost = async (req, res) => {
  const user = req.user;
  const { about, description } = req.body;
  if (!about || !description) {
    return res
      .status(400)
      .json({ message: "please provide about and description" });
  }

  const newPost = await PostModel.create({
    about,
    description,
    user: user.id,
  });
  return res.status(201).json({ data: newPost });
};
const getPost = async (req, res) => {
  const user = req.user;
  const post = await PostModel.find({ user: user.id });
  return res.status(200).json({ post });
};
const getById = async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findById(id);
  if (!post) {
    return res.status(400).json({ message: "post not found" });
  }
  return res.status(200).json(post);
};
const deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findById(id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  await PostModel.findByIdAndDelete(id);
  return res.status(200).json({ message: "post deleted successfully" });
};
const updatePost = async (req, res) => {
  const { about, description } = req.body;
  const id = req.params.id;
  const post = await PostModel.findById(id);
  if (!post) {
    return res.status(400).json({ message: "past not found" });
  }
  if (about) post.about = about;
  if (description) post.description = description;
  await post.save();
  res.status(200).json({ data: post });
};

module.exports = { createPost, getPost, getById, deletePost, updatePost };
