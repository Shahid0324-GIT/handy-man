import {
  FileJson,
  Hash,
  Link as LinkIcon,
  Code2,
  QrCode,
  Palette,
  Lock,
  type LucideIcon,
} from "lucide-react";

export const APP_CONFIG = {
  name: "Handyman",
  version: "1.0.0",
  description: "Developer Utility Belt",
};

interface ToolItem {
  title: string;
  url: string;
  icon: LucideIcon;
  description: string;
}

interface NavGroup {
  title: string;
  items: ToolItem[];
}

export const NAV_ITEMS: NavGroup[] = [
  {
    title: "Essentials",
    items: [
      {
        title: "JSON Formatter",
        url: "/tools/json",
        icon: FileJson,
        description: "Format, validate, and convert JSON data.",
      },
      {
        title: "Base64 Helper",
        url: "/tools/base64",
        icon: Code2,
        description: "Encode and decode text or files to Base64.",
      },
    ],
  },
  {
    title: "Generators",
    items: [
      {
        title: "Hash Generator",
        url: "/tools/hash",
        icon: Hash,
        description: "Generate MD5, SHA-1, SHA-256, and bcrypt hashes.",
      },
      {
        title: "UUID / ID",
        url: "/tools/uuid",
        icon: QrCode,
        description: "Generate random UUIDs and ObjectIDs.",
      },
    ],
  },
  {
    title: "Web Tools",
    items: [
      {
        title: "URL Builder",
        url: "/tools/url",
        icon: LinkIcon,
        description: "Parse URLs and build UTM parameters.",
      },
      {
        title: "CSS Shadows",
        url: "/tools/shadows",
        icon: Palette,
        description: "Create smooth, layered box-shadows.",
      },
      {
        title: "AES Encryption",
        url: "/tools/aes",
        icon: Lock,
        description: "Encrypt/Decrypt text with a secret key.",
      },
    ],
  },
];
