import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ['latin'],
  preload: false
});

const mangoGrotesque = localFont({
  src: [
    {
      path: "./fonts/MangoGrotesque-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mango-grotesque",
  preload: false
});

export const metadata: Metadata = {
  title: "Biya Merchant",
  description: "Automate airtime and data recharges with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${darkerGrotesque.variable} ${darkerGrotesque.className} ${mangoGrotesque.variable} font-sans scrollbar`}
        suppressHydrationWarning
      >
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
