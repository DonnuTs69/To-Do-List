const express = require("express")
const titleControlles = require("../controllers/listController")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.get("/all-list/:id", verifyToken, titleControlles.getAllListFromTheUser)
router.get("/:id", verifyToken, titleControlles.getListById)
router.post("/create", verifyToken, titleControlles.listPost)
router.patch("/edit/:id", verifyToken, titleControlles.listUpdate)
router.delete("/delete/:id", verifyToken, titleControlles.listDelete)

module.exports = router
