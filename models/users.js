const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  online: {
    type: Boolean,
    default: false,
  },
})

UserSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject() // this helps to remove the __v and _id from the object
  object.uid = _id
  return object
})

module.exports = model("User", UserSchema)
