# EXACT LINES TO EDIT

## File: /js/app.js

### Line 8-9: Add Your Public Key

**FIND:**
```javascript
emailjs.init({
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
});
```

**REPLACE WITH:**
```javascript
emailjs.init({
  publicKey: 'pk_live_YOUR_ACTUAL_PUBLIC_KEY_HERE'
});
```

**Example:**
```javascript
emailjs.init({
  publicKey: 'pk_live_abc123def456ghi789jkl012mno345'
});
```

---

### Line 304: Add Your Service ID

**FIND:**
```javascript
      emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'template_consultation', emailParams)
```

**REPLACE WITH:**
```javascript
      emailjs.send('service_YOUR_ACTUAL_SERVICE_ID_HERE', 'template_consultation', emailParams)
```

**Example:**
```javascript
      emailjs.send('service_abc123def456ghi789', 'template_consultation', emailParams)
```

---

## How to Find These Values

### Public Key Location:
1. Go to https://www.emailjs.com/
2. Login to your account
3. Click **Account** (left sidebar)
4. Go to **API Keys** tab
5. Copy the **Public Key** value (starts with `pk_live_`)

### Service ID Location:
1. Go to https://www.emailjs.com/
2. Click **Email Services** (left sidebar)
3. Find your Gmail service
4. Copy the **Service ID** (looks like: `service_xxxxxxx`)

### Template ID (for reference):
- Already set to `template_consultation` in the code
- This must match the template name you create in EmailJS

---

## Template Setup in EmailJS

1. Go to **Email Templates**
2. Click **Create New Template**
3. Name it: `template_consultation`
4. Template Variables to use:
   - `{{from_name}}` - Visitor's full name
   - `{{from_email}}` - Visitor's email address
   - `{{organization}}` - Their organization
   - `{{phone}}` - Their phone number
   - `{{service}}` - Service they're interested in
   - `{{message}}` - Their message

---

## Test After Configuration

1. Open your website
2. Find "Request a Free Consultation" form
3. Fill it out with test data
4. Click "Submit Request"
5. Check navneetkrsinghh@gmail.com for the email

✅ If you receive the email, it's working!

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| 400 Bad Request | Check Public Key and Service ID are exactly correct (copy/paste helps) |
| 404 Not Found | Check template name is exactly `template_consultation` |
| No email received | Check spam folder, or check EmailJS dashboard activity logs |
| Form shows error | Open browser console (F12) and check error message |

---

**Need the actual credentials from EmailJS?**
1. Go to https://www.emailjs.com/ and sign up
2. Add Gmail service
3. Create template
4. Get your API keys
5. Come back and paste them in the two locations above
