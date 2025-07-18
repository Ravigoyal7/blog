const express = require("express");
const todoController = require("../controller/todo");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.get("", authMiddleware, todoController.getTodos);
router.post("", authMiddleware, todoController.createTodo);
router.put("/:id", authMiddleware, todoController.updateTodo);
router.delete("/:id", authMiddleware, todoController.deleteTodo);
router.get("/:id", authMiddleware, todoController.getById);

module.exports = router;
