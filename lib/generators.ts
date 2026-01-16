import { IdType } from "@/utils";

export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateObjectId(): string {
  const timestamp = Math.floor(Date.now() / 1000)
    .toString(16)
    .padStart(8, "0");

  const random = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");

  return (timestamp + random).substring(0, 24);
}

export function generateNanoID(size: number = 21): string {
  const urlAlphabet =
    "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  let id = "";
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);

  for (let i = 0; i < size; i++) {
    id += urlAlphabet[bytes[i] % urlAlphabet.length];
  }
  return id;
}

export const generateIds = (count: number, type: IdType): string[] => {
  const newIds = [];
  for (let i = 0; i < count; i++) {
    switch (type) {
      case "uuid":
        newIds.push(generateUUID());
        break;
      case "objectid":
        newIds.push(generateObjectId());
        break;
      case "nanoid":
        newIds.push(generateNanoID());
        break;
    }
  }
  return newIds;
};
