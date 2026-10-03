import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY n'est pas configurée. Le site démarrera, mais le chat IA ne répondra pas.");
}

const client = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

app.post("/api/chat", async (req, res) => {
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!message) return res.status(400).json({ error: "Message vide." });
  if (message.length > 4000) return res.status(400).json({ error: "Message trop long." });
  if (!client) return res.status(503).json({ error: "API IA non configurée." });

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6-luna",
      instructions: `Tu es SunuAI, un assistant IA pensé pour le Sénégal et l'Afrique.
Réponds principalement en français, mais comprends et peux répondre en wolof et en arabe.
Sois clair, utile, respectueux et pédagogique.
Pour les questions scolaires, explique simplement et donne des exemples.
Pour les projets et entreprises, propose des idées réalistes adaptées au contexte africain.
Ne prétends pas avoir des capacités que tu n'as pas.`,
      input: message
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible d'obtenir une réponse IA." });
  }
});

app.listen(port, () => {
  console.log(`SunuAI est disponible sur http://localhost:${port}`);
});