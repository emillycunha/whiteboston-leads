// netlify/functions/generate-link.js
const fetch = require("node-fetch");

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1370461708946116628/htFHn3xP06zPiL6VSj-Nfws3AbNfSbUEmXyAhAvVbkzSLv-kEz1JUSo8ihp6MSdhKUCZ";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const form = new URLSearchParams(event.body);
  if (form.get("bot-field")) return { statusCode: 200, body: "Ignored bot." };

  const name = form.get("name") || "—";
  const email = form.get("email") || "—";
  const subscribe = form.get("subscribe") === "yes" ? "✅ Subscribed to newsletter" : "🚫 No subscription";

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
      content: `📩 New Lead\n\n• Name: ${name}\n• Email: ${email}\n• ${subscribe}`,
    }),
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true }),
  };
};
