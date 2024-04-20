import type { Metadata } from "next";
import "../styles/base.scss";
import { ToastProvider } from "@/context/toastContext";


export const metadata: Metadata = {
  title: "Biya",
  description: "Automate airtime and data recharges with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body suppressHydrationWarning={true}>
        <div>
          <ToastProvider>
            {children}
          </ToastProvider>
        </div>
      </body>
    </html>
  );
}
