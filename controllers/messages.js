// Import any necessary dependencies
const Message = require("../models/message")

// Define your controller function
const getMessages = async (req, res) => {
  const myId = req.uid
  const messagesFrom = req.params.from

  // Get all messages from the database in MongoDB
  const lastThirtyMessages = await Message.find({
    $or: [
      { from: myId, to: messagesFrom },
      { from: messagesFrom, to: myId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30)

  res.json({
    ok: true,
    msg: "getMessages",
    messages: lastThirtyMessages,
  })
}

// Export the controller function
module.exports = {
  getMessages,
}
