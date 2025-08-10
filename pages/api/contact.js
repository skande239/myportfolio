import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body || {}

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, message: 'Missing required fields' })
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
    const smtpPort = Number(process.env.SMTP_PORT || 465)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const to = process.env.SMTP_TO || smtpUser
    const from = process.env.SMTP_FROM || `"Portfolio Contact" <${smtpUser}>`

    if (!smtpUser || !smtpPass) {
      return res.status(500).json({ ok: false, message: 'Email is not configured on the server' })
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    const subject = `New message from ${name}`

    await transporter.sendMail({
      from,
      to,
      subject,
      replyTo: email,
      text: `From: ${name} <${email}>
\n${message}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.6">
          <h2>New portfolio message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return res.status(500).json({ ok: false, message: 'Failed to send message' })
  }
}


