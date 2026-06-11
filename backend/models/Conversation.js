const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
      required: true
    },
    selectedDate: {
      type: String,
      required: true
    },
    articles: [
      {
        title: String,
        source: String,
        url: String,
        publishedAt: String,
        description: String,
        content: String
      }
    ],
    aiResponse: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);