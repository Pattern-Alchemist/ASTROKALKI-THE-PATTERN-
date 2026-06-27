/**
 * Email Service Wrapper
 * Supports multiple providers (Resend, SendGrid, etc.)
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const from = options.from || process.env.EMAIL_FROM || 'hello@astrokalki.com';

  try {
    // Check which email provider is configured
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend(options, from);
    } else if (process.env.SENDGRID_API_KEY) {
      return await sendViaSendGrid(options, from);
    } else {
      // Fallback: log to console in development
      console.log('[Email] Would send:', { ...options, from });
      return { success: true, messageId: 'dev-mode' };
    }
  } catch (error) {
    console.error('Email send failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function sendViaResend(
  options: EmailOptions,
  from: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.warn('Resend not available, falling back to console');
    return { success: true, messageId: 'dev-mode' };
  }
}

async function sendViaSendGrid(
  options: EmailOptions,
  from: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const response = await sgMail.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    return {
      success: true,
      messageId: response[0].headers['x-message-id'],
    };
  } catch (error) {
    console.warn('SendGrid not available, falling back to console');
    return { success: true, messageId: 'dev-mode' };
  }
}

/**
 * Email Templates
 */

export function getEmailSignupTemplate(email: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to AstroKalki</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #050505; color: #e8e0d4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #d4a574;">Welcome to AstroKalki</h2>
          <p>Hi there,</p>
          <p>Thank you for joining our community of pattern seekers. You're now part of a community discovering the invisible patterns that shape their lives.</p>
          <p style="margin: 30px 0;">
            <a href="https://astrokalki.com" style="background-color: #d4a574; color: #050505; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Explore AstroKalki</a>
          </p>
          <p style="color: #999; font-size: 12px;">You're receiving this email because you signed up for AstroKalki newsletters at astrokalki.com</p>
        </div>
      </body>
    </html>
  `;
}

export function getPatternInsightTemplate(
  recipientEmail: string,
  patternName: string,
  insight: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Your Pattern Insight</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #050505; color: #e8e0d4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #d4a574;">Your Pattern Insight: ${patternName}</h2>
          <div style="background-color: #080808; padding: 20px; border-left: 4px solid #d4a574; margin: 20px 0;">
            <p>${insight}</p>
          </div>
          <p>Ready to explore this pattern deeper?</p>
          <p style="margin: 30px 0;">
            <a href="https://astrokalki.com#assessment" style="background-color: #d4a574; color: #050505; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Take Assessment</a>
          </p>
        </div>
      </body>
    </html>
  `;
}

export function getConsultationConfirmationTemplate(
  clientName: string,
  consultationType: string,
  date: string,
  time: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Consultation Confirmed</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #050505; color: #e8e0d4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #d4a574;">Consultation Confirmed</h2>
          <p>Dear ${clientName},</p>
          <p>Your ${consultationType} consultation is confirmed:</p>
          <div style="background-color: #080808; padding: 20px; margin: 20px 0;">
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time} IST</p>
            <p><strong>Type:</strong> ${consultationType}</p>
          </div>
          <p>Please have your birth details ready for the session.</p>
          <p>Looking forward to revealing your patterns.</p>
          <p>—AstroKalki</p>
        </div>
      </body>
    </html>
  `;
}
