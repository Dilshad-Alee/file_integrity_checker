import crypto from "crypto";

export function calculateHash(buffer: Buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}
