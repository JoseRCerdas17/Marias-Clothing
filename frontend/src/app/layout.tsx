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
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👗</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.variable} bg-background text-on-surface min-h-screen`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
