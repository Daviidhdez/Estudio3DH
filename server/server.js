import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "" // <--- pon aquí tu clave
});

app.post("/chat", async (req, res) => {
  const userText = req.body.message;

  if (!userText) return res.status(400).json({ reply: "No recibí ningún mensaje." });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres un asistente de soporte de Estudio3DH, amable y profesional." },
        { role: "user", content: userText }
      ],
      max_tokens: 150
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error OpenAI:", error);
    res.status(500).json({ reply: "Hubo un error con la IA" });
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
