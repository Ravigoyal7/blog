const express = require("express");
const commentController = require("../controller/comment");
const router = express.Router();
const authMiddleware = require ("../middleware/auth");

router.get("", authMiddleware, commentController.getComment);
router.post("", authMiddleware, commentController.createComment);
router.get("/:id", authMiddleware, commentController.getById);
router.put("/:id", authMiddleware, commentController.updateComment);
router.delete("/:id", authMiddleware, commentController.deleteComment);

module.exports = router;