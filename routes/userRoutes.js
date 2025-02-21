const router = require('express').Router()
const userController = require("../controllers/userController")

router.get("/", userController.getAll)
router.get("/:id", userController.getMe)
router.post("/signup", userController.signUp)

module.exports = router