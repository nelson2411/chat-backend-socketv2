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
      ok: true,
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
  const { email, password } = req.body

  try {
    // check if the email exists
    const userDB = await User.findOne({ email })
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email not found",
      })
    }

    // validate password
    const validPassword = bcrypt.compareSync(password, userDB.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      })
    }

    // generate JWT
    const token = await generateJWT(userDB.id)

    // send sanitized user data
    const sanitizedUser = {
      id: userDB.id,
      email: userDB.email,
      name: userDB.name,
    }

    res.json({
      ok: true,
      user: sanitizedUser,
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

// renew token

const renewToken = async (req, res) => {
  const uid = req.uid

  // generate a new JWT
  const token = await generateJWT(uid)

  // get sanitized user data
  const user = await User.findById(uid)
  const sanitizedUser = { id: user.id, email: user.email, name: user.name }

  res.json({
    ok: true,
    msg: "renew",
    token,
    user: sanitizedUser,
  })
}

module.exports = {
  createUser,
  login,
  renewToken,
}
