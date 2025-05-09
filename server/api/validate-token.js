import fs from "fs/promises";
import path from "path";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const token = query.token;

  const tokenFile = path.join("/tmp", "tokens.json");

  try {
    const raw = await fs.readFile(tokenFile, "utf8");
    const tokens = JSON.parse(raw);

    const match = tokens.find((t) => t.token === token);

    if (!match) {
      throw createError({ statusCode: 403, statusMessage: "Invalid token" });
    }

    return { valid: true };
  } catch {
    throw createError({ statusCode: 403, statusMessage: "Token check failed" });
  }
});
