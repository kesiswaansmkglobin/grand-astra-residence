import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grand Astra Residence | Luxury Living",
  description:
    "Discover premium luxury living at Grand Astra Residence. Exquisite homes with sophisticated design, strategic location, and world-class amenities.",
  keywords: [
    "Grand Astra Residence",
    "luxury residence",
    "premium home",
    "real estate",
    "luxury living",
  ],
  openGraph: {
    title: "Grand Astra Residence | Luxury Living",
    description:
      "Exquisite luxury homes with sophisticated design and premium amenities.",
    type: "website",
    locale: "id_ID",
  },
  other: {
    "darkreader-lock": "no-darkreader",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-dark text-text-primary antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
