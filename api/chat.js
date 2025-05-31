import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Comprehensive tarot card meanings
const cardMeanings = {
  "The Fool": {
    upright: "New beginnings, innocence, spontaneity",
    reversed: "Recklessness, risk-taking, foolishness",
    meaning: "Taking a leap of faith into the unknown, starting fresh with childlike wonder",
    career: "New job opportunities, career changes, starting your own business",
    love: "Fresh start in relationships, meeting someone new, taking romantic risks",
    advice: "Be open to new experiences but stay grounded in reality"
  },
  "The Magician": {
    upright: "Manifestation, resourcefulness, power, inspired action",
    reversed: "Manipulation, poor planning, untapped talents",
    meaning: "You have all the tools and resources needed to succeed",
    career: "Using your skills effectively, time for action on projects, leadership opportunities",
    love: "Taking initiative in relationships, clear communication, making things happen",
    advice: "Focus your energy and talents toward your goals"
  },
  "The High Priestess": {
    upright: "Intuition, sacred knowledge, divine feminine, subconscious",
    reversed: "Secrets, disconnected from intuition, withdrawal",
    meaning: "Trust your inner wisdom and pay attention to dreams and intuition",
    career: "Hidden information at work, need for patience, research before decisions",
    love: "Unspoken feelings, need for emotional depth, secrets in relationships",
    advice: "Look beyond the surface and trust your gut feelings"
  },
  "The Empress": {
    upright: "Femininity, beauty, nature, nurturing, abundance",
    reversed: "Creative block, dependence on others, smothering",
    meaning: "A time of growth, creativity, and nurturing abundance",
    career: "Creative projects flourishing, teamwork, profitable ventures",
    love: "Deep emotional connections, fertility, nurturing relationships",
    advice: "Embrace creativity and nurture what you want to grow"
  },
  "The Emperor": {
    upright: "Authority, establishment, structure, father figure",
    reversed: "Tyranny, rigidity, coldness, domination",
    meaning: "Take charge of your life with discipline and strategic planning",
    career: "Leadership roles, establishing structure, dealing with authority figures",
    love: "Commitment, traditional relationships, protective partner",
    advice: "Create stability through organization and leadership"
  },
  "The Hierophant": {
    upright: "Spiritual wisdom, religious beliefs, conformity, tradition",
    reversed: "Personal beliefs, freedom, challenging the status quo",
    meaning: "Seeking knowledge through traditional sources or spiritual guidance",
    career: "Working within established systems, mentorship, traditional career paths",
    love: "Traditional relationships, marriage, shared values and beliefs",
    advice: "Consider both traditional wisdom and your personal truth"
  },
  "The Lovers": {
    upright: "Love, harmony, relationships, values alignment, choices",
    reversed: "Disharmony, imbalance, misalignment of values",
    meaning: "Important choices about relationships and personal values",
    career: "Business partnerships, team harmony, value-based decisions",
    love: "Deep connections, soulmates, important relationship decisions",
    advice: "Choose based on your true values and authentic self"
  },
  "The Chariot": {
    upright: "Control, willpower, success, determination, triumph",
    reversed: "Lack of control, lack of direction, aggression",
    meaning: "Victory through maintaining focus and determination",
    career: "Career advancement, overcoming obstacles, competitive success",
    love: "Taking control of your love life, overcoming relationship challenges",
    advice: "Stay determined and maintain control over opposing forces"
  },
  "Strength": {
    upright: "Inner strength, courage, patience, control, compassion",
    reversed: "Self-doubt, low energy, lack of confidence",
    meaning: "Gentle strength and courage will overcome challenges",
    career: "Leading with compassion, patience with difficult situations, quiet confidence",
    love: "Patience in relationships, gentle approach to conflicts, emotional strength",
    advice: "Use gentle strength rather than force"
  },
  "The Hermit": {
    upright: "Soul searching, introspection, being alone, inner guidance",
    reversed: "Isolation, loneliness, withdrawal from others",
    meaning: "Time for introspection and seeking inner wisdom",
    career: "Working independently, seeking mentor guidance, career soul-searching",
    love: "Need for space, self-discovery before relationships, spiritual connection",
    advice: "Take time alone to find your inner truth"
  },
  "Wheel of Fortune": {
    upright: "Good luck, karma, life cycles, destiny, turning point",
    reversed: "Bad luck, lack of control, clinging to control",
    meaning: "Life cycles are turning, change is inevitable",
    career: "Unexpected opportunities, career changes, lucky breaks",
    love: "Fate bringing people together, relationship cycles, destiny",
    advice: "Go with the flow and be ready for change"
  },
  "Justice": {
    upright: "Justice, fairness, truth, cause and effect, law",
    reversed: "Unfairness, lack of accountability, dishonesty",
    meaning: "Truth and justice will prevail, karma is at work",
    career: "Legal matters, contracts, fair treatment, ethical decisions",
    love: "Balanced relationships, fairness, important decisions",
    advice: "Be honest and fair in all your dealings"
  },
  "The Hanged Man": {
    upright: "Suspension, restriction, letting go, sacrifice, new perspective",
    reversed: "Delays, resistance, stalling, indecision",
    meaning: "Pause and see things from a different perspective",
    career: "Career on hold, need for patience, different approach needed",
    love: "Relationship in limbo, need for sacrifice, seeing partner differently",
    advice: "Sometimes you need to let go to move forward"
  },
  "Death": {
    upright: "Endings, beginnings, change, transformation, transition",
    reversed: "Resistance to change, inability to move on, fear",
    meaning: "Major transformation and renewal through endings",
    career: "Career transformation, job ending, complete change of direction",
    love: "Relationship transformation, endings leading to new beginnings",
    advice: "Embrace change as transformation, not loss"
  },
  "Temperance": {
    upright: "Balance, moderation, patience, purpose, healing",
    reversed: "Imbalance, excess, lack of long-term vision",
    meaning: "Finding balance and moderation in all things",
    career: "Work-life balance, patience with progress, collaborative efforts",
    love: "Balanced relationships, patience, healing old wounds",
    advice: "Practice moderation and patience"
  },
  "The Devil": {
    upright: "Bondage, addiction, sexuality, materialism, attachment",
    reversed: "Releasing limiting beliefs, breaking free, power reclaimed",
    meaning: "Breaking free from unhealthy patterns and attachments",
    career: "Feeling trapped in job, unhealthy work situations, materialism",
    love: "Unhealthy relationships, obsession, sexual energy, codependency",
    advice: "Recognize what binds you and choose freedom"
  },
  "The Tower": {
    upright: "Sudden change, upheaval, chaos, revelation, awakening",
    reversed: "Personal transformation, fear of change, averting disaster",
    meaning: "Sudden change that ultimately leads to liberation",
    career: "Job loss, company restructuring, sudden career changes",
    love: "Relationship upheaval, sudden breakups or revelations",
    advice: "What seems like disaster often leads to freedom"
  },
  "The Star": {
    upright: "Hope, faith, purpose, renewal, spirituality, healing",
    reversed: "Lack of faith, despair, disconnection, discouragement",
    meaning: "Renewed hope and healing after difficult times",
    career: "New opportunities, inspiration, positive outlook for future",
    love: "Healing after heartbreak, hope for love, spiritual connections",
    advice: "Have faith - the universe is guiding you"
  },
  "The Moon": {
    upright: "Illusion, fear, anxiety, subconscious, intuition, dreams",
    reversed: "Release of fear, repressed emotion, clarity",
    meaning: "Things are not as they seem, trust your intuition",
    career: "Unclear situations, deception, need to trust instincts",
    love: "Emotional confusion, secrets, intuitive connections",
    advice: "Face your fears and trust your inner voice"
  },
  "The Sun": {
    upright: "Joy, success, celebration, positivity, vitality, confidence",
    reversed: "Inner child, feeling down, overly optimistic",
    meaning: "Success, happiness, and positive outcomes",
    career: "Career success, recognition, achieving goals, promotion",
    love: "Happy relationships, engagement, celebration of love",
    advice: "Embrace joy and share your light with others"
  },
  "Judgement": {
    upright: "Reflection, reckoning, inner calling, rebirth, decisions",
    reversed: "Self-doubt, harsh self-judgment, avoidance",
    meaning: "Time for honest self-evaluation and rebirth",
    career: "Performance reviews, major career decisions, calling to purpose",
    love: "Relationship evaluation, forgiveness, second chances",
    advice: "Be honest with yourself and answer your calling"
  },
  "The World": {
    upright: "Completion, accomplishment, travel, unity, fulfillment",
    reversed: "Incomplete, no closure, seeking perfection",
    meaning: "Successful completion and wholeness achieved",
    career: "Career goals achieved, international opportunities, success",
    love: "Relationship fulfillment, completion of cycle, unity",
    advice: "Celebrate your achievements and prepare for new cycles"
  }
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, cards, positions, isInitial, originalQuestion } = req.body;

    let prompt = "";
    
    if (isInitial) {
      // Build a detailed context with card meanings
      let cardContext = cards.map((card, i) => {
        const meaning = cardMeanings[card.name] || { meaning: "Mystery card" };
        const positionName = positions[i];
        
        // Determine which aspect to focus on based on the question
        let focusArea = "meaning"; // default
        if (question.toLowerCase().includes("love") || question.toLowerCase().includes("relationship")) {
          focusArea = "love";
        } else if (question.toLowerCase().includes("job") || question.toLowerCase().includes("career") || question.toLowerCase().includes("work")) {
          focusArea = "career";
        }
        
        return `Position ${i + 1} - ${positionName}: ${card.name}
Traditional Meaning: ${meaning.meaning}
Specific Insight: ${meaning[focusArea] || meaning.meaning}
Key Advice: ${meaning.advice}`;
      }).join('\n\n');

      prompt = `You are Madam Shade Wolf, a professional tarot reader. Give a CLEAR, PRACTICAL reading with specific advice.

The seeker asks: "${question}"

Their cards:
${cardContext}

Provide a reading that:
1. Starts with a brief direct answer to their question
2. Explains each card's meaning in their specific position
3. Focuses on practical, actionable advice
4. Uses clear, simple language (no flowery prose)
5. Gives specific examples when possible

Format with HTML paragraphs. Be direct and helpful.`;
    } else {
      prompt = `As Madam Shade Wolf, continue providing clear, practical tarot guidance. 

Original question: "${originalQuestion}"

The seeker now asks: "${question}"

Give specific, actionable advice. Use clear, simple language. Format with HTML paragraphs.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are Madam Shade Wolf, a practical tarot reader. Give clear, direct readings focused on actionable advice. Avoid mystical language. Be specific and helpful."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.6, // Even lower for more consistent, practical responses
      max_tokens: 800
    });

    return res.status(200).json({
      response: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      response: "I apologize, but I'm having trouble connecting to the spiritual realm. Please try again in a moment."
    });
  }
}
