const User = require("../models/users")
const Message = require("../models/message")

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

const recordMessage = async (payload) => {
  try {
    const message = new Message(payload)
    await message.save() // save the message in the database
    return message
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = {
  userConnected,
  userDisconnected,
  getAllUsers,
  recordMessage,
}
