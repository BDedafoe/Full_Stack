import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true,
      },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    description: String,
    subject: String,
    picture: String,
    userPicture: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;