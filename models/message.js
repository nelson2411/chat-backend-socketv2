/*
In this file we will define the schema for the messages that will be stored in the database.
*/
const { Schema, model } = require("mongoose")

const MessageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId, // This means that this is a reference to another object in the database
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This will add the created_at and updated_at fields
  }
)

MessageSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject()
  return object
})

module.exports = model("Message", MessageSchema)
