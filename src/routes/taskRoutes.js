const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/").get(protect, getTasks).post(protect, createTask);

router
  .route("/:id")
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
