import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BTC-FAQ | Bitcoin Questions Answered",
    template: "%s | BTC-FAQ"
  },
  description: "Your #1 resource for Bitcoin FAQs, guides, and trusted affiliate offers. Learn, earn, and join the crypto revolution.",
  keywords: ["Bitcoin", "FAQ", "Crypto", "Affiliate", "BTC", "Cryptocurrency", "Earn Bitcoin", "Bitcoin Guide", "Bitcoin Taxes", "Crypto Taxes"],
  authors: [{ name: "BTC-FAQ" }],
  creator: "BTC-FAQ",
  publisher: "BTC-FAQ",
  metadataBase: new URL('https://btc-faq.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://btc-faq.com', // Replace with your actual domain
    title: 'BTC-FAQ | Bitcoin Questions Answered',
    description: 'Your #1 resource for Bitcoin FAQs, guides, and trusted affiliate offers. Learn, earn, and join the crypto revolution.',
    siteName: 'BTC-FAQ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTC-FAQ | Bitcoin Questions Answered',
    description: 'Your #1 resource for Bitcoin FAQs, guides, and trusted affiliate offers. Learn, earn, and join the crypto revolution.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
