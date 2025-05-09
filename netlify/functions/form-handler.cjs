const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "text/plain" },
      body: "Method Not Allowed",
    };
  }

  const formData = new URLSearchParams(event.body);

  // 🛡️ Honeypot check
  const honeypot = formData.get("bot-field");
  if (honeypot) {
    return {
      statusCode: 200,
      body: "Thanks! (Bot filtered)",
    };
  }

  const name = formData.get("name") || "N/A";
  const email = formData.get("email") || "N/A";

  // ✅ Email format validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail(email)) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid email format" }),
    };
  }

  const token = uuidv4();

  // Store token in /tmp
  const tokenFile = path.join("/tmp", "tokens.json");
  let tokens = [];
  try {
    const existing = await fs.readFile(tokenFile, "utf8");
    tokens = JSON.parse(existing);
  } catch (_) {}

  tokens.push({ token, email, name, created: Date.now() });
  await fs.writeFile(tokenFile, JSON.stringify(tokens));

  // Send to Discord
  const discordPayload = {
    content: `📩 **New Lead Captured**\nName: ${name}\nEmail: ${email}`,
  };

  const discordWebhookUrl = "https://discord.com/api/webhooks/1370461708946116628/htFHn3xP06zPiL6VSj-Nfws3AbNfSbUEmXyAhAvVbkzSLv-kEz1JUSo8ihp6MSdhKUCZ";

  await fetch(discordWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(discordPayload),
  });

  // Redirect
  return {
    statusCode: 302,
    headers: {
      Location: `/cp/forms/welcome-guide-download/${token}`,
    },
    body: "",
  };
};
