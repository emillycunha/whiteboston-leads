// netlify/functions/generate-link.js
const fetch = require("node-fetch");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const form = new URLSearchParams(event.body);
  if (form.get("bot-field")) return { statusCode: 200, body: "Ignored bot." };

  const firstName = form.get("firstName") || "—";
  const lastName = form.get("lastName") || "";
  const fullName = `${firstName} ${lastName}`.trim();

  const phone = form.get("phone") || "—";
  const email = form.get("email") || "—";
  const subscribe = form.get("subscribe") === "yes" ? "Subscribed to newsletter ✅" : "No subscription 🚫";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid email" }),
    };
  }

  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `📩 New Lead - Ties Team\n\n• Name: ${fullName}\n• Email: ${email}\n• Phone: ${phone}\n• ${subscribe}`,
    }),
  });

  // Send email via Resend
  try {
    await resend.emails.send({
      from: "TIES Team <guide@leads.whiteboston.com>",
      to: email,
      subject: "Your Buy, Sell & Relocation Guide Has Arrived",
      html: `
    <p>Hi ${firstName},</p>

    <p><strong>Your guide has arrived.</strong></p>

    <p style="margin: 20px 0;">
      <a href="https://leads.whiteboston.com/guides/da/ties-team-buyers-guide.pdf" target="_blank" style="display: inline-block; background: #065f46; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">Download the Guide</a>
    </p>

    <p>This guide covers key tips, timelines, and strategies for navigating the real estate market — whether you're buying, selling, or relocating.</p>

    <p>If you have any questions or want to talk through your options, feel free to reply directly to this email — I’m here to help.</p><br>

    <p>
      Abrahams Real Estate Ties Team<br/><br>
      Instagram: <a href="https://instagram.com/tiesteam">@tiesteam</a>
    </p>
    
<hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;" />

    <p style="font-size: 12px; color: #666; margin-top: 24px;">
      448 S Seguin Ave, New Braunfels, TX 78130<br/>
      This email was sent because you requested a guide via our website form. Your email may be stored securely for internal tracking purposes only and will not be shared or sold.
    </p>
  `,
      text: `
Hi ${firstName},

Your guide has arrived.

Download the Guide:
https://leads.whiteboston.com/guides/da/ties-team-buyers-guide.pdf

This guide covers key tips, timelines, and strategies for navigating the real estate market — whether you're buying, selling, or relocating.

If you have any questions or want to talk through your options, feel free to reply directly to this email — I’m here to help.


Abrahams Real Estate Ties Team
Instagram: @tiesteam


448 S Seguin Ave, New Braunfels, TX 78130

This email was sent because you requested a guide via our website form. Your email may be stored securely for internal tracking purposes only and will not be shared or sold.
`,
    });
  } catch (err) {
    console.error("Resend error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email." }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true }),
  };
};
