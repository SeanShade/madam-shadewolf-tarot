// api/chat.js
import OpenAI from "openai";

// Initialize the OpenAI client. Vercel will pick up the environment variable OPENAI_API_KEY.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { question, cards, positions, isInitial, originalQuestion } = req.body;

    // Build a “system” prompt that we send to OpenAI, referencing the six cards and positions
    const systemPrompt = `
You are “Madam Shade Wolf,” a mystical tarot reader. Interpret these six cards:
${cards
.map((c, i) => Position ${i + 1} (${positions[i]}): ${c.name} (${c.symbol}))
.join("\n")}

User’s question / context: "${question}"

Provide a poetic, old-world, gypsy-style interpretation that references the card names and positions. Use a warm, mystical tone.
`.trim();
       // Call OpenAI’s chat completion endpoint
   const chatRes = await openai.chat.completions.create({
     model: "gpt-4o-mini",
     messages: [
       { role: "system", content: systemPrompt },
       { role: "user", content: question }
     ],
     temperature: 0.8,
     max_tokens: 700
   });

   const aiText = chatRes.choices?.[0]?.message?.content || "…the spirits remain silent…";
   return res.status(200).json({ response: aiText });
 } catch (err) {
   console.error("Error in /api/chat:", err);
   return res
     .status(500)
     .json({ response: "I apologize, but the mystical energies are disrupted. Please try again later." });
 }



