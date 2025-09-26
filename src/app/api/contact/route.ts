import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, budget, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      )
    }

    // Create transporter using Gmail with better configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Michaelzahy1@gmail.com',
        pass: 'kuwm luuy ijwu crkg'
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
      console.log('Transporter verified successfully')
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError)
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      )
    }

    // Email content
    const mailOptions = {
      from: 'Michaelzahy1@gmail.com',
      to: 'Michaelzahy1@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            ${company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>` : ''}
            ${budget ? `<p style="margin: 10px 0;"><strong>Budget Range:</strong> ${budget}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Message:</strong> ${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #e0e7ff; border-radius: 8px;">
            <p style="margin: 0; color: #4338ca; font-size: 14px;">
              This message was sent from your portfolio website contact form.
            </p>
          </div>
        </div>
      `
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}