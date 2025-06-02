import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Comprehensive tarot card meanings
const cardMeanings = {
  "The Fool": {
    upright: "New beginnings, innocence, spontaneity, free spirit",
    reversed: "Recklessness, risk-taking, foolishness, lack of direction",
    meaning: "Taking a leap of faith into the unknown, starting fresh with childlike wonder",
    career: "New job opportunities, career changes, starting your own business, creative ventures",
    love: "Fresh start in relationships, meeting someone new, taking romantic risks, innocence in love",
    advice: "Be open to new experiences but stay grounded in reality",
    positions: {
      "Present Situation": "You're at the beginning of a new journey or phase in your life",
      "Challenges": "Naivety or lack of experience may be creating obstacles",
      "Distant Past": "Your foundation was built on taking risks and new experiences",
      "Recent Past": "You've recently embarked on something new or made a fresh start",
      "Possible Future": "A new adventure or opportunity is approaching",
      "Immediate Future": "Take that leap of faith you've been considering"
    }
  },
  "The Magician": {
    upright: "Manifestation, resourcefulness, power, inspired action, will",
    reversed: "Manipulation, poor planning, untapped talents, illusion",
    meaning: "You have all the tools and resources needed to succeed",
    career: "Using your skills effectively, time for action on projects, leadership opportunities, innovation",
    love: "Taking initiative in relationships, clear communication, making things happen, charisma",
    advice: "Focus your energy and talents toward your goals",
    positions: {
      "Present Situation": "You have the power and tools to manifest your desires",
      "Challenges": "You may be struggling to harness your full potential",
      "Distant Past": "Your foundation includes strong willpower and resourcefulness",
      "Recent Past": "You've recently discovered or used your personal power",
      "Possible Future": "A time of manifestation and achievement approaches",
      "Immediate Future": "Take action using all your available resources"
    }
  },
  "The High Priestess": {
    upright: "Intuition, sacred knowledge, divine feminine, subconscious mind",
    reversed: "Secrets, disconnected from intuition, withdrawal, hidden agendas",
    meaning: "Trust your inner wisdom and pay attention to dreams and intuition",
    career: "Hidden information at work, need for patience, research before decisions, trust instincts",
    love: "Unspoken feelings, need for emotional depth, secrets in relationships, intuitive connections",
    advice: "Look beyond the surface and trust your gut feelings",
    positions: {
      "Present Situation": "Hidden knowledge or intuitive insights are important now",
      "Challenges": "Secrets or lack of information are creating difficulties",
      "Distant Past": "Your foundation includes deep wisdom and intuitive abilities",
      "Recent Past": "You've recently gained important insights or hidden knowledge",
      "Possible Future": "Trust your intuition for what's coming",
      "Immediate Future": "Listen to your inner voice and pay attention to dreams"
    }
  },
  "The Empress": {
    upright: "Femininity, beauty, nature, nurturing, abundance, creativity",
    reversed: "Creative block, dependence on others, smothering, lack of growth",
    meaning: "A time of growth, creativity, and nurturing abundance",
    career: "Creative projects flourishing, teamwork, profitable ventures, growth period",
    love: "Deep emotional connections, fertility, nurturing relationships, beauty in love",
    advice: "Embrace creativity and nurture what you want to grow",
    positions: {
      "Present Situation": "You're in a period of abundance and creative growth",
      "Challenges": "Over-nurturing or creative blocks may be hindering progress",
      "Distant Past": "Your foundation includes creativity and nurturing energy",
      "Recent Past": "You've recently experienced growth or creative inspiration",
      "Possible Future": "Abundance and creative fulfillment are approaching",
      "Immediate Future": "Focus on nurturing your creative projects and relationships"
    }
  },
  "The Emperor": {
    upright: "Authority, establishment, structure, father figure, control",
    reversed: "Tyranny, rigidity, coldness, domination, lack of discipline",
    meaning: "Take charge of your life with discipline and strategic planning",
    career: "Leadership roles, establishing structure, dealing with authority figures, discipline",
    love: "Commitment, traditional relationships, protective partner, stability",
    advice: "Create stability through organization and leadership",
    positions: {
      "Present Situation": "You need to take control and establish structure",
      "Challenges": "Rigid thinking or authoritarian behavior is causing problems",
      "Distant Past": "Your foundation includes discipline and strong leadership",
      "Recent Past": "You've recently taken on more responsibility or authority",
      "Possible Future": "A time of leadership and structure is coming",
      "Immediate Future": "Take charge and organize your life with discipline"
    }
  },
  "The Hierophant": {
    upright: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions",
    reversed: "Personal beliefs, freedom, challenging the status quo, unconventional",
    meaning: "Seeking knowledge through traditional sources or spiritual guidance",
    career: "Working within established systems, mentorship, traditional career paths, education",
    love: "Traditional relationships, marriage, shared values and beliefs, conventional romance",
    advice: "Consider both traditional wisdom and your personal truth",
    positions: {
      "Present Situation": "Traditional wisdom or spiritual guidance is needed",
      "Challenges": "Conformity or rigid beliefs may be limiting you",
      "Distant Past": "Your foundation includes traditional values and beliefs",
      "Recent Past": "You've recently sought guidance from traditional sources",
      "Possible Future": "Spiritual growth or traditional commitments approach",
      "Immediate Future": "Seek wisdom from established traditions or mentors"
    }
  },
  "The Lovers": {
    upright: "Love, harmony, relationships, values alignment, choices in love",
    reversed: "Disharmony, imbalance, misalignment of values, difficult choices",
    meaning: "Important choices about relationships and personal values",
    career: "Business partnerships, team harmony, value-based decisions, collaboration",
    love: "Deep connections, soulmates, important relationship decisions, true love",
    advice: "Choose based on your true values and authentic self",
    positions: {
      "Present Situation": "Important relationship or value-based decisions are before you",
      "Challenges": "Conflicting values or relationship issues are causing problems",
      "Distant Past": "Your foundation includes important relationships and value systems",
      "Recent Past": "You've recently made important choices about love or values",
      "Possible Future": "Significant relationship developments are approaching",
      "Immediate Future": "Make choices that align with your deepest values"
    }
  },
  "The Chariot": {
    upright: "Control, willpower, success, determination, triumph over obstacles",
    reversed: "Lack of control, lack of direction, aggression, scattered energy",
    meaning: "Victory through maintaining focus and determination",
    career: "Career advancement, overcoming obstacles, competitive success, drive",
    love: "Taking control of your love life, overcoming relationship challenges, determination",
    advice: "Stay determined and maintain control over opposing forces",
    positions: {
      "Present Situation": "You're gaining control and moving toward victory",
      "Challenges": "Lack of direction or scattered energy is hindering progress",
      "Distant Past": "Your foundation includes strong willpower and determination",
      "Recent Past": "You've recently overcome obstacles through focused effort",
      "Possible Future": "Success through determination is approaching",
      "Immediate Future": "Take control and move forward with focused determination"
    }
  },
  "Strength": {
    upright: "Inner strength, courage, patience, control, compassion, gentle power",
    reversed: "Self-doubt, low energy, lack of confidence, inner turmoil",
    meaning: "Gentle strength and courage will overcome challenges",
    career: "Leading with compassion, patience with difficult situations, quiet confidence, inner power",
    love: "Patience in relationships, gentle approach to conflicts, emotional strength, loving power",
    advice: "Use gentle strength rather than force",
    positions: {
      "Present Situation": "You have the inner strength to handle current challenges",
      "Challenges": "Self-doubt or lack of confidence is weakening your position",
      "Distant Past": "Your foundation includes inner strength and courage",
      "Recent Past": "You've recently discovered or used your inner power",
      "Possible Future": "A time requiring gentle strength approaches",
      "Immediate Future": "Approach challenges with patience and inner strength"
    }
  },
  "The Hermit": {
    upright: "Soul searching, introspection, being alone, inner guidance, wisdom",
    reversed: "Isolation, loneliness, withdrawal from others, stubborn",
    meaning: "Time for introspection and seeking inner wisdom",
    career: "Working independently, seeking mentor guidance, career soul-searching, research",
    love: "Need for space, self-discovery before relationships, spiritual connection, independence",
    advice: "Take time alone to find your inner truth",
    positions: {
      "Present Situation": "You need solitude and introspection to find answers",
      "Challenges": "Isolation or withdrawal is causing problems",
      "Distant Past": "Your foundation includes wisdom gained through solitude",
      "Recent Past": "You've recently spent time in self-reflection",
      "Possible Future": "A period of soul-searching approaches",
      "Immediate Future": "Seek answers within yourself through quiet contemplation"
    }
  },
  "Wheel of Fortune": {
    upright: "Good luck, karma, life cycles, destiny, turning point, fate",
    reversed: "Bad luck, lack of control, clinging to control, missed opportunities",
    meaning: "Life cycles are turning, change is inevitable",
    career: "Unexpected opportunities, career changes, lucky breaks, cycles of success",
    love: "Fate bringing people together, relationship cycles, destiny in love, karmic connections",
    advice: "Go with the flow and be ready for change",
    positions: {
      "Present Situation": "You're at a turning point where fate is taking control",
      "Challenges": "Resistance to change or bad luck is creating obstacles",
      "Distant Past": "Your foundation was shaped by significant life cycles",
      "Recent Past": "You've recently experienced a major turning point",
      "Possible Future": "Fate and destiny will play important roles",
      "Immediate Future": "Prepare for changes beyond your control"
    }
  },
  "Justice": {
    upright: "Justice, fairness, truth, cause and effect, law, balance",
    reversed: "Unfairness, lack of accountability, dishonesty, bias",
    meaning: "Truth and justice will prevail, karma is at work",
    career: "Legal matters, contracts, fair treatment, ethical decisions, accountability",
    love: "Balanced relationships, fairness, important decisions, karmic relationships",
    advice: "Be honest and fair in all your dealings",
    positions: {
      "Present Situation": "Truth and fairness are crucial to your current situation",
      "Challenges": "Injustice or dishonesty is creating difficulties",
      "Distant Past": "Your foundation includes strong sense of justice and fairness",
      "Recent Past": "You've recently dealt with legal or ethical matters",
      "Possible Future": "Justice and truth will be revealed",
      "Immediate Future": "Make decisions based on fairness and truth"
    }
  },
  "The Hanged Man": {
    upright: "Suspension, restriction, letting go, sacrifice, new perspective, waiting",
    reversed: "Delays, resistance, stalling, indecision, avoiding sacrifice",
    meaning: "Pause and see things from a different perspective",
    career: "Career on hold, need for patience, different approach needed, waiting period",
    love: "Relationship in limbo, need for sacrifice, seeing partner differently, patience",
    advice: "Sometimes you need to let go to move forward",
    positions: {
      "Present Situation": "You're in a waiting period that requires patience",
      "Challenges": "Resistance to necessary changes is causing stagnation",
      "Distant Past": "Your foundation includes learning patience through sacrifice",
      "Recent Past": "You've recently had to wait or make sacrifices",
      "Possible Future": "A period of suspension or waiting approaches",
      "Immediate Future": "Practice patience and look at things from new angles"
    }
  },
  "Death": {
    upright: "Endings, beginnings, change, transformation, transition, rebirth",
    reversed: "Resistance to change, inability to move on, fear of change, stagnation",
    meaning: "Major transformation and renewal through endings",
    career: "Career transformation, job ending, complete change of direction, new phase",
    love: "Relationship transformation, endings leading to new beginnings, deep change",
    advice: "Embrace change as transformation, not loss",
    positions: {
      "Present Situation": "You're undergoing major transformation",
      "Challenges": "Fear of change or inability to let go is blocking progress",
      "Distant Past": "Your foundation was built through significant transformations",
      "Recent Past": "You've recently experienced major endings or changes",
      "Possible Future": "Profound transformation approaches",
      "Immediate Future": "Embrace the changes that are coming"
    }
  },
  "Temperance": {
    upright: "Balance, moderation, patience, purpose, healing, harmony",
    reversed: "Imbalance, excess, lack of long-term vision, impatience",
    meaning: "Finding balance and moderation in all things",
    career: "Work-life balance, patience with progress, collaborative efforts, steady growth",
    love: "Balanced relationships, patience, healing old wounds, harmony",
    advice: "Practice moderation and patience",
    positions: {
      "Present Situation": "Balance and moderation are needed in your current situation",
      "Challenges": "Imbalance or impatience is creating problems",
      "Distant Past": "Your foundation includes learning balance and patience",
      "Recent Past": "You've recently worked on achieving better balance",
      "Possible Future": "A period of harmony and healing approaches",
      "Immediate Future": "Focus on finding balance in all areas of life"
    }
  },
  "The Devil": {
    upright: "Bondage, addiction, sexuality, materialism, attachment, temptation",
    reversed: "Releasing limiting beliefs, breaking free, power reclaimed, enlightenment",
    meaning: "Breaking free from unhealthy patterns and attachments",
    career: "Feeling trapped in job, unhealthy work situations, materialism, power struggles",
    love: "Unhealthy relationships, obsession, sexual energy, codependency, toxic patterns",
    advice: "Recognize what binds you and choose freedom",
    positions: {
      "Present Situation": "You may be trapped by unhealthy patterns or attachments",
      "Challenges": "Addictions or negative patterns are creating obstacles",
      "Distant Past": "Your foundation includes learning about temptation and bondage",
      "Recent Past": "You've recently struggled with unhealthy attachments",
      "Possible Future": "Liberation from limiting beliefs approaches",
      "Immediate Future": "Break free from what's holding you back"
    }
  },
  "The Tower": {
    upright: "Sudden change, upheaval, chaos, revelation, awakening, destruction",
    reversed: "Personal transformation, fear of change, averting disaster, gradual change",
    meaning: "Sudden change that ultimately leads to liberation",
    career: "Job loss, company restructuring, sudden career changes, shocking revelations",
    love: "Relationship upheaval, sudden breakups or revelations, dramatic changes",
    advice: "What seems like disaster often leads to freedom",
    positions: {
      "Present Situation": "Sudden upheaval is shaking your foundations",
      "Challenges": "Resistance to necessary destruction is prolonging difficulties",
      "Distant Past": "Your foundation was built through surviving major upheavals",
      "Recent Past": "You've recently experienced shocking changes or revelations",
      "Possible Future": "Sudden change will clear the way for new growth",
      "Immediate Future": "Prepare for unexpected changes that will ultimately free you"
    }
  },
  "The Star": {
    upright: "Hope, faith, purpose, renewal, spirituality, healing, inspiration",
    reversed: "Lack of faith, despair, disconnection, discouragement, lost hope",
    meaning: "Renewed hope and healing after difficult times",
    career: "New opportunities, inspiration, positive outlook for future, spiritual calling",
    love: "Healing after heartbreak, hope for love, spiritual connections, renewed faith",
    advice: "Have faith - the universe is guiding you",
    positions: {
      "Present Situation": "Hope and healing are available to you now",
      "Challenges": "Loss of faith or discouragement is dimming your light",
      "Distant Past": "Your foundation includes spiritual faith and hope",
      "Recent Past": "You've recently found renewed hope or inspiration",
      "Possible Future": "A time of healing and spiritual renewal approaches",
      "Immediate Future": "Trust in the guidance you're receiving"
    }
  },
  "The Moon": {
    upright: "Illusion, fear, anxiety, subconscious, intuition, dreams, mystery",
    reversed: "Release of fear, repressed emotion, clarity, truth revealed",
    meaning: "Things are not as they seem, trust your intuition",
    career: "Unclear situations, deception, need to trust instincts, hidden information",
    love: "Emotional confusion, secrets, intuitive connections, illusions in love",
    advice: "Face your fears and trust your inner voice",
    positions: {
      "Present Situation": "Illusions or confusion are clouding your judgment",
      "Challenges": "Fear or anxiety is preventing clear thinking",
      "Distant Past": "Your foundation includes navigating through confusion and illusion",
      "Recent Past": "You've recently dealt with deception or unclear situations",
      "Possible Future": "Truth will emerge from current confusion",
      "Immediate Future": "Trust your intuition to guide you through uncertainty"
    }
  },
  "The Sun": {
    upright: "Joy, success, celebration, positivity, vitality, confidence, achievement",
    reversed: "Inner child, feeling down, overly optimistic, temporary setbacks",
    meaning: "Success, happiness, and positive outcomes",
    career: "Career success, recognition, achieving goals, promotion, public acclaim",
    love: "Happy relationships, engagement, celebration of love, joy in partnership",
    advice: "Embrace joy and share your light with others",
    positions: {
      "Present Situation": "Success and happiness are illuminating your path",
      "Challenges": "Overconfidence or temporary setbacks may be dimming your shine",
      "Distant Past": "Your foundation includes joy and successful achievements",
      "Recent Past": "You've recently experienced success or recognition",
      "Possible Future": "A time of great joy and achievement approaches",
      "Immediate Future": "Celebrate your successes and share your positive energy"
    }
  },
  "Judgement": {
    upright: "Reflection, reckoning, inner calling, rebirth, decisions, awakening",
    reversed: "Self-doubt, harsh self-judgment, avoidance, lack of forgiveness",
    meaning: "Time for honest self-evaluation and rebirth",
    career: "Performance reviews, major career decisions, calling to purpose, second chances",
    love: "Relationship evaluation, forgiveness, second chances, spiritual love",
    advice: "Be honest with yourself and answer your calling",
    positions: {
      "Present Situation": "You're being called to higher purpose and self-evaluation",
      "Challenges": "Self-judgment or avoidance is preventing growth",
      "Distant Past": "Your foundation includes important awakenings and rebirths",
      "Recent Past": "You've recently undergone significant self-reflection",
      "Possible Future": "A major awakening or calling approaches",
      "Immediate Future": "Answer the call to your higher purpose"
    }
  },
  "The World": {
    upright: "Completion, accomplishment, travel, unity, fulfillment, success",
    reversed: "Incomplete, no closure, seeking perfection, unfulfilled goals",
    meaning: "Successful completion and wholeness achieved",
    career: "Career goals achieved, international opportunities, success, completion of projects",
    love: "Relationship fulfillment, completion of cycle, unity, perfect love",
    advice: "Celebrate your achievements and prepare for new cycles",
    positions: {
      "Present Situation": "You're approaching completion of an important life cycle",
      "Challenges": "Perfectionism or inability to finish is preventing fulfillment",
      "Distant Past": "Your foundation includes significant achievements and completions",
      "Recent Past": "You've recently accomplished something important",
      "Possible Future": "Ultimate fulfillment and success approach",
      "Immediate Future": "Complete your current endeavors and prepare for new beginnings"
    }
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
      // Build a detailed context with card meanings and positions
      let cardContext = cards.map((card, i) => {
        const meaning = cardMeanings[card.name] || { 
          meaning: "Mystery card", 
          positions: { [card.positionName]: "Hidden meaning to be revealed" }
        };
        
        const positionName = card.positionName || positions[i];
        const orientation = card.reversed ? "Reversed" : "Upright";
        
        // Get position-specific meaning
        const positionMeaning = meaning.positions[positionName] || meaning.meaning;
        const orientationMeaning = card.reversed ? meaning.reversed : meaning.upright;
        
        // Determine which aspect to focus on based on the question
        let focusArea = "meaning"; // default
        if (question.toLowerCase().includes("love") || question.toLowerCase().includes("relationship") || question.toLowerCase().includes("romance")) {
          focusArea = "love";
        } else if (question.toLowerCase().includes("job") || question.toLowerCase().includes("career") || question.toLowerCase().includes("work") || question.toLowerCase().includes("business")) {
          focusArea = "career";
        }
        
        return `Position ${i + 1} - ${positionName}: ${card.name} (${orientation})
Position-Specific Meaning: ${positionMeaning}
Card Orientation: ${orientationMeaning}
General Meaning: ${meaning.meaning}
Relevant Focus (${focusArea}): ${meaning[focusArea] || meaning.meaning}
Key Advice: ${meaning.advice}`;
      }).join('\n\n');

      prompt = `You are Madam Shade Wolf, a professional tarot reader with deep mystical knowledge. Give a COMPREHENSIVE, PRACTICAL reading with specific, actionable advice.

The seeker asks: "${question}"

Their 6-card Universal Spread:
${cardContext}

IMPORTANT READING GUIDELINES:
1. Start with a brief, direct answer to their question (2-3 sentences)
2. Explain each card's meaning specifically in its position, mentioning whether it's upright or reversed
3. Connect the cards to each other to tell a coherent story about their situation
4. Focus on practical, actionable advice they can implement
5. Address their specific question throughout the reading
6. Use clear, engaging language that feels personal and insightful
7. End with a powerful summary and next steps

The 6 positions represent:
- Position 1 (Present Situation): Their current reality and circumstances
- Position 2 (Challenges): Hidden influences and obstacles affecting them
- Position 3 (Distant Past): The foundation that shaped their current situation
- Position 4 (Recent Past): What's leaving their life or recent influences
- Position 5 (Possible Future): What's approaching if they continue on current path
- Position 6 (Immediate Future): Their next steps and immediate guidance

Format with HTML paragraphs for readability. Be direct, insightful, and deeply helpful.`;
    } else {
      // For follow-up questions, include card context but focus on the new question
      let cardSummary = cards.map((card, i) => {
        const orientation = card.reversed ? "Reversed" : "Upright";
        return `${card.positionName}: ${card.name} (${orientation})`;
      }).join(', ');

      prompt = `As Madam Shade Wolf, continue providing clear, practical tarot guidance based on their original reading.

Original question: "${originalQuestion}"
Original cards drawn: ${cardSummary}

The seeker now asks: "${question}"

Provide specific, actionable advice that connects to their original cards and reading. Reference specific cards when relevant to their new question. Use clear, engaging language and format with HTML paragraphs.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are Madam Shade Wolf, a professional tarot reader who combines mystical wisdom with practical guidance. Your readings are insightful, specific, and actionable. You understand that each card's meaning changes based on its position in the spread and whether it appears upright or reversed. You connect cards together to tell a coherent story and always provide practical advice the seeker can use in their daily life."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1200
    });

    return res.status(200).json({
      response: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      response: "I apologize, but the mystical energies are disrupted at the moment. The spirits are having difficulty reaching through the veil. Please try again in a few moments, and I will consult the cards once more for you."
    });
  }
}
