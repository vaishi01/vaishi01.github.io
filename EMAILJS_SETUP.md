# EmailJS Setup Guide for Contact Form

Your contact form now uses EmailJS to send emails directly to `vaishnavi.jaligama@gmail.com` when someone submits the form.

## Setup Steps

### 1. Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### 2. Add an Email Service
1. Go to [Email Services](https://dashboard.emailjs.com/admin/integration)
2. Click "Add New Service"
3. Choose **Gmail** (recommended)
4. Click "Connect Account" and authorize your Gmail account (`vaishnavi.jaligama@gmail.com`)
5. Copy the **Service ID** (e.g., `service_xxxxxxx`)

### 3. Create an Email Template
1. Go to [Email Templates](https://dashboard.emailjs.com/admin/templates)
2. Click "Create New Template"
3. Use this template content:

**Template Name:** Contact Form Submission

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Save the template and copy the **Template ID** (e.g., `template_xxxxxxx`)

### 4. Get Your Public Key
1. Go to [Account Settings](https://dashboard.emailjs.com/admin/account)
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxxxx`)

### 5. Create Environment Variables File

The code is already configured to use environment variables. You just need to create a `.env` file with your credentials:

**Skip this step if you haven't completed steps 1-4 above!**

Once you have your Service ID, Template ID, and Public Key, create a `.env` file in your project root.

### 6. Restart Your Server and Test

**Important:** After creating your `.env` file, restart your development server.

Then test your form:
1. Run your development server
2. Fill out the contact form
3. Submit it
4. Check your email at `vaishnavi.jaligama@gmail.com`

## Environment Variables Setup

The code has been updated to use environment variables for better security.

1. Create a `.env` file in your project root (same directory as package.json):
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

2. Replace the placeholder values with your actual EmailJS credentials from steps above.

3. **Important:** Add `.env` to your `.gitignore` file to keep your credentials private:
```
# Environment variables
.env
```

4. After creating the `.env` file, restart your development server (`npm run dev`).

5. **For Production:** Don't forget to add these environment variables to your hosting platform (GitHub Pages, Vercel, Netlify, etc.)

## Troubleshooting

- **Emails not sending?** Check the browser console for errors
- **Rate limit exceeded?** Free plan allows 200 emails/month
- **Wrong email address?** Double-check your Gmail account in EmailJS
- **Template variables not working?** Make sure variable names in template match the `templateParams` object

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

