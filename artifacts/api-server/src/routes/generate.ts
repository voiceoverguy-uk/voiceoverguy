import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

const ATTENBOROUGH_SYSTEM_PROMPT = `You are a script generator that writes in the style of Sir David Attenborough narrating a nature documentary. The user will give you a short scenario or scene description. You must transform it into a beautifully written, poetic, nature-documentary-style narration as if Attenborough were observing the scene unfold.

Rules:
- Write in third person, as an observer narrating the scene
- Use Attenborough's gentle, wise, curious and slightly amused tone
- Include vivid descriptions of behaviour, environment and drama
- Add dry British wit and understated humour where appropriate
- Keep the script between 80-150 words
- Do not break character
- Do not include stage directions, speaker labels or quotation marks around the narration
- Write it as a flowing script ready to be read aloud
- Use British English spelling`;

const SANTA_SYSTEM_PROMPT = `You are a script generator that writes personalised messages from Santa Claus (Father Christmas). The user will provide details about who the message is for. You must create a warm, magical, personalised message from Santa himself.

Rules:
- Write in first person as Santa Claus / Father Christmas
- Use a warm, jolly, festive and magical tone
- Reference specific details the user has provided (names, interests, achievements)
- Include references to the North Pole, elves, reindeer, the workshop, the naughty/nice list
- Add gentle humour and warmth
- Keep the message between 100-200 words
- Do not break character
- Make it feel personal and special
- Use British English spelling
- Sign off as Santa, Father Christmas, or similar`;

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Please provide a prompt" });
    }

    if (prompt.trim().split(/\s+/).length > 30) {
      return res.status(400).json({ error: "Prompt too long (25 words max)" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: ATTENBOROUGH_SYSTEM_PROMPT },
        { role: "user", content: prompt.trim() },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const script = completion.choices[0]?.message?.content || "";
    res.json({ script });
  } catch (error: any) {
    console.error("Attenborough generate error:", error?.message || error);
    res.status(500).json({ error: "Generation failed. Please try again." });
  }
});

router.post("/generate1", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Please provide details" });
    }

    if (prompt.trim().split(/\s+/).length > 80) {
      return res.status(400).json({ error: "Prompt too long (75 words max)" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SANTA_SYSTEM_PROMPT },
        { role: "user", content: prompt.trim() },
      ],
      max_tokens: 600,
      temperature: 0.8,
    });

    const script = completion.choices[0]?.message?.content || "";
    res.json({ script });
  } catch (error: any) {
    console.error("Santa generate error:", error?.message || error);
    res.status(500).json({ error: "Generation failed. Please try again." });
  }
});

export default router;
