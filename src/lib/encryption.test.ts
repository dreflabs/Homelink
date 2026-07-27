import { describe, expect, test } from "vitest";
import { encryptToken, decryptToken } from "./encryption";

describe("Token Encryption", () => {
  test("encrypts and decrypts OAuth token string correctly", () => {
    const rawToken = "ya29.a0ARR57-secret-oauth-access-token-12345";
    const encrypted = encryptToken(rawToken);

    expect(encrypted).not.toBe(rawToken);
    expect(encrypted).toContain(":");

    const decrypted = decryptToken(encrypted);
    expect(decrypted).toBe(rawToken);
  });

  test("handles empty or invalid encrypted format gracefully", () => {
    expect(decryptToken("")).toBe("");
    expect(decryptToken("plaintext_token")).toBe("plaintext_token");
  });
});
