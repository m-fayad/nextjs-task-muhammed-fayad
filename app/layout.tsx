import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const spartan = League_Spartan({
  variable: "--font-spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT legends task | Muhammed Yousry Fayad",
  description:
    "task for it legends frontend developer (nextjs) by muhammed yousry fayad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spartan.variable} antialiased`}>{children}</body>
    </html>
  );
}
