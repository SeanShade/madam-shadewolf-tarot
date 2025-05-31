// api/chat.js

// Use CommonJS require instead of import
const OpenAI = require("openai");

module.exports = async function handler(req, res) {
  try {
    // Only allow POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST requests allowed" });
    }

    // Parse and validate the request body
    const { question, cards, positions, isInitial, originalQuestion } = req.body || {};
    if (
      typeof question !== "string" ||
      !Array.isArray(cards) ||
      !Array.isArray(positions) ||
      cards.length !== 6 ||
      positions.length !== 6
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid request body (expected question, 6 cards, 6 positions)" });
    }

    // Check that the API key environment variable is present
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Server misconfiguration: OPENAI_API_KEY is not set",
      });
    }

    // Build the system prompt
    const systemPrompt = `
You are "Madam Shade Wolf," a mystical tarot reader who uses the Universal 6 Card Spread.
Interpret these six cards and relate them to the user’s question:

${cards
  .map((c, i) => `Position ${i + 1} (${positions[i]}): ${c.name} (${c.symbol})`)
  .join("\n")}

User’s question / context: "${question}"

Provide a poetic, old-world, gypsy-style interpretation referencing each card’s name and position. Use a warm, mystical tone as if you are speaking to the seeker’s soul.
    `.trim();

    // Initialize OpenAI
    const openai = new OpenAI({ apiKey });

    // Call the OpenAI Chat Completion API
    const chatRes = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or whichever model you prefer
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      temperature: 0.8,
      max_tokens: 700,
    });

    // Extract the AI’s reply
    const aiText =
      chatRes.choices?.[0]?.message?.content ??
      "…the spirits remain silent…";

    // Return JSON
    return res.status(200).json({ response: aiText });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return res.status(500).json({
      response: "I apologize, but the mystical energies are disrupted. Please try again later.",
    });
  }
};
