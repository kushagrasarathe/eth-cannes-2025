import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import PhoneMockup from "@/components/phone";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zen Yield",
  description: "Earn yield on your idle capital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>
          <div className="relative flex min-h-screen flex-col items-center justify-center bg-white">
            <PhoneMockup>
              <main className="flex-1 w-full">{children}</main>
            </PhoneMockup>
          </div>
        </Providers>
      </body>
    </html>
  );
}
