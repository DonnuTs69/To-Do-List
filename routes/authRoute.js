const express = require("express")
const authController = require("../controllers/authController")
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.get("/refresh-token", verifyToken, authController.refreshToken)

module.exports = router
