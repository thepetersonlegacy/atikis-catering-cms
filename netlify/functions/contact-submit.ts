import type { Handler } from '@netlify/functions'

// Minimal serverless handler for contact form submissions.
// Safe-by-default: If RESEND_API_KEY is not configured, we simply accept the
// submission (202) so the client can show a success state without relying on mailto.
// You can later wire an email/SMS provider here.

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const payload = JSON.parse(event.body || '{}')
    const {
      name,
      email,
      phone,
      eventDate, // ISO string expected
      wheelsUpTime,
      specialRequests
    } = payload || {}

    if (!name || !email || !phone || !eventDate || !wheelsUpTime) {
      return { statusCode: 400, body: 'Missing required fields' }
    }

    // Optional: send via provider if credentials present (example: Resend)
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'order@atikismn.com'

    if (RESEND_API_KEY) {
      try {
        const subject = 'Aviation Catering Inquiry'
        const text = [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Event Date: ${new Date(eventDate).toDateString()}`,
          `Wheels Up Time: ${wheelsUpTime}`,
          `Special Requests: ${specialRequests || 'None'}`,
          '',
          'Please respond to this inquiry at your earliest convenience.'
        ].join('\n')

        // Using fetch to Resend REST API without adding a dependency
        const resp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'no-reply@atikis.app',
            to: [TO_EMAIL],
            subject,
            text
          })
        })

        if (!resp.ok) {
          const errText = await resp.text().catch(() => '')
          console.warn('Resend API error:', resp.status, errText)
          // Still accept so the client is not blocked
          return { statusCode: 202, body: JSON.stringify({ status: 'accepted' }) }
        }

        return { statusCode: 200, body: JSON.stringify({ status: 'sent' }) }
      } catch (e) {
        console.warn('Email provider error:', e)
        return { statusCode: 202, body: JSON.stringify({ status: 'accepted' }) }
      }
    }

    // No provider configured; accept the submission
    return { statusCode: 202, body: JSON.stringify({ status: 'accepted' }) }
  } catch (e) {
    console.error('Handler error:', e)
    return { statusCode: 500, body: 'Internal Server Error' }
  }
}

