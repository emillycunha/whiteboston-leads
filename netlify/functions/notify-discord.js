export default async (event) => {
  if (event.httpMethod === "GET") {
    return new Response("This endpoint only accepts POST requests.", {
      status: 405,
      headers: { "Content-Type": "text/plain" },
    });
  }

  try {
    let bodyText = "";
    if (event.body instanceof ReadableStream) {
      bodyText = await new Response(event.body).text();
    } else if (typeof event.body === "string") {
      bodyText = event.body;
    }

    const formData = new URLSearchParams(bodyText);
    const name = formData.get("name") || "N/A";
    const email = formData.get("email") || "N/A";

    const discordPayload = {
      content: `📩 **New Lead Captured**\nName: ${name}\nEmail: ${email}`,
    };

    const discordWebhookUrl = "https://discord.com/api/webhooks/1370461708946116628/htFHn3xP06zPiL6VSj-Nfws3AbNfSbUEmXyAhAvVbkzSLv-kEz1JUSo8ihp6MSdhKUCZ";

    const discordResponse = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error("Discord webhook error:", errorText);
      return new Response(JSON.stringify({ error: "Discord webhook failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Lead sent to Discord" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
