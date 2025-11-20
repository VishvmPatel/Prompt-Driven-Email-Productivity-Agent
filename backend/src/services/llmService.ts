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

type ParsedEmail = {
  subject?: string
  fromName?: string
  body?: string
}

function extractEmailFields(prompt: string): ParsedEmail {
  const subjectMatch = prompt.match(/Subject:\s*(.+)/i)
  const fromMatch = prompt.match(/From:\s*([^\n<]+)/i)
  const bodyMatch = prompt.match(/Body:\s*([\s\S]+)/i)

  return {
    subject: subjectMatch?.[1]?.trim(),
    fromName: fromMatch?.[1]?.trim(),
    body: bodyMatch?.[1]?.trim(),
  }
}

function buildReplyForEmail(email: ParsedEmail): string {
  const fromName = email.fromName || 'there'
  const subject = email.subject || 'your email'
  const body = email.body?.toLowerCase() || ''

  let middle = `I appreciate the update about "${subject}".`

  if (body.includes('maintenance')) {
    middle = "Thanks for the heads-up about tonight's maintenance. I'll make sure to save my work and log out before the outage window."
  } else if (body.includes('meeting')) {
    middle = 'Thanks for reaching out—those meeting times work for me. Let me know if a different slot is better for you.'
  } else if (body.includes('invoice') || body.includes('payment') || body.includes('billing')) {
    middle = 'I received the invoice and will review the details. Expect confirmation once the payment is scheduled.'
  } else if (body.includes('review') || body.includes('feedback')) {
    middle = "I'll review the materials and share feedback by the requested deadline."
  } else if (body.includes('interview')) {
    middle = 'Thank you for the invitation. I’m available and happy to confirm a time that works best for the team.'
  } else if (body.includes('lunch') || body.includes('celebrate')) {
    middle = "I'd love to join—count me in! Thanks for including me."
  } else if (body.includes('budget')) {
    middle = 'I’ll go through the budget details and share my approval or questions shortly.'
  } else if (body.includes('security') || body.includes('alert')) {
    middle = "Thanks for the security notice. I'll review the account activity right away."
  }

  return `Hi ${fromName},\n\n${middle}\n\nBest regards,`
}

function determineCategory(email: ParsedEmail): string {
  const body = email.body?.toLowerCase() || ''
  const subject = email.subject?.toLowerCase() || ''

  if (body.includes('urgent') || body.includes('maintenance') || body.includes('security alert')) {
    return 'urgent'
  }
  if (body.includes('invoice') || body.includes('payment') || body.includes('billing')) {
    return 'finance'
  }
  if (body.includes('meeting') || body.includes('project') || body.includes('interview') || subject.includes('meeting')) {
    return 'work'
  }
  if (body.includes('newsletter') || subject.includes('newsletter')) {
    return 'newsletter'
  }
  if (body.includes('birthday') || body.includes('lunch') || body.includes('celebrate')) {
    return 'personal'
  }
  return 'work'
}

function determinePriority(email: ParsedEmail): string {
  const body = email.body?.toLowerCase() || ''
  if (body.includes('urgent') || body.includes('immediately') || body.includes('critical') || body.includes('security')) {
    return 'high'
  }
  if (body.includes('deadline') || body.includes('review by') || body.includes('approval')) {
    return 'medium'
  }
  return 'low'
}

function summarizeEmail(email: ParsedEmail): string {
  const subject = email.subject || 'the email'
  const fromName = email.fromName || 'the sender'
  const body = email.body?.toLowerCase() || ''

  if (body.includes('maintenance')) {
    return `${fromName} is warning about scheduled maintenance tonight. Systems will be unavailable during the window, so save work and log out beforehand.`
  }
  if (body.includes('new login') || body.includes('secure your account')) {
    return `${fromName} detected a new login to your account from a different device/location. If you don’t recognize it, secure the account immediately.`
  }
  if (body.includes('invoice') || body.includes('payment')) {
    return `${fromName} sent an invoice for recent services and requests payment within the stated terms.`
  }
  if (body.includes('meeting') || body.includes('available')) {
    return `${fromName} is trying to schedule a meeting and is asking for your availability.`
  }
  if (body.includes('feedback') || body.includes('review')) {
    return `${fromName} shared materials and needs your review and feedback by the requested deadline.`
  }
  return `${fromName} wrote about "${subject}". Review the details and respond as needed.`
}

function extractActionsFromEmail(email: ParsedEmail): string {
  const body = email.body?.toLowerCase() || ''
  const actions: string[] = []

  if (body.includes('log out') || body.includes('save your work')) {
    actions.push('Save work and log out before the maintenance window.')
  }
  if (body.includes('secure your account')) {
    actions.push('Secure the account immediately if the login was not you.')
  }
  if (body.includes('review') || body.includes('feedback')) {
    actions.push('Review the attached materials and provide feedback by the requested deadline.')
  }
  if (body.includes('schedule') || body.includes('availability') || body.includes('meeting')) {
    actions.push('Reply with your availability to schedule the meeting/interview.')
  }
  if (body.includes('invoice') || body.includes('payment')) {
    actions.push('Process the invoice and arrange payment within the stated terms.')
  }

  if (actions.length === 0) {
    return 'No actions required.'
  }

  return actions.map((action, index) => `${index + 1}. ${action}`).join('\n')
}

function extractUserQuestion(prompt: string): string {
  const match = prompt.match(/User's question:\s*([\s\S]*?)(?:Provide a helpful|$)/i)
  return match ? match[1].trim() : ''
}

function mockLLMResponse(prompt: string): string {
  // Simple mock responses based on prompt content
  const lowerPrompt = prompt.toLowerCase();
  const parsedEmail = extractEmailFields(prompt);
  const userQuestion = extractUserQuestion(prompt).toLowerCase();
  const promptForIntent = userQuestion || lowerPrompt;
  const actionMatch = prompt.match(/\[ACTION:(.+?)\]/i);
  const forcedAction = actionMatch?.[1]?.trim().toLowerCase();

  if (forcedAction) {
    switch (forcedAction) {
      case 'category':
        return determineCategory(parsedEmail);
      case 'actions':
        return extractActionsFromEmail(parsedEmail);
      case 'reply':
        return buildReplyForEmail(parsedEmail);
      case 'summary':
        return summarizeEmail(parsedEmail);
      case 'priority':
        return determinePriority(parsedEmail);
    }
  }

  const wantsReply =
    promptForIntent.includes('reply') ||
    promptForIntent.includes('draft') ||
    promptForIntent.includes('respond');
  if (wantsReply) {
    return buildReplyForEmail(parsedEmail);
  }
  
  if (promptForIntent.includes('categorize') || promptForIntent.includes('category')) {
    return determineCategory(parsedEmail);
  }
  
  if (promptForIntent.includes('action') || promptForIntent.includes('task')) {
    return extractActionsFromEmail(parsedEmail);
  }
  
  if (promptForIntent.includes('summary') || promptForIntent.includes('summarize')) {
    return summarizeEmail(parsedEmail);
  }
  
  if (promptForIntent.includes('priority')) {
    return determinePriority(parsedEmail);
  }
  
  return 'I understand your request. Here is a helpful response based on the email content.';
}




