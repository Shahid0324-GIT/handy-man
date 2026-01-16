import {
  FileJson,
  Hash,
  Link as LinkIcon,
  Code2,
  QrCode,
  Palette,
  Lock,
  Keyboard,
  Wrench,
  Zap,
  Globe,
  Shield,
  Cpu,
  type LucideIcon,
  FileCode,
} from "lucide-react";

export const APP_CONFIG = {
  name: "Handyman",
  version: "1.0.0",
  description: "Developer Utility Belt",
};

export interface ToolItem {
  title: string;
  url: string;
  icon: LucideIcon;
  description: string;
}

export interface NavGroup {
  title: string;
  icon: LucideIcon;
  items: ToolItem[];
}

export const NAV_ITEMS: NavGroup[] = [
  {
    title: "Converters",
    icon: Wrench,
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
      {
        title: "SVG to JSX",
        url: "/tools/svg",
        icon: FileCode,
        description: "Convert SVG code to React components.",
      },
    ],
  },
  {
    title: "Generators",
    icon: Zap,
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
      {
        title: "CSS Shadows",
        url: "/tools/shadows",
        icon: Palette,
        description: "Create smooth, layered box-shadows.",
      },
    ],
  },
  {
    title: "Web Tools",
    icon: Globe,
    items: [
      {
        title: "URL Builder",
        url: "/tools/url",
        icon: LinkIcon,
        description: "Parse URLs and build UTM parameters.",
      },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      {
        title: "AES Encryption",
        url: "/tools/aes",
        icon: Lock,
        description: "Encrypt and decrypt text using AES.",
      },
    ],
  },
  {
    title: "Dev Extras",
    icon: Cpu,
    items: [
      {
        title: "Keycode Info",
        url: "/tools/keycode",
        icon: Keyboard,
        description: "Visualize Javascript keyboard events.",
      },
    ],
  },
];
