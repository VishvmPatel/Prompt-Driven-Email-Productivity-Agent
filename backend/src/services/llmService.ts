import OpenAI from 'openai';

const useMockLLM = process.env.USE_MOCK_LLM === 'true' || !process.env.OPENAI_API_KEY;
let openai: OpenAI | null = null;

if (!useMockLLM && process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function callLLM(prompt: string): Promise<string> {
  if (useMockLLM || !openai) {
    return mockLLMResponse(prompt);
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    
    return response.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return mockLLMResponse(prompt);
  }
}

function mockLLMResponse(prompt: string): string {
  // Simple mock responses based on prompt content
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('categorize') || lowerPrompt.includes('category')) {
    if (lowerPrompt.includes('urgent') || lowerPrompt.includes('maintenance') || lowerPrompt.includes('security')) {
      return 'urgent';
    }
    if (lowerPrompt.includes('invoice') || lowerPrompt.includes('billing') || lowerPrompt.includes('payment')) {
      return 'finance';
    }
    if (lowerPrompt.includes('meeting') || lowerPrompt.includes('project') || lowerPrompt.includes('work')) {
      return 'work';
    }
    if (lowerPrompt.includes('newsletter') || lowerPrompt.includes('subscription')) {
      return 'newsletter';
    }
    if (lowerPrompt.includes('lunch') || lowerPrompt.includes('birthday') || lowerPrompt.includes('friend')) {
      return 'personal';
    }
    return 'work';
  }
  
  if (lowerPrompt.includes('action') || lowerPrompt.includes('task')) {
    if (lowerPrompt.includes('meeting')) {
      return '1. Confirm availability for the meeting\n2. Respond with preferred time if Thursday 2 PM doesn\'t work';
    }
    if (lowerPrompt.includes('review') || lowerPrompt.includes('feedback')) {
      return '1. Review the attached files\n2. Provide feedback by the specified deadline';
    }
    if (lowerPrompt.includes('approval')) {
      return '1. Review the budget proposal\n2. Provide approval or feedback by end of week';
    }
    return 'No actions required.';
  }
  
  if (lowerPrompt.includes('reply') || lowerPrompt.includes('respond')) {
    if (lowerPrompt.includes('meeting')) {
      return 'Hi Sarah,\n\nThank you for reaching out. Thursday at 2 PM works well for me. I\'ll add it to my calendar.\n\nLooking forward to our discussion.\n\nBest regards';
    }
    if (lowerPrompt.includes('review')) {
      return 'Hi,\n\nThank you for sharing the files. I\'ll review them and provide feedback by Friday as requested.\n\nBest regards';
    }
    return 'Thank you for your email. I\'ll review the information and get back to you soon.\n\nBest regards';
  }
  
  if (lowerPrompt.includes('summary') || lowerPrompt.includes('summarize')) {
    if (lowerPrompt.includes('meeting')) {
      return 'Sarah Johnson is requesting a meeting to discuss Q4 planning strategy. She suggests Thursday at 2 PM and is asking for your availability.';
    }
    if (lowerPrompt.includes('project')) {
      return 'Mike Chen is providing an update on the website redesign project. Homepage mockups are complete and ready for review. Feedback is requested by Friday.';
    }
    return 'This email contains important information that requires your attention.';
  }
  
  if (lowerPrompt.includes('priority')) {
    if (lowerPrompt.includes('urgent') || lowerPrompt.includes('maintenance') || lowerPrompt.includes('security')) {
      return 'high';
    }
    if (lowerPrompt.includes('deadline') || lowerPrompt.includes('approval') || lowerPrompt.includes('meeting')) {
      return 'medium';
    }
    return 'low';
  }
  
  return 'I understand your request. Here is a helpful response based on the email content.';
}


