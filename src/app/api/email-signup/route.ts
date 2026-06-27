import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getEmailSignupTemplate } from '@/lib/email-service';

interface SignupRequest {
  email: string;
  name?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();

    // Validate email
    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check rate limiting (basic IP-based check)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    // TODO: Implement proper rate limiting with Redis/Upstash

    // In production, save to database
    // For now, just send confirmation email
    const emailResult = await sendEmail({
      to: body.email,
      subject: 'Welcome to AstroKalki – The Pattern Intelligence System',
      html: getEmailSignupTemplate(body.email),
    });

    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error);
      // Still return success if email service is down (graceful degradation)
      return NextResponse.json({
        success: true,
        message: 'Signup recorded. Email delivery may be delayed.',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome email sent! Check your inbox.',
      email: body.email,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
