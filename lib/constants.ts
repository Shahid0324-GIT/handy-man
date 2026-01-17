import {
  FileJson,
  Hash,
  Link as LinkIcon,
  Code2,
  QrCode,
  Palette,
  Lock,
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
  Calculator,
  Database,
  PaintBucket,
  LockKeyhole,
  Server,
  Gpu,
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
    title: "Database & Backend",
    icon: Database,
    items: [
      {
        title: "SQL Formatter",
        url: "/tools/sql",
        icon: Database,
        description: "Format SQL queries.",
      },
      {
        title: "Timestamp",
        url: "/tools/timestamp",
        icon: Clock,
        description: "Unix/Epoch converter.",
      },
      {
        title: "Chmod Calc",
        url: "/tools/chmod",
        icon: LockKeyhole,
        description: "Unix permissions.",
      },
      {
        title: "Slugify",
        url: "/tools/slug",
        icon: LinkIcon,
        description: "String to URL slug.",
      },
      {
        title: "Mock API Data",
        url: "/tools/mock-api",
        icon: Server,
        description: "Generate dummy JSON for Users, Posts, etc.",
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
      {
        title: "Color Converter",
        url: "/tools/color",
        icon: PaintBucket,
        description: "Hex to RGB.",
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
    icon: Gpu,
    items: [
      {
        title: "Hardware Info",
        url: "/tools/keycode",
        icon: Gpu,
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

export const icons = [
  {
    src: "/icons/windows11/SmallTile.scale-100.png",
    sizes: "71x71",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/SmallTile.scale-125.png",
    sizes: "89x89",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/SmallTile.scale-150.png",
    sizes: "107x107",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/SmallTile.scale-200.png",
    sizes: "142x142",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/SmallTile.scale-400.png",
    sizes: "284x284",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },

  {
    src: "/icons/windows11/Square150x150Logo.scale-100.png",
    sizes: "150x150",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Square150x150Logo.scale-125.png",
    sizes: "188x188",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Square150x150Logo.scale-150.png",
    sizes: "225x225",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Square150x150Logo.scale-200.png",
    sizes: "300x300",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Square150x150Logo.scale-400.png",
    sizes: "600x600",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },

  {
    src: "/icons/windows11/Wide310x150Logo.scale-100.png",
    sizes: "310x150",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Wide310x150Logo.scale-125.png",
    sizes: "388x188",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Wide310x150Logo.scale-150.png",
    sizes: "465x225",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Wide310x150Logo.scale-200.png",
    sizes: "620x300",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Wide310x150Logo.scale-400.png",
    sizes: "1240x600",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },

  {
    src: "/icons/windows11/LargeTile.scale-100.png",
    sizes: "310x310",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/LargeTile.scale-125.png",
    sizes: "388x388",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/LargeTile.scale-150.png",
    sizes: "465x465",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/LargeTile.scale-200.png",
    sizes: "620x620",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/LargeTile.scale-400.png",
    sizes: "1240x1240",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },

  {
    src: "/icons/windows11/Square44x44Logo.scale-100.png",
    sizes: "44x44",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Square44x44Logo.scale-125.png",
    sizes: "55x55",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Square44x44Logo.scale-150.png",
    sizes: "66x66",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Square44x44Logo.scale-200.png",
    sizes: "88x88",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/Square44x44Logo.scale-400.png",
    sizes: "176x176",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },

  {
    src: "/icons/windows11/StoreLogo.scale-100.png",
    sizes: "50x50",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/StoreLogo.scale-125.png",
    sizes: "63x63",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/StoreLogo.scale-150.png",
    sizes: "75x75",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/StoreLogo.scale-200.png",
    sizes: "100x100",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/StoreLogo.scale-400.png",
    sizes: "200x200",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },

  {
    src: "/icons/windows11/SplashScreen.scale-100.png",
    sizes: "620x300",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/SplashScreen.scale-125.png",
    sizes: "775x375",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/SplashScreen.scale-150.png",
    sizes: "930x450",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/SplashScreen.scale-200.png",
    sizes: "1240x600",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/windows11/SplashScreen.scale-400.png",
    sizes: "2480x1200",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },

  {
    src: "/icons/android/android-launchericon-512-512.png",
    sizes: "512x512",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/android/android-launchericon-192-192.png",
    sizes: "192x192",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/android/android-launchericon-144-144.png",
    sizes: "144x144",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/android/android-launchericon-96-96.png",
    sizes: "96x96",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/android/android-launchericon-72-72.png",
    sizes: "72x72",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/android/android-launchericon-48-48.png",
    sizes: "48x48",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },

  {
    src: "/icons/ios/180.png",
    sizes: "180x180",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/ios/192.png",
    sizes: "192x192",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/ios/512.png",
    sizes: "512x512",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
  {
    src: "/icons/ios/1024.png",
    sizes: "1024x1024",
    type: "image/png",
    purpose: "any maskable" as "any" | "maskable",
  },
];

export const FEATURES = [
  {
    icon: FileJson,
    title: "Converters",
    desc: "JSON, CSV, Base64, and Image conversion handled locally.",
    color: "text-blue-600 dark:text-yellow-500",
    bg: "bg-blue-600/10 dark:bg-yellow-500/10",
  },
  {
    icon: Hash,
    title: "Security",
    desc: "Generate Hashes (MD5, SHA), Encrypt text (AES), and decode JWTs.",
    color: "text-green-600 dark:text-red-500",
    bg: "bg-green-600/10 dark:bg-red-500/10",
  },
  {
    icon: QrCode,
    title: "Generators",
    desc: "Create UUIDs, QR Codes, Lorem Ipsum text, and CSS Shadows.",
    color: "text-blue-500 dark:text-yellow-400",
    bg: "bg-blue-500/10 dark:bg-yellow-400/10",
  },
  {
    icon: Globe,
    title: "Web Tools",
    desc: "URL Encoding, HTML Entities, Meta Tag generation, and more.",
    color: "text-green-500 dark:text-red-400",
    bg: "bg-green-500/10 dark:bg-red-400/10",
  },
  {
    icon: Calculator,
    title: "Math & Time",
    desc: "Unix Timestamp conversion, Number Base (Hex/Bin), and Math utils.",
    color: "text-blue-400 dark:text-yellow-600",
    bg: "bg-blue-400/10 dark:bg-yellow-600/10",
  },
  {
    icon: Cpu,
    title: "Offline PWA",
    desc: "Works without internet. Installable on Windows, Mac, iOS, Android.",
    color: "text-green-600 dark:text-red-600",
    bg: "bg-green-600/10 dark:bg-red-600/10",
  },
];
