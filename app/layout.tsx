import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CommandMenu } from "@/components/layout/command-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Handyman | Developer Tools",
  description: "Offline-capable developer utility belt.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Handyman",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents zooming on inputs in iOS
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CommandMenu />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
