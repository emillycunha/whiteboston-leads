const fetch = require("node-fetch");

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1370461708946116628/htFHn3xP06zPiL6VSj-Nfws3AbNfSbUEmXyAhAvVbkzSLv-kEz1JUSo8ihp6MSdhKUCZ";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body);
  const { type, data } = body;

  if (type === "email.delivered") {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `✅ Email delivered to **${data.to}**\nSubject: *${data.subject || "N/A"}*`,
      }),
    });
  }

  if (type === "email.bounced") {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `❌ **Email bounced** to ${data.to}\nError: ${data.error}`,
      }),
    });
  }

  return { statusCode: 200, body: "OK" };
};
