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
  CalendarClock,
  FileSpreadsheet,
  Regex,
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
      {
        title: "Unix Timestamp",
        url: "/tools/timestamp",
        icon: CalendarClock,
        description: "Convert epoch time to human date.",
      },
      {
        title: "CSV ↔ JSON",
        url: "/tools/csv",
        icon: FileSpreadsheet,
        description: "Convert data formats.",
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
    title: "Dev Tools",
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
      {
        title: "Regex Studio",
        url: "/tools/regex",
        icon: Regex,
        description: "Test and generate regular expressions.",
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

export const PATTERNS = [
  { name: "Email Address", pattern: "[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}" },
  {
    name: "Strong Password",
    pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
  },
  { name: "IPv4 Address", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
  {
    name: "URL / Link",
    pattern:
      "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
  },
  { name: "Hex Color", pattern: "#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})" },
  {
    name: "Phone (US)",
    pattern: "\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})",
  },
];
