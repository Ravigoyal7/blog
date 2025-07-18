const { CommentModel } = require("../model/comment");
const createComment = async (req, res) => {
  const user = req.user;
  const { text, postId } = req.body;
  if (!text || !postId) {
    return res.status(400).json({ message: "please provide text" });
  }
  const newComment = await CommentModel.create({
    text,
    postId,
    user: user.id,
  });
  return res.status(201).json({ data: newComment });
};
const getComment = async (req, res) => {
  // const user = req.user;
  const where  =  {}
  const queryParams = req.query;
  if(queryParams.postId){
   where .postId =  queryParams.postId 
  }
  const comment = await CommentModel.find(where).populate([{path:"user",select:"email name"}]);
  return res.status(200).json({ comment });
};
const getById = async (req, res) => {
  const id = req.params.id;
  const comment = await CommentModel.findById(id);
  if (!comment) {
    return res.status(400).json({ message: "comment not found" });
  }
  return res.status(200).json(comment);
};
const deleteComment = async (req, res) => {
  const id = req.params.id;
  const comment = await CommentModel.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }

  await CommentModel.findByIdAndDelete(id);
  return res.status(200).json({ message: "comment deleted successfully" });
};
const updateComment = async (req, res) => {
  const { text } = req.body;
  const id = req.params.id;
  const comment = await CommentModel.findById(id);
  if (!comment) {
    return res.status(400).json({ message: "comment not found" });
  }
  if (text) comment.text = text;

  await comment.save();
  res.status(200).json({ data: comment });
};
module.exports = {
  createComment,
  getComment,
  getById,
  updateComment,
  deleteComment,
};
