import { JwtParts } from "@/utils";

export function decodeJwt(token: string): JwtParts {
  const parts = token.split(".");

  const result: JwtParts = {
    header: null,
    payload: null,
    signature: null,
    rawHeader: parts[0] ?? "",
    rawPayload: parts[1] ?? "",
    rawSignature: parts[2] ?? "",
  };

  if (parts.length !== 3) {
    return result;
  }

  try {
    const headerJson = base64UrlDecode(parts[0]);
    const payloadJson = base64UrlDecode(parts[1]);

    const header = JSON.parse(headerJson);
    const payload = JSON.parse(payloadJson);

    result.header = typeof header === "object" ? header : null;
    result.payload = typeof payload === "object" ? payload : null;

    result.signature = parts[2];
  } catch {
    // Return partial results if decoding/parsing fails
  }

  return result;
}

function base64UrlDecode(input: string): string {
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");

  const padding = base64.length % 4;
  if (padding === 2) base64 += "==";
  else if (padding === 3) base64 += "=";
  else if (padding !== 0) {
    throw new Error("Invalid base64url string");
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}
