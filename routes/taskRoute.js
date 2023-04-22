const express = require("express")
const taskController = require("../controllers/taskController")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/create/:id", verifyToken, taskController.postNewTask)
router.patch("/edit", verifyToken, taskController.updateTask)
router.delete("/delete", verifyToken, taskController.deleteTask)

module.exports = router
