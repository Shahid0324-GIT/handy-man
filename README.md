# ![Logo](./public/favicon-32x32.png) Handyman

**The Ultimate Offline-Capable Developer Utility Belt.**

Handyman is a privacy-first, progressive web application (PWA) containing over 25+ essential tools for developers. Built with modern web technologies, it performs all calculations, conversions, and logic **entirely on the client-side**—meaning your data (tokens, passwords, files) never leaves your browser.

## 🚀 Key Features

- **🔒 Privacy First:** No server-side processing. All JWT decoding, Hashing, and File conversion happens in your browser.
- **⚡ High Performance:** Heavy tasks (like parsing 50MB CSV files) are offloaded to **Web Workers** to keep the UI buttery smooth.
- **📱 Native Experience:** Fully installable **PWA** (Progressive Web App). Works offline on Windows, macOS, iOS, and Android.
- **🎨 Modern UI:** Built with **Shadcn UI** and **Tailwind CSS** for a clean, accessible, and responsive interface.
- **❤️ Favorites System:** Pin your most-used tools to the top of the sidebar (persisted via LocalStorage).

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (with Persistence middleware)
- **PWA Engine:** `@ducanh2912/next-pwa`
- **Code Editor:** Monaco Editor (`@monaco-editor/react`)
- **Performance:** Web Workers API

## ⭐ Top 5 Featured Tools

### 1. 🛡️ JWT Decoder (Client-Side)

Most online decoders send your tokens to a server. Handyman decodes headers and payloads locally, verifies signatures structure, and color-codes the output without ever exposing your secrets.

### 2. 🧪 Regex Studio

A powerful environment to test and generate regular expressions.

- **Real-time Highlighting:** Visualizes matches as you type.
- **Quick Library:** One-click insertion for common patterns (Email, IPv4, URLs).

### 3. 📦 CSV ↔ JSON Converter (Worker Powered)

Convert massive data files without freezing the browser.

- **Drag & Drop:** Supports large file uploads.
- **Web Worker:** Offloads parsing logic to a background thread.

### 4. ⏰ Cron Expression Generator

Stop guessing cron syntax. Visual builder to schedule jobs ("Every Monday at 9 AM") with immediate human-readable translation and copy-paste strings.

### 5. 🔐 Secure Hash & Encryption

Generate MD5, SHA-1, SHA-256, SHA-512, and Bcrypt hashes instantly. Also supports **AES Encryption/Decryption** for secure text sharing.

---

## 🧰 Full Tool Suite (25+ Tools)

### 🔄 Converters

- **JSON Formatter:** Validate, minify, and beautify JSON.
- **Base64 Helper:** Encode and decode strings/files.
- **Number Base:** Convert between Binary, Octal, Decimal, and Hex.
- **Pixel to REM:** Essential for responsive CSS development.
- **Image Converter:** Convert WebP, PNG, and JPG locally.

### ⚡ Generators

- **UUID / NanoID:** Generate cryptographically strong unique IDs.
- **QR Code:** Create downloadable QR codes for URLs and text.
- **Lorem Ipsum:** Generate placeholder text for UI mocking.
- **CSS Shadows:** Layered, smooth box-shadow generator.

### 🌐 Web Tools

- **URL Encoder:** Smart "Strict" vs "Safe" encoding modes.
- **URL Builder:** Easily construct URLs with UTM parameters.
- **HTML Entity Encoder:** Escape unsafe characters for HTML.
- **Meta Tag Generator:** Create SEO and Social Media (OG/Twitter) tags.

### 📝 Text & Code

- **Markdown Preview:** Live preview with GFM (Tables) and Syntax Highlighting.
- **Diff Viewer:** Compare two text files side-by-side to spot changes.
- **Text Inspector:** Word count, character count, and Case conversion (camelCase, snake_case).
- **SVG to JSX:** Convert raw SVG code into React components.

### 🛡️ Security

- **AES Encryption:** Securely encrypt text with a secret key.
- **Keycode Info:** Instant lookup for JavaScript keyboard events.

---

## 💻 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/handyman.git
cd handyman

# Install dependencies (using Bun is recommended for speed)
bun install
# OR
npm install

```

Run the development server:

```bash
bun dev
# OR
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 📱 PWA Installation

- **Desktop (Chrome/Edge):** Click the "Install Handyman" icon in the address bar.
- **Mobile (iOS):** Tap "Share" -> "Add to Home Screen".
- **Mobile (Android):** Tap the installation prompt or "Add to Home Screen" from the menu.

---

## 🤝 Contributing

Contributions are welcome! If you have an idea for a new tool:

1. Fork the repo.
2. Create a new branch (`git checkout -b feature/new-tool`).
3. Add your tool to `app/tools/` and update `lib/constants.ts`.
4. Submit a Pull Request.

---

**Built with ❤️ by Jameel Shahid Mohammed.**
