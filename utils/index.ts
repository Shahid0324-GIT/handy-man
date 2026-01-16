export type HashAlgorithm = "MD5" | "SHA1" | "SHA256" | "SHA512" | "BCRYPT";

export type IdType = "uuid" | "objectid" | "nanoid";

export type Frequency = "minute" | "hourly" | "daily" | "weekly" | "monthly";

export interface JwtParts {
  header: object | null;
  payload: object | null;
  signature: string | null;
  rawHeader: string;
  rawPayload: string;
  rawSignature: string;
}
