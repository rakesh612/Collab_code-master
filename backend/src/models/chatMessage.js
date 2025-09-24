import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    index: true, //Indexed for faster queries when fetching messages in a specific room.
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,   //It’s a special data type in MongoDB that stores a 12-byte unique identifier.
    // Mongoose uses it to Reference other documents (like a foreign key in SQL).
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "seen"],
    default: "sent",
  }
});

export default mongoose.model("ChatMessage", chatMessageSchema);
