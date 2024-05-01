const User = require("../models/users")

const userConnected = async (uid) => {
  const user = await User.findById(uid)
  user.online = true
  await user.save()
  return user
}

const userDisconnected = async (uid) => {
  const user = await User.findById(uid)
  user.online = false
  await user.save()
  return user
}

// get all users
const getAllUsers = async () => {
  const users = await User.find().sort("-online")
  return users
}

module.exports = {
  userConnected,
  userDisconnected,
  getAllUsers,
}
