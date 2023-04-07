const express = require("express")
const taskController = require("../controllers/taskController")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/create/:id", taskController.postNewTask)
router.patch("/edit/:id", verifyToken, taskController.updateTask)

module.exports = router
