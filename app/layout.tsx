import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CommandMenu } from "@/components/layout/command-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Handyman | Dev Tools",
  description: "Client-side developer utilities",
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
          defaultTheme="system"
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
