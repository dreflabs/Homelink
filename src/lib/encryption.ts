import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const SECRET_KEY = Buffer.from(
  process.env.ENCRYPTION_SECRET || "12345678901234567890123456789012",
  "utf-8"
).slice(0, 32);

/**
 * Encrypt sensitive token string using AES-256-GCM.
 * Output format: iv:authTag:encryptedHex
 */
export function encryptToken(text: string): string {
  if (!text) return text;

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag().toString("hex");
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Decrypt AES-256-GCM encrypted token string.
 */
export function decryptToken(encryptedData: string): string {
  if (!encryptedData || !encryptedData.includes(":")) return encryptedData;

  try {
    const parts = encryptedData.split(":");
    if (parts.length !== 3) return encryptedData;

    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);

    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Token decryption failed:", error);
    return encryptedData;
  }
}
