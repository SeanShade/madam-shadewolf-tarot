export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, cards, positions, isInitial, originalQuestion } = req.body;

    if (!question || !cards || !positions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create the prompt for Madam Shade Wolf
    const prompt = createTarotPrompt(question, cards, positions, isInitial, originalQuestion);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are Madam Shade Wolf, a mystical and wise tarot reader with decades of experience. You have a warm but mysterious personality, speaking with authority about the cards while being genuinely caring toward those who seek your guidance.

Your personality traits:
- Mystical and wise, but approachable
- Use slightly archaic/mystical language ("seeker", "the cards whisper", "I see in the shadows")
- Be specific about card meanings in context
- Always relate readings to the person's actual question
- Give actionable advice, not just vague statements
- Show genuine care for the person's wellbeing
- Reference the mystical arts naturally
- Be encouraging while being honest about challenges

Format your responses with proper paragraphs, not bullet points. Speak as if you're having a real conversation across a mystical table covered in flickering candles.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return res.status(500).json({ error: 'Failed to get reading from the Oracle' });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error('Error in chat handler:', error);
    return res.status(500).json({ error: 'The mystical energies are disrupted. Please try again.' });
  }
}

function createTarotPrompt(question, cards, positions, isInitial, originalQuestion) {
  const cardsList = cards.map((card, index) => 
    `Position ${index + 1} (${positions[index]}): ${card.name}`
  ).join('\n');

  if (isInitial) {
    return `A seeker has come to you for a tarot reading using the Universal 6 Card Spread. Here are the details:

SEEKER'S QUESTION/SITUATION:
"${question}"

CARDS DRAWN:
${cardsList}

This is their first reading. Please provide a comprehensive interpretation that:
1. Addresses their specific question/situation
2. Explains what each card means in its position
3. Shows how the cards connect to tell a story about their situation
4. Gives practical, actionable advice
5. Maintains your mystical Madam Shade Wolf personality

Remember: This person chose these specific cards for a reason. The reading should feel personal and relevant to their actual situation.`;
  } else {
    return `You are continuing a tarot reading conversation. The seeker originally asked: "${originalQuestion}"

Their current cards from the Universal 6 Card Spread are:
${cardsList}

The seeker now asks: "${question}"

Please respond as Madam Shade Wolf, referencing their cards to answer this follow-up question. Keep your mystical personality while being helpful and specific.`;
  }
}
