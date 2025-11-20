import { getDatabase } from '../db/database';

export function initMockInbox(): void {
  const db = getDatabase();
  const insert = db.prepare(`
    INSERT INTO emails (subject, from_email, from_name, to_email, body, date, read, category, priority)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const emails = [
    {
      subject: "Meeting Request: Q4 Planning Discussion",
      from_email: "sarah.johnson@company.com",
      from_name: "Sarah Johnson",
      to_email: "you@example.com",
      body: "Hi,\n\nI'd like to schedule a meeting to discuss our Q4 planning strategy. Are you available this Thursday at 2 PM?\n\nLet me know what works for you.\n\nBest regards,\nSarah",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: 0,
      category: null,
      priority: null
    },
    {
      subject: "Project Update: Website Redesign Status",
      from_email: "mike.chen@designstudio.com",
      from_name: "Mike Chen",
      to_email: "you@example.com",
      body: "Hello,\n\nThe website redesign is progressing well. We've completed the homepage mockups and are ready for your review. Can you take a look at the attached files and provide feedback by Friday?\n\nThanks!\nMike",
      date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      read: 0,
      category: null,
      priority: null
    },
    {
      subject: "Invoice #INV-2024-001",
      from_email: "billing@services.com",
      from_name: "Billing Department",
      to_email: "you@example.com",
      body: "Dear Customer,\n\nPlease find attached invoice #INV-2024-001 for services rendered in November 2024.\n\nPayment is due within 30 days.\n\nThank you for your business.\n\nBilling Department",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: 1,
      category: null,
      priority: null
    },
    {
      subject: "Re: Budget Approval Needed",
      from_email: "finance@company.com",
      from_name: "Finance Team",
      to_email: "you@example.com",
      body: "Hi,\n\nFollowing up on the budget request. We need your approval for the marketing campaign budget by end of week.\n\nPlease review the attached proposal and let us know if you have any questions.\n\nRegards,\nFinance Team",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      read: 0,
      category: null,
      priority: null
    },
    {
      subject: "Welcome to Our Newsletter!",
      from_email: "newsletter@technews.com",
      from_name: "Tech News",
      to_email: "you@example.com",
      body: "Thank you for subscribing to our newsletter!\n\nThis week's highlights:\n- New AI developments\n- Tech industry trends\n- Product launches\n\nRead more on our website.\n\nTech News Team",
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      read: 0,
      category: null,
      priority: null
    },
    {
      subject: "Urgent: Server Maintenance Tonight",
      from_email: "it@company.com",
      from_name: "IT Department",
      to_email: "you@example.com",
      body: "URGENT NOTICE\n\nWe will be performing critical server maintenance tonight from 11 PM to 2 AM. The system will be unavailable during this time.\n\nPlease save your work and log out before 11 PM.\n\nIT Department",
      date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      read: 0,
      category: null,
      priority: null
    },
    {
      subject: "Re: Follow-up on Your Application",
      from_email: "hr@startup.com",
      from_name: "HR Team",
      to_email: "you@example.com",
      body: "Hello,\n\nThank you for your interest in the Software Engineer position. We'd like to invite you for a second round interview.\n\nPlease let us know your availability for next week.\n\nBest regards,\nHR Team",
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      read: 1,
      category: null,
      priority: null
    },
    {
      subject: "Your Order Has Shipped!",
      from_email: "orders@onlinestore.com",
      from_name: "Online Store",
      to_email: "you@example.com",
      body: "Great news! Your order #12345 has been shipped.\n\nTracking number: TRACK123456789\n\nExpected delivery: December 15, 2024\n\nThank you for your purchase!\n\nOnline Store Team",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: 1,
      category: null,
      priority: null
    },
    {
      subject: "Team Lunch This Friday?",
      from_email: "colleague@company.com",
      from_name: "Alex Martinez",
      to_email: "you@example.com",
      body: "Hey!\n\nA few of us are planning to grab lunch this Friday at the new Italian place downtown. Want to join us?\n\nLet me know!\n\nAlex",
      date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      read: 0,
      category: null,
      priority: null
    },
    {
      subject: "Security Alert: New Login Detected",
      from_email: "security@account.com",
      from_name: "Security Team",
      to_email: "you@example.com",
      body: "We detected a new login to your account from a new device.\n\nLocation: San Francisco, CA\nDevice: Chrome on Windows\nTime: Today at 3:45 PM\n\nIf this was you, no action is needed. If not, please secure your account immediately.\n\nSecurity Team",
      date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: 0,
      category: null,
      priority: null
    },
    {
      subject: "Conference Registration Confirmation",
      from_email: "events@techconf.com",
      from_name: "Tech Conference 2024",
      to_email: "you@example.com",
      body: "Thank you for registering for Tech Conference 2024!\n\nYour registration is confirmed. We'll send you more details about the schedule and venue closer to the event date.\n\nSee you there!\n\nConference Team",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      read: 1,
      category: null,
      priority: null
    },
    {
      subject: "Re: Contract Review",
      from_email: "legal@company.com",
      from_name: "Legal Department",
      to_email: "you@example.com",
      body: "Hi,\n\nI've reviewed the contract and made some suggested changes. Please see the attached document with my comments.\n\nWe should discuss these points before finalizing. Are you available for a call this week?\n\nBest,\nLegal Team",
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      read: 0,
      category: null,
      priority: null
    },
    {
      subject: "Happy Birthday!",
      from_email: "friend@email.com",
      from_name: "Jessica",
      to_email: "you@example.com",
      body: "Happy Birthday! 🎉\n\nHope you have an amazing day! Let's celebrate this weekend!\n\nJessica",
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      read: 1,
      category: null,
      priority: null
    },
    {
      subject: "Reminder: Team Standup Tomorrow",
      from_email: "manager@company.com",
      from_name: "David Kim",
      to_email: "you@example.com",
      body: "Just a reminder that we have our weekly team standup tomorrow at 9 AM.\n\nPlease come prepared with updates on your current projects.\n\nThanks,\nDavid",
      date: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      read: 0,
      category: null,
      priority: null
    },
    {
      subject: "Survey: How was your experience?",
      from_email: "feedback@service.com",
      from_name: "Customer Feedback",
      to_email: "you@example.com",
      body: "Hi there,\n\nWe'd love to hear about your recent experience with our service. Could you take a quick 2-minute survey?\n\nYour feedback helps us improve!\n\nThank you,\nCustomer Feedback Team",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      read: 0,
      category: null,
      priority: null
    }
  ];
  
  const insertMany = db.transaction((emails) => {
    for (const email of emails) {
      insert.run(
        email.subject,
        email.from_email,
        email.from_name,
        email.to_email,
        email.body,
        email.date,
        email.read,
        email.category,
        email.priority
      );
    }
  });
  
  insertMany(emails);
  console.log(`✅ Initialized ${emails.length} mock emails`);
}










