const { response } = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/users")

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body
    // check if the email already exists
    const emailExists = User.findOne({
      email,
    })

    // encrypt password

    // store user in the database
    const user = new User(req.body)

    res.json({
      ok: true,
      msg: "create user",
      email,
      password,
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
