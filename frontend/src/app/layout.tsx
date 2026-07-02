import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "ELARA | Ethereal Fashion",
    template: "%s | ELARA",
  },
  description: "Curated pieces that blend timeless luxury with a modern, airy feminine silhouette.",
  openGraph: {
    title: "ELARA | Ethereal Fashion",
    description: "Curated pieces that blend timeless luxury with a modern, airy feminine silhouette.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} bg-background text-on-surface min-h-screen`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
