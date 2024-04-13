const { check } = require("express-validator")
const { validateFields } = require("../middlewares/validateFields")

const {
  createUser,
  login,
  renewToken,
} = require("../controllers/authController")
const { Router } = require("express")

const router = Router()

// validate and create user

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  createUser
)

// login functionality
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
)

// renew token
router.get("/renew", renewToken)

module.exports = router
