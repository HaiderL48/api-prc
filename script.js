// Please install OpenAI SDK first: `npm install openai`

import { OpenAI } from "openai";
// import { Configuration } from "openai";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEP_API,
});

app.use(bodyParser.json());

// const config = new Configuration({
//   apiKey: process.env.DEEP_API,
// });
// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "deepseek-chat",
//   });

//   console.log(completion.choices[0].message.content);
// }

// main();

const messages = [];

app.post("/message", (req, res)   => {
  const message = req.body.message;
  messages.push({
    role: "user",
    content: message,
  });
  const response = openai.chat.completions.create({
    model: "deepseek-chat",
    messages,
  });
  response
    .then((result) => {
      messages.push({
        role: "assistant",
        content: result.data.choice[0].message.content,
      });
      res.send(result.data.choice[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.listen(3000, () => {
  console.log("Server is running on Port :: 3000");
});
