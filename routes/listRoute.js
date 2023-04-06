const express = require("express")
const titleControlles = require("../controllers/listController")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/create", verifyToken, titleControlles.listPost)
router.get("/:id", verifyToken, titleControlles.getListById)

module.exports = router
