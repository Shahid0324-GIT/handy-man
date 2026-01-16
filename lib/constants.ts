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
  Clock,
  Image,
  FileCode,
  Split,
  Scaling,
  Type,
  FileSpreadsheet,
  Regex,
  FileText,
  Binary,
  Ratio,
  Tags,
  Eye,
  type LucideIcon,
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
        description: "Format/Validate JSON.",
      },
      {
        title: "CSV ↔ JSON",
        url: "/tools/csv",
        icon: FileSpreadsheet,
        description: "Convert data formats.",
      },
      {
        title: "Base64 Helper",
        url: "/tools/base64",
        icon: Code2,
        description: "Encode/Decode Base64.",
      },
      {
        title: "Number Base",
        url: "/tools/number-base",
        icon: Binary,
        description: "Hex, Binary, Octal.",
      },
      {
        title: "Pixel to REM",
        url: "/tools/pixel",
        icon: Scaling,
        description: "CSS unit converter.",
      },
    ],
  },
  {
    title: "Web Tools",
    icon: Globe,
    items: [
      {
        title: "URL Encoder",
        url: "/tools/url-encoder",
        icon: LinkIcon,
        description: "Encode/Decode URL strings.",
      },
      {
        title: "URL Builder",
        url: "/tools/url",
        icon: Globe,
        description: "Build UTM parameters.",
      },
      {
        title: "HTML Entity",
        url: "/tools/html-entity",
        icon: Code2,
        description: "Escape HTML characters.",
      },
      {
        title: "Meta Tags",
        url: "/tools/meta",
        icon: Tags,
        description: "SEO & Social tags.",
      },
    ],
  },
  {
    title: "Images & CSS",
    icon: Palette,
    items: [
      {
        title: "Image Converter",
        url: "/tools/image",
        icon: Image,
        description: "WebP, PNG, JPG.",
      },
      {
        title: "SVG to JSX",
        url: "/tools/svg",
        icon: FileCode,
        description: "SVG to React component.",
      },
      {
        title: "CSS Shadows",
        url: "/tools/shadows",
        icon: Palette,
        description: "Smooth box-shadows.",
      },
      {
        title: "Aspect Ratio",
        url: "/tools/aspect-ratio",
        icon: Ratio,
        description: "Calculate dimensions.",
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
        description: "MD5, SHA, Bcrypt.",
      },
      {
        title: "UUID / ID",
        url: "/tools/uuid",
        icon: QrCode,
        description: "Random UUIDs, NanoIDs.",
      },
      {
        title: "Lorem Ipsum",
        url: "/tools/lorem",
        icon: Type,
        description: "Placeholder text.",
      },
      {
        title: "QR Code",
        url: "/tools/qrcode",
        icon: QrCode,
        description: "Generate QR codes.",
      },
      {
        title: "Cron Generator",
        url: "/tools/cron",
        icon: Clock,
        description: "Cron schedule builder.",
      },
    ],
  },
  {
    title: "Text & Code",
    icon: Cpu,
    items: [
      {
        title: "Text Inspector",
        url: "/tools/inspector",
        icon: Eye,
        description: "Word count, Case convert.",
      },
      {
        title: "Regex Studio",
        url: "/tools/regex",
        icon: Regex,
        description: "Test and generate regex.",
      },
      {
        title: "Markdown",
        url: "/tools/markdown",
        icon: FileText,
        description: "Preview Markdown.",
      },
      {
        title: "Diff Viewer",
        url: "/tools/diff",
        icon: Split,
        description: "Compare text differences.",
      },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      {
        title: "JWT Decoder",
        url: "/tools/jwt",
        icon: Shield,
        description: "Decode tokens.",
      },
      {
        title: "AES Encryption",
        url: "/tools/aes",
        icon: Lock,
        description: "Encrypt/Decrypt.",
      },
    ],
  },
  {
    title: "Hardware",
    icon: Keyboard,
    items: [
      {
        title: "Keycode Info",
        url: "/tools/keycode",
        icon: Keyboard,
        description: "JS Event codes.",
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
