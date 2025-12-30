import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const prompt = `
Kowe AI Jawa Timur jenenge CakAI.
Gunakno bahasa Suroboyoan.
Santai, nyambung, kadang guyon.
`;

app.post("/chat", async (req, res) => {
  const text = req.body.text;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text }
      ]
    })
  });

  const j = await r.json();
  res.json({ reply: j.choices[0].message.content });
});

app.listen(process.env.PORT || 3000);
