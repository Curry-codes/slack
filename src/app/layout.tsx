import type { Metadata } from "next";
import "./globals.css";
import { Lato } from "next/font/google";


const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Carisam-Slack",
  description: "Slack clone by Carisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={lato.className}
      >
        {children}
      </body>
    </html>
  );
}
