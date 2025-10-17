# EmailJS Setup Guide for Contact Form

Your contact form now uses EmailJS to send emails directly to `rajat17.maheshwari@gmail.com` when someone submits the form.

## Setup Steps

### 1. Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### 2. Add an Email Service
1. Go to [Email Services](https://dashboard.emailjs.com/admin/integration)
2. Click "Add New Service"
3. Choose **Gmail** (recommended)
4. Click "Connect Account" and authorize your Gmail account (`rajat17.maheshwari@gmail.com`)
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

### 5. Update Your Code

Open `src/pages/Contact.tsx` and replace the placeholder values:

**Line 56:** Replace `'YOUR_PUBLIC_KEY'` with your actual public key

**Lines 222-225:** Replace the values in the `emailjs.send()` function:
```typescript
await emailjs.send(
  'service_xxxxxxx',    // Your Service ID
  'template_xxxxxxx',   // Your Template ID
  templateParams,
  'xxxxxxxxxxxxxxx'     // Your Public Key
);
```

### 6. Test Your Form
1. Run your development server
2. Fill out the contact form
3. Submit it
4. Check your email at `rajat17.maheshwari@gmail.com`

## Environment Variables (Optional but Recommended)

For better security, you can store these values in environment variables:

1. Create a `.env` file in your project root:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

2. Update `src/pages/Contact.tsx` to use environment variables:
```typescript
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  templateParams,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

3. Don't forget to add these environment variables to your hosting platform (Vercel, Netlify, etc.)

## Troubleshooting

- **Emails not sending?** Check the browser console for errors
- **Rate limit exceeded?** Free plan allows 200 emails/month
- **Wrong email address?** Double-check your Gmail account in EmailJS
- **Template variables not working?** Make sure variable names in template match the `templateParams` object

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

