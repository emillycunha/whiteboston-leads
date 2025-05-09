import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

const tokenFile = path.join("/tmp", "tokens.json");

export default async (event) => {
  if (event.httpMethod !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const formData = new URLSearchParams(event.body);
  const name = formData.get("name");
  const email = formData.get("email");
  const token = uuidv4();

  // Store token in temp file (reset on deploy)
  let tokens = [];
  try {
    const existing = await fs.readFile(tokenFile, "utf8");
    tokens = JSON.parse(existing);
  } catch (_) {}

  tokens.push({ token, email, name, created: Date.now() });
  await fs.writeFile(tokenFile, JSON.stringify(tokens));

  return new Response(null, {
    status: 302,
    headers: {
      Location: `/cp/forms/welcome-guide-download/${token}`,
    },
  });
};
