const router = require('express').Router()
const userController = require("../controllers/userController")
const authController = require("../controllers/authController");

router.get("/", userController.getAll)
router.get("/:id", userController.getMe)
router.get("/auth/login", authController.login)
router.post("/signup", userController.signUp)

module.exports = router