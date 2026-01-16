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
  Type,
  type LucideIcon,
  FileCode,
  Split,
  ShieldCheck,
  Scaling,
  Clock,
  Image,
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
      {
        title: "Pixel to REM",
        url: "/tools/pixel",
        icon: Scaling,
        description: "Convert CSS units.",
      },
      {
        title: "Image Converter",
        url: "/tools/image",
        icon: Image,
        description: "Convert between WebP, PNG, and JPG.",
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
      {
        title: "Lorem Ipsum",
        url: "/tools/lorem",
        icon: Type,
        description: "Generate placeholder text.",
      },
      {
        title: "QR Code",
        url: "/tools/qrcode",
        icon: QrCode,
        description: "Generate downloadable QR codes.",
      },
      {
        title: "Cron Generator",
        url: "/tools/cron",
        icon: Clock,
        description: "Create cron schedule expressions.",
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
      {
        title: "JWT Decoder",
        url: "/tools/jwt",
        icon: ShieldCheck,
        description: "Decode headers and payloads.",
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
      {
        title: "Diff Viewer",
        url: "/tools/diff",
        icon: Split,
        description: "Compare text differences side-by-side.",
      },
    ],
  },
];

export const DAYS = [
  { id: "0", label: "Sun" },
  { id: "1", label: "Mon" },
  { id: "2", label: "Tue" },
  { id: "3", label: "Wed" },
  { id: "4", label: "Thu" },
  { id: "5", label: "Fri" },
  { id: "6", label: "Sat" },
];
