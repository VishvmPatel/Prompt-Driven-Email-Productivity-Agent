import { getDatabase } from '../db/database';

export function initDefaultPrompts(): void {
  const db = getDatabase();
  const insert = db.prepare(`
    INSERT INTO prompt_templates (name, description, template, type, updated_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);
  
  const prompts = [
    {
      name: "Email Categorization",
      description: "Categorize emails into predefined categories",
      template: `Analyze the following email and categorize it into one of these categories:
- urgent: Requires immediate attention
- work: Work-related tasks and communications
- personal: Personal messages
- newsletter: Newsletters and subscriptions
- spam: Unwanted or suspicious emails
- finance: Bills, invoices, and financial matters
- social: Social invitations and casual messages

Email:
Subject: {subject}
From: {from_name} <{from_email}>
Body: {body}

Respond with only the category name.`,
      type: "categorization"
    },
    {
      name: "Action Extraction",
      description: "Extract actionable items from emails",
      template: `Analyze the following email and extract any actionable items or tasks mentioned.

Email:
Subject: {subject}
From: {from_name} <{from_email}>
Body: {body}

List all actionable items in a clear, concise format. If there are no actions, respond with "No actions required."`,
      type: "action_extraction"
    },
    {
      name: "Auto-Reply Draft",
      description: "Generate a professional reply draft",
      template: `Generate a professional email reply for the following email. The reply should be:
- Polite and professional
- Address all points mentioned in the original email
- Appropriate in tone and length
- Ready to send (but user will review before sending)

Original Email:
Subject: {subject}
From: {from_name} <{from_email}>
Body: {body}

Generate only the reply body text.`,
      type: "reply_draft"
    },
    {
      name: "Email Summary",
      description: "Create a concise summary of the email",
      template: `Summarize the following email in 2-3 sentences, highlighting:
- Main purpose or topic
- Key points or requests
- Any deadlines or important dates

Email:
Subject: {subject}
From: {from_name} <{from_email}>
Body: {body}

Provide a concise summary.`,
      type: "summary"
    },
    {
      name: "Priority Assessment",
      description: "Assess the priority level of an email",
      template: `Analyze the following email and determine its priority level:
- high: Urgent, requires immediate attention, has deadlines
- medium: Important but not urgent, should be addressed soon
- low: Can be handled later, informational only

Email:
Subject: {subject}
From: {from_name} <{from_email}>
Body: {body}

Respond with only the priority level (high, medium, or low).`,
      type: "priority"
    }
  ];
  
  const insertMany = db.transaction((prompts) => {
    for (const prompt of prompts) {
      insert.run(
        prompt.name,
        prompt.description,
        prompt.template,
        prompt.type
      );
    }
  });
  
  insertMany(prompts);
  console.log(`✅ Initialized ${prompts.length} default prompt templates`);
}


