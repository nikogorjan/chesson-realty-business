/*
 * Chesson Realty — static site server + contact-form mailer.
 * Serves all the HTML/CSS/JS/images and exposes POST /api/send, which relays
 * the contact form over SMTP using credentials read from environment variables
 * (set these in Coolify → Environment Variables; never commit real secrets).
 *
 * Required env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO
 * Optional env: SMTP_SECURE (true/false), MAIL_FROM, PORT
 */
const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true, limit: '64kb' }));
app.use(express.json({ limit: '64kb' }));

// Serve the static website (dotfiles like .env are ignored by default)
app.use(express.static(__dirname, { extensions: ['html'] }));

const REQUIRED = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'];

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

app.post('/api/send', async (req, res) => {
  const b = req.body || {};

  // Honeypot — if filled, silently accept and drop (don't email).
  if (b.botcheck) return res.json({ success: true });

  const missing = REQUIRED.filter(k => !process.env[k]);
  if (missing.length) {
    console.error('[mail] missing env:', missing.join(', '));
    return res.status(500).json({ success: false, error: 'Mail not configured' });
  }

  const name = String(b.name || '').trim();
  const email = String(b.email || '').trim();
  const date = String(b.date || '').trim();
  const time = String(b.time || '').trim();
  const message = String(b.message || '').trim();

  if (!name || !email || !email.includes('@') || !message) {
    return res.status(400).json({ success: false, error: 'Please fill in your name, a valid email, and a message.' });
  }

  const port = Number(process.env.SMTP_PORT);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : port === 465; // 465 = implicit TLS, 587 = STARTTLS

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      // fail fast instead of hanging if the mail host is unreachable/blocked
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000
    });

    await transporter.sendMail({
      // From should be your own domain mailbox so it passes SPF/DKIM.
      from: process.env.MAIL_FROM || `"Chesson Realty Website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: `"${name}" <${email}>`,
      subject: 'New Website Inquiry - Chesson Realty',
      text:
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Preferred date/time: ${date} ${time}\n\n` +
        `Message:\n${message}\n`,
      html:
        `<h2 style="margin:0 0 12px">New Website Inquiry &mdash; Chesson Realty</h2>` +
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
        `<p><strong>Preferred date/time:</strong> ${escapeHtml(date)} ${escapeHtml(time)}</p>` +
        `<p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
    });

    res.json({ success: true });
  } catch (err) {
    console.error('[mail] send failed:', (err && err.code) || '', (err && err.command) || '', (err && err.message) || err);
    res.status(500).json({ success: false, error: 'Send failed' });
  }
});

app.listen(PORT, () => console.log('Chesson Realty site running on :' + PORT));
