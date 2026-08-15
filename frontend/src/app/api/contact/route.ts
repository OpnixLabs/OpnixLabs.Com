import { NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_b2EfhiUA_MbMRkAHU72pSD4ZS1yusprUH';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'OpnixLabs <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'contact@opnixlabs.com';

interface SendResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

async function sendResendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  const recipients = Array.isArray(to) ? to : [to];

  const payload: Record<string, unknown> = {
    from: FROM_EMAIL,
    to: recipients,
    subject,
    html,
  };

  if (replyTo) {
    payload.reply_to = replyTo;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resData = await response.json();

    if (!response.ok) {
      console.warn(`Resend API Notice (${response.status}):`, resData?.message || JSON.stringify(resData));
      return { success: false, error: resData?.message || `Status ${response.status}` };
    }

    return { success: true, data: resData };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    console.error('Resend Network Error:', message);
    return { success: false, error: message };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name = 'Client', email, message = '', phone, honeypot } = body || {};

    // Anti-spam Honeypot check
    if (honeypot && honeypot.trim() !== '') {
      console.warn('Honeypot triggered in contact form submission');
      return NextResponse.json({ success: true, message: 'Inquiry processed' });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const sanitizedName = String(name).trim();
    const sanitizedEmail = String(email).trim().toLowerCase();
    const sanitizedMessage = String(message).trim();
    const formattedDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 1. Auto-Reply Email Template for Customer / Inquirer
    const userEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We received your inquiry – OpnixLabs</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
    <!-- Logo Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 24px;">
      <h1 style="color: #1e3a8a; margin: 0; font-size: 26px; font-weight: 900;">Opnix<span style="color: #2563eb;">Labs</span></h1>
      <p style="color: #64748b; font-size: 11px; margin: 4px 0 0 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">B2B Software Development & Technology Services</p>
    </div>

    <!-- Main Message -->
    <div style="font-size: 15px; line-height: 1.7; color: #334155;">
      <p style="margin-top: 0;">Hi <strong>${sanitizedName}</strong>,</p>

      <p>Thank you for reaching out to OpnixLabs.</p>

      <p>We have received your project details, and a member of our technical solutions team is currently reviewing them. We will get back to you within 24 hours (or the next business day) with initial thoughts and next steps.</p>

      <p>In the meantime, feel free to explore some of our latest architectural work and case studies at <a href="https://www.opnixlabs.com" style="color: #2563eb; font-weight: 700; text-decoration: underline;">www.opnixlabs.com</a>.</p>

      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f1f5f9;">
        <p style="margin: 0; color: #475569;">Best regards,</p>
        <p style="margin: 6px 0 0 0; color: #0f172a; font-weight: 800; font-size: 16px;">The OpnixLabs Team</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; text-align: center;">
      <a href="mailto:contact@opnixlabs.com" style="color: #2563eb; font-weight: 600; text-decoration: none;">contact@opnixlabs.com</a>
      <span style="margin: 0 8px; color: #cbd5e1;">|</span>
      <a href="https://www.opnixlabs.com" style="color: #2563eb; font-weight: 600; text-decoration: none;">www.opnixlabs.com</a>
    </div>
  </div>
</body>
</html>
    `.trim();

    // 2. Admin Notification Email Template for OpnixLabs Team
    const adminEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry - OpnixLabs</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
    <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 16px 20px; border-radius: 12px; margin-bottom: 24px;">
      <h2 style="color: #1e40af; margin: 0; font-size: 20px; font-weight: 800;">🚨 New Lead Inquiry Received</h2>
      <p style="color: #3b82f6; margin: 4px 0 0 0; font-size: 12px; font-weight: 600;">Submitted on www.opnixlabs.com</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
      <tr>
        <td style="padding: 10px 0; font-weight: 700; width: 120px; color: #64748b; text-transform: uppercase; font-size: 11px;">Client Name:</td>
        <td style="padding: 10px 0; font-weight: 700; color: #0f172a; font-size: 15px;">${sanitizedName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; font-weight: 700; color: #64748b; text-transform: uppercase; font-size: 11px;">Email:</td>
        <td style="padding: 10px 0;"><a href="mailto:${sanitizedEmail}" style="color: #2563eb; font-weight: 700; text-decoration: none;">${sanitizedEmail}</a></td>
      </tr>
      ${phone ? `<tr><td style="padding: 10px 0; font-weight: 700; color: #64748b; text-transform: uppercase; font-size: 11px;">Phone:</td><td style="padding: 10px 0; font-weight: 600;">${phone}</td></tr>` : ''}
      <tr>
        <td style="padding: 10px 0; font-weight: 700; color: #64748b; text-transform: uppercase; font-size: 11px; vertical-align: top;">Project Message:</td>
        <td style="padding: 10px 0;">
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage || 'No message provided.'}</div>
        </td>
      </tr>
    </table>

    <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: right;">
      Received at ${formattedDate} (IST)
    </div>
  </div>
</body>
</html>
    `.trim();

    // Dispatch both emails in parallel via Resend
    const [userRes, adminRes] = await Promise.all([
      sendResendEmail({
        to: sanitizedEmail,
        subject: 'We received your inquiry – OpnixLabs',
        html: userEmailHtml,
        replyTo: 'contact@opnixlabs.com',
      }),
      sendResendEmail({
        to: ADMIN_EMAIL,
        subject: `🚨 New Project Inquiry from ${sanitizedName} - OpnixLabs`,
        html: adminEmailHtml,
        replyTo: sanitizedEmail,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received',
      userMailSent: userRes.success,
      adminMailSent: adminRes.success,
      userMailError: userRes.error,
      adminMailError: adminRes.error,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('Error in /api/contact:', errMessage);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
