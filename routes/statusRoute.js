const express = require("express")
const statusController = require("../controllers/statusController")
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")

router.get("/", verifyToken, statusController.getAllStatus)

module.exports = router
