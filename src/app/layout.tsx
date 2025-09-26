import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Zahy - Performance Marketing Expert",
  description: "Professional media buyer and performance marketing specialist delivering exceptional ROI through strategic digital advertising campaigns and data-driven optimization.",
  keywords: ["Michael Zahy", "Performance Marketing", "Media Buyer", "Facebook Ads", "Instagram Marketing", "Digital Marketing", "ROI Optimization", "Growth Hacking"],
  authors: [{ name: "Michael Zahy" }],
  openGraph: {
    title: "Michael Zahy - Performance Marketing Expert",
    description: "Professional media buyer and performance marketing specialist delivering exceptional ROI through strategic digital advertising campaigns.",
    url: "https://michaelzahy.com",
    siteName: "Michael Zahy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Zahy - Performance Marketing Expert",
    description: "Professional media buyer and performance marketing specialist delivering exceptional ROI through strategic digital advertising campaigns.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/manifest.json' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
