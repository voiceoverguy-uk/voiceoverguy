/// <reference types="node" />
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { EnquiryInput } from '../lib/api-zod/src/enquiry';

function buildEnquiryEmail(data: {
  name: string;
  email: string;
  message: string;
  pageTitle: string;
  pageUrl: string;
  ip: string;
  timestamp: string;
}): string {
  const { name, email, message, pageTitle, pageUrl, ip, timestamp } = data;
  const escaped = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:#9C060B;padding:24px 32px;">
          <span style="font-family:Arial,sans-serif;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:1px;">VOICEOVERGUY</span>
          <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">New enquiry via voiceoverguy.co.uk</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:28px 32px;">

          <!-- Name -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td style="background:#f9f9f9;border-radius:4px;padding:14px 16px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#999999;">Name</p>
                <p style="margin:0;font-size:15px;color:#333333;">${escaped(name)}</p>
              </td>
            </tr>
          </table>

          <!-- Email -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td style="background:#f9f9f9;border-radius:4px;padding:14px 16px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#999999;">Email</p>
                <p style="margin:0;font-size:15px;color:#333333;">${escaped(email)}</p>
              </td>
            </tr>
          </table>

          <!-- Message -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td style="background:#f9f9f9;border-left:4px solid #9C060B;border-radius:0 4px 4px 0;padding:14px 16px;">
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#999999;">Message</p>
                <p style="margin:0;font-size:15px;color:#333333;white-space:pre-wrap;">${escaped(message)}</p>
              </td>
            </tr>
          </table>

          <!-- Page context -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
            <tr>
              <td style="background:#f0f0f0;border-radius:4px;padding:12px 16px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#999999;">Page</p>
                <p style="margin:0;font-size:13px;color:#333333;">${escaped(pageTitle)}</p>
                <p style="margin:4px 0 0;font-size:12px;color:#666666;">${escaped(pageUrl)}</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f5f5f5;padding:16px 32px;border-top:1px solid #e0e0e0;">
          <p style="margin:0;font-size:11px;color:#999999;">
            Sent: ${escaped(timestamp)}${ip ? ` &nbsp;·&nbsp; IP: ${escaped(ip)}` : ''}
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const parsed = EnquiryInput.safeParse(req.body);

  if (!parsed.success) {
    const messages = parsed.error.issues.map(i => i.message);
    res.status(400).json({ error: messages[0] ?? 'Invalid submission' });
    return;
  }

  const { name, email, message, pageTitle, pageUrl, website } = parsed.data;

  if (website && website.length > 0) {
    res.status(200).json({ ok: true });
    return;
  }

  const apiKey = process.env['RESEND_API_KEY'];
  const toEmail = process.env['CONTACT_TO_EMAIL'] ?? 'enquiries@voiceoverguy.co.uk';
  const fromEmail = process.env['CONTACT_FROM_EMAIL'] ?? 'noreply@voiceoverguy.co.uk';

  if (!apiKey) {
    res.status(500).json({ error: 'Email service not configured.' });
    return;
  }

  const resend = new Resend(apiKey);

  const ip = (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    ''
  );

  const timestamp = new Date().toUTCString();

  const html = buildEnquiryEmail({ name, email, message, pageTitle, pageUrl, ip, timestamp });

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `VoiceoverGuy — Enquiry from ${pageTitle}`,
    html,
  });

  if (error) {
    res.status(500).json({ error: 'Failed to send your message. Please try again.' });
    return;
  }

  res.status(200).json({ ok: true });
}
