# 🎬 Demo Video Script - Smart Inbox

## Video Structure: ~8-10 minutes

---

## [0:00-0:30] Introduction & Overview

**Script:**
"Welcome to Smart Inbox! This is an intelligent email management system powered by Google Gemini AI that helps you process, organize, and respond to emails more efficiently.

Today, I'll show you how this full-stack application uses AI to categorize emails, extract actionable items, generate intelligent replies, and much more. Let's dive in!"

**Actions:**
- Show the main application interface
- Point out the sidebar navigation
- Highlight the modern, clean UI

---

## [0:30-1:30] Exploring the Inbox

**Script:**
"First, let's look at the inbox. The application comes pre-loaded with 25 diverse sample emails covering various real-world scenarios - from urgent work requests to personal messages and newsletters.

Notice how each email shows the sender, subject, and date. I can click on any email to view its full details. The interface is fully responsive and includes a beautiful dark mode - let me toggle that so you can see it in action."

**Actions:**
- Scroll through the inbox list
- Click on an email to show the detail view
- Toggle dark mode on/off
- Show the email metadata (from, to, date)

---

## [1:30-3:00] LLM-Powered Email Processing

**Script:**
"Now, here's where the AI magic happens. When I select an email, I get access to powerful LLM-driven actions powered by Google Gemini. Let me demonstrate:

**Categorization:** I'll click 'Categorize' to automatically classify this email. Watch as Gemini analyzes the content and assigns it to a category like 'work', 'urgent', 'personal', or 'newsletter'.

**Action Extraction:** Next, let's extract actionable items. This identifies specific tasks and next steps from the email content.

**Summarization:** For longer emails, I can get a concise summary that captures the key points.

**Priority Assessment:** The AI can also assess the urgency and importance level of each email.

**Draft Reply:** And my favorite feature - I can generate a context-aware reply draft. Notice how it creates a professional, personalized response that acknowledges the original message and addresses any questions or requests."

**Actions:**
- Select an email
- Click "Categorize" - show the category badge appearing
- Click "Extract Actions" - show the actions list
- Click "Summarize" - show the summary
- Click "Assess Priority" - show priority level
- Click "Draft Reply" - show the generated reply in the Draft Manager

---

## [3:00-4:00] Draft Management

**Script:**
"Speaking of drafts, let's look at the Draft Manager. When I generate a reply, it automatically loads here. I can edit the subject, recipient, or body before saving. 

Important note: The application never auto-sends emails - all drafts require manual review. This gives you full control while leveraging AI assistance.

I can save multiple drafts, edit them later, or delete ones I no longer need. This is perfect for managing your email workflow."

**Actions:**
- Show the Draft Manager panel
- Edit a draft (change subject or body)
- Save the draft
- Show the drafts list
- Delete a draft

---

## [4:00-5:00] Prompt Brain - Custom Templates

**Script:**
"One of the most powerful features is the Prompt Brain. This lets you create and manage custom prompt templates that control how the AI processes emails.

The application comes with 5 default templates for categorization, action extraction, auto-reply, summarization, and priority assessment. But you can create your own!

Let me show you how to create a custom template. I'll give it a name, select a type, and write a prompt template using placeholders like {subject}, {from_name}, {body}, and so on.

This level of customization means you can tailor the AI's behavior to match your specific workflow and communication style."

**Actions:**
- Navigate to Prompt Brain
- Show the list of existing templates
- Click on a template to show its content
- Click "New Template"
- Create a custom template with placeholders
- Save it
- Show how it can be edited or deleted

---

## [5:00-6:00] Email Agent Chat

**Script:**
"Another interactive feature is the Email Agent Chat. This is like having a conversation with an AI assistant about your emails.

I can select an email and ask questions like 'What are the next steps?' or 'Summarize this email'. The AI provides contextual responses based on the email content.

There are also quick prompt chips for common actions. The conversation history is maintained, so I can have a back-and-forth discussion about the email."

**Actions:**
- Navigate to Email Agent section
- Select an email
- Type a question: "What are the key points in this email?"
- Show the AI response
- Use a quick prompt chip
- Show conversation history
- Clear the chat

---

## [6:00-7:00] Email Organization Features

**Script:**
"The application also includes smart organization features. I can pin important emails to keep them at the top of the inbox, or archive emails I've completed.

Pinned emails are visually distinguished and stay at the top. Archived emails are moved out of the main inbox but can be restored if needed.

These features work seamlessly with the AI processing - I can categorize an email, pin it, and then archive it once I've handled it."

**Actions:**
- Pin an email (show pin icon)
- Show pinned email at top
- Archive an email
- Show archived section
- Restore an archived email

---

## [7:00-7:30] Technical Highlights

**Script:**
"Before we wrap up, let me highlight some technical aspects:

This is a full-stack TypeScript application with a React frontend and Express.js backend. It uses SQLite for data persistence and integrates with Google Gemini AI.

The application is deployed on Vercel for both frontend and backend, making it scalable and production-ready. All the code is well-commented and follows best practices.

The AI integration is flexible - you can use the real Gemini API or a mock service for development. The status endpoint shows which provider is active."

**Actions:**
- Show the browser console (optional)
- Mention the tech stack
- Show the clean, modern UI again

---

## [7:30-8:00] Closing & Key Takeaways

**Script:**
"To summarize, Smart Inbox provides:

✅ AI-powered email categorization and processing
✅ Intelligent reply generation
✅ Customizable prompt templates
✅ Interactive chat agent
✅ Smart organization tools
✅ Beautiful, responsive UI with dark mode
✅ Production-ready deployment

This tool demonstrates how modern AI can enhance productivity workflows while maintaining user control and safety - remember, it never auto-sends emails!

Thank you for watching! If you're interested in the code or want to deploy your own instance, check out the repository. The README includes complete deployment instructions for Vercel.

See you next time!"

**Actions:**
- Show the full application one more time
- Highlight key features
- End screen with repository link (if applicable)

---

## 🎥 Production Tips

### Before Recording:
1. **Prepare Test Data**: Make sure you have interesting emails selected that showcase different features
2. **Check AI Integration**: Verify Gemini API is working (check `/api/llm/status`)
3. **Clear Browser Cache**: Ensure you're showing the latest version
4. **Prepare Script**: Have this script open in a second monitor or printed out
5. **Test Audio**: Check microphone levels and background noise

### During Recording:
1. **Speak Clearly**: Pause between sections, don't rush
2. **Show, Don't Tell**: Let the UI speak for itself
3. **Handle Errors Gracefully**: If something doesn't work, acknowledge it and move on
4. **Use Zoom**: Zoom in on important UI elements when demonstrating features
5. **Smooth Transitions**: Use fade transitions between major sections

### Post-Production:
1. **Add Annotations**: Use arrows or highlights to point out key features
2. **Add Subtitles**: Include text overlays for important points
3. **Background Music**: Add subtle background music (optional)
4. **Intro/Outro**: Add a branded intro and outro
5. **Thumbnail**: Create an engaging thumbnail with key features listed

### Key Moments to Highlight:
- ⭐ The moment AI categorizes an email (show the category badge appearing)
- ⭐ Generating a reply draft (show the formatted email body)
- ⭐ Creating a custom prompt template
- ⭐ Chat agent responding to a question
- ⭐ Dark mode toggle

### Timing Breakdown:
- Introduction: 30 seconds
- Inbox Overview: 1 minute
- LLM Features: 1.5 minutes
- Draft Manager: 1 minute
- Prompt Brain: 1 minute
- Chat Agent: 1 minute
- Organization: 1 minute
- Technical: 30 seconds
- Closing: 30 seconds
- **Total: ~8-9 minutes**

---

## 📝 Quick Reference Checklist

- [ ] Show inbox with 25 sample emails
- [ ] Demonstrate dark mode toggle
- [ ] Show all 5 LLM actions (categorize, actions, summarize, priority, reply)
- [ ] Generate and edit a draft
- [ ] Create a custom prompt template
- [ ] Use the chat agent with a question
- [ ] Pin and archive emails
- [ ] Mention tech stack and deployment
- [ ] Highlight safety (no auto-send)

---

**Good luck with your demo video! 🎬**


