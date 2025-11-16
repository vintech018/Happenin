# EmailJS Setup Guide

This guide will help you set up EmailJS for sending ticket confirmation emails with QR codes.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

## Step 2: Create an Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Save the Service ID** - you'll need this for `.env`

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template variables:
   - `{{to_name}}` - Customer name
   - `{{to_email}}` - Customer email
   - `{{movie}}` - Movie/Event name
   - `{{date}}` - Booking date
   - `{{time}}` - Show time
   - `{{seats}}` - Selected seats
   - `{{ticketId}}` - Unique ticket ID
   - `{{qr_code}}` - Base64 QR code image

4. Copy the HTML from `src/utils/emailTemplatePreview.html` and paste it into the template editor
5. Replace the preview HTML variables with EmailJS template variables (e.g., `{{movie}}` instead of `{{movie}}`)
6. **Save the Template ID** - you'll need this for `.env`

## Step 4: Get Your Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** under API Keys
3. **Copy the Public Key** - you'll need this for `.env`

## Step 5: Configure Environment Variables

1. Open `client/.env` file
2. Replace the placeholder values:
   ```
   VITE_EMAILJS_SERVICE=your_actual_service_id
   VITE_EMAILJS_TEMPLATE=your_actual_template_id
   VITE_EMAILJS_PUBLIC=your_actual_public_key
   ```

## Step 6: Restart Development Server

After updating `.env`, restart your Vite dev server:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd client
npm run dev
```

## Testing

1. Complete a booking flow
2. After payment confirmation, check the customer's email
3. Verify the QR code is displayed correctly
4. Check browser console for any errors

## Troubleshooting

- **"EmailJS credentials are missing"**: Check that `.env` file exists and has correct variable names (must start with `VITE_`)
- **Email not sending**: Check browser console for errors, verify EmailJS service is active
- **QR code not showing**: Verify the template uses `{{qr_code}}` variable correctly
- **Template variables not working**: Ensure variable names match exactly (case-sensitive)

## Email Template Example

Here's a minimal template you can use in EmailJS:

```html
<h2>Your Happenin Ticket 🎬</h2>
<p><b>Movie:</b> {{movie}}</p>
<p><b>Date:</b> {{date}}</p>
<p><b>Time:</b> {{time}}</p>
<p><b>Seats:</b> {{seats}}</p>
<p><b>Ticket ID:</b> {{ticketId}}</p>
<br/>
<img src="{{qr_code}}" width="180" style="border-radius:12px;" />
<p>Please present this QR code at the venue for entry.</p>
```

See `src/utils/emailTemplatePreview.html` for a styled version.



