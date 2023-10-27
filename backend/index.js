import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import { getSentiment } from "./utils/getSentiments.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;
const conversationHistory = [];
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("Welcome you to My world");
});

app.post("/generate-text", async (req, res) => {
  try {
    const userInput = req.body.userInput;
    conversationHistory.push({ role: "user", content: userInput });
    const payload = {
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      messages: conversationHistory,
    };
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const chatbotReply = response.data.choices[0].message.content;
    conversationHistory.push({ role: "assistant", content: chatbotReply });
    console.log(conversationHistory);
    res.json({ chatbotReply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/summarize-documents", async (req, res) => {
  const documents = req.body.documents;
  const combinedText = documents.join("\n");
  const payload = {
    model: "gpt-3.5-turbo",
    max_tokens: 100,
    messages: [
      { role: "user", content: `Summarize the following documents: ${combinedText}` },
    ],
  };
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    payload,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );
  const summary = response.choices[0].messages.content;
  res.json({ summary });
});

app.post("/analyze-sentiment", (req, res) => {
    const text = req.body.text ;
    const sentimentScore = getSentiment(text);
    res.json({
        score: sentimentScore || 0
    });
});
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
