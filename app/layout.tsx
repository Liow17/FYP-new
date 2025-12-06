import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cybersecurity Awareness Platform",
  description: "A web-based platform for learning about cybersecurity fundamentals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
