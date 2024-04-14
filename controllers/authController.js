const { response } = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/users")
const { generateJWT } = require("../helpers/jwt")

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body
    // check if the email already exists
    const emailExists = await User.findOne({
      email,
    })
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      })
    }

    const user = new User(req.body)

    // encrypt password
    const salt = bcrypt.genSaltSync() // default 10 rounds
    user.password = bcrypt.hashSync(password, salt) // encrypt password using bcrypt

    // store user in the database
    await user.save()

    // generate JWT
    const token = await generateJWT(user.id)

    res.json({
      user,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator 💀",
    })
  }
}

// login

const login = async (req, res) => {
  const body = req.body
  res.json({
    ok: true,
    msg: "login",
    body,
  })
}

// renew token

const renewToken = async (req, res) => {
  res.json({
    ok: true,
    msg: "renew",
  })
}

module.exports = {
  createUser,
  login,
  renewToken,
}
