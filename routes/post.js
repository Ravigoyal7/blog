const express = require("express");
const postController = require("../controller/post");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.get("", authMiddleware, postController.getPost);
router.post("", authMiddleware, postController.createPost);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);
router.get("/:id", authMiddleware, postController.getById );
module.exports = router;