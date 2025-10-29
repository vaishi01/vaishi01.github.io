# EmailJS Quick Start Guide

This is a step-by-step visual guide to set up your EmailJS account and get your contact form working.

## What You Need to Get

You'll need these 3 pieces of information from EmailJS:
1. **Public Key** - from Account Settings
2. **Service ID** - from Email Services
3. **Template ID** - from Email Templates

---

## Step 1: Create EmailJS Account

1. Go to: **https://www.emailjs.com/**
2. Click **"Sign Up Free"** button
3. Choose to sign up with:
   - Your email address, OR
   - Google (recommended if using Gmail)
4. Verify your email if needed

---

## Step 2: Create Your Email Service (Gmail)

1. After logging in, go to: **https://dashboard.emailjs.com/admin/integration**
2. Click the **"Add New Service"** button
3. Select **Gmail** from the list
4. Click **"Connect Account"**
5. Sign in with: **vaishnavi.jaligama@gmail.com**
6. Authorize EmailJS to access your Gmail
7. Click **"Create Service"**

**Copy your Service ID** - it looks like: `service_xxxxxxxxxx`

---

## Step 3: Create Your Email Template

1. Go to: **https://dashboard.emailjs.com/admin/templates**
2. Click **"Create New Template"** button
3. Set up your template:

### Template Settings:
- **Service:** Select the Gmail service you just created
- **Template Name:** Contact Form Message

### Email Template Configuration:

**To Email:** (leave empty to use the email from your Gmail service)

**From Name:** `{{from_name}}`

**From Email:** (leave empty)

**Reply To:** `{{from_email}}`

**Subject:** `New Contact Form Message: {{subject}}`

**Content** (choose HTML format):
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4f46e5; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9fafb; padding: 20px; margin-top: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #4f46e5; }
    .message-box { background-color: white; padding: 15px; border-left: 4px solid #4f46e5; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    
    <div class="content">
      <p>You have received a new message from your portfolio contact form.</p>
      
      <div class="field">
        <span class="label">From:</span> {{from_name}}
      </div>
      
      <div class="field">
        <span class="label">Email:</span> {{from_email}}
      </div>
      
      <div class="field">
        <span class="label">Phone:</span> {{phone}}
      </div>
      
      <div class="field">
        <span class="label">Subject:</span> {{subject}}
      </div>
      
      <div class="message-box">
        <div class="label">Message:</div>
        <p>{{message}}</p>
      </div>
      
      <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #666; margin-top: 20px;">
        This email was automatically sent from your portfolio contact form.
      </p>
    </div>
  </div>
</body>
</html>
```

4. Click **"Save"**
5. **Copy your Template ID** - it looks like: `template_xxxxxxxxxx`

---

## Step 4: Get Your Public Key

1. Go to: **https://dashboard.emailjs.com/admin/account**
2. Scroll down to the **"API Keys"** section
3. **Copy your Public Key** - it looks like: `xxxxxxxxxxxxxxxxxx`

---

## Step 5: Create Your .env File

1. In your project root directory, create a file named `.env` (exactly this name)
2. Add this content (replace with YOUR actual values):

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxx
```

3. Save the file

**Important:** Make sure `.env` is in your `.gitignore` file so you don't accidentally commit your credentials!

---

## Step 6: Test Your Form

1. Stop your development server (if running) with `Ctrl+C`
2. Start it again: `npm run dev`
3. Navigate to your contact form
4. Fill out the form with test data:
   - Name: Test User
   - Email: your-test-email@gmail.com
   - Phone: 1234567890
   - Subject: Test Message
   - Message: This is a test of my contact form
5. Click "Send Message"
6. Check your email at **vaishnavi.jaligama@gmail.com**

---

## Troubleshooting

### Form submits but no email arrives?
- Check your browser console for errors (F12)
- Verify all three credentials in `.env` are correct
- Check your EmailJS dashboard for any error logs

### Getting an error about service ID?
- Make sure your Service ID starts with `service_`
- Copy the entire ID including `service_` prefix

### Template variables not showing?
- Make sure variable names match exactly: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{subject}}`, `{{message}}`
- Check that you're using double curly braces `{{}}`

### Still not working?
- Restart your development server after creating `.env`
- Check that your Gmail service is properly connected in EmailJS
- Review the full documentation in `EMAILJS_SETUP.md`

---

## Free Plan Limits

The free EmailJS plan includes:
- ✅ 200 emails per month
- ✅ All basic features
- ✅ Perfect for a portfolio contact form

If you need more than 200 emails/month, consider upgrading to a paid plan.

---

## Need More Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
- Check `EMAILJS_SETUP.md` for detailed information

