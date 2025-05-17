import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const Font = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KBN-RB",
  description: "ERP System for Plantation Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="KBN RB" />
      </head>
      <body className={`${Font.className} antialiased`}>{children}</body>
    </html>
  );
}
