# Email Setup Guide for Contact Form

This project uses **EmailJS** to send form submissions directly to your email: `navneetkrsinghh@gmail.com`

## Quick Start (No Build Required)

The website is configured to use EmailJS via CDN. You just need to add your API credentials.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a **free account**
3. Verify your email address

## Step 2: Add Your Gmail Account

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add Service**
3. Select **Gmail**
4. Complete the OAuth authentication with your Gmail account
5. **Copy your Service ID** (looks like: `service_xxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Name it: `template_consultation`
4. Configure the template with these fields:

**Template Content Example:**
```
New Consultation Request from {{from_name}}

Email: {{from_email}}
Organization: {{organization}}
Phone: {{phone}}
Service Interest: {{service}}

Message:
{{message}}
```

5. **Copy your Template ID** (looks like: `template_xxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account Settings** → **API Keys**
2. **Copy your Public Key**

## Step 5: Update the Website Code

Update `/js/app.js` with your credentials (around line 10):

```javascript
// Initialize EmailJS - REPLACE WITH YOUR ACTUAL PUBLIC KEY
emailjs.init({
  publicKey: 'YOUR_PUBLIC_KEY_HERE'  // <-- Replace this
});
```

And around line 305, update the service and template IDs:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'template_consultation', emailParams)
        // Replace 'YOUR_SERVICE_ID' with your actual Service ID from step 2
```

**Example:**
```javascript
emailjs.send('service_a1b2c3d4e5f6g', 'template_consultation', emailParams)
```

## Step 6: Test It

1. Open your website in a browser
2. Scroll to "Request a Free Consultation" form
3. Fill out the form with test data
4. Click "Submit Request"
5. Check your email (navneetkrsinghh@gmail.com) for the submission

## File Changes Made

✅ Updated `package.json` to include @emailjs/browser dependency
✅ Updated `js/app.js` with EmailJS integration
✅ Form will now send directly to navneetkrsinghh@gmail.com

## Security Note

⚠️ **Your Public Key is visible in browser code** - this is fine for EmailJS.
- Never expose your Private Key
- Email addresses are not visible to users
- Limit which domains can access your EmailJS account in settings

## Installation (Optional - for npm build)

If you want to build the project with npm:

```bash
npm install
npm start    # Development server
npm run build # Production build
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Emails not sending | Check your EmailJS dashboard logs for errors |
| "Invalid API Keys" | Verify you copied the correct Public Key and Service ID |
| Emails going to spam | Check Gmail spam folder, whitelist sender in your email |
| CORS errors | Add your domain to EmailJS whitelist in Account Settings |

## Support

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS GitHub](https://github.com/emailjs-com/emailjs-sdk)
- Test email limit: 200/month on free plan

---

**After Setup:** When visitors submit the consultation form, emails will automatically go to navneetkrsinghh@gmail.com with all their contact information.

