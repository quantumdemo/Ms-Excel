import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileGatekeeper from "@/components/layout/MobileGatekeeper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LearnExcel - Master Microsoft Excel",
  description: "A premium mobile-only interactive learning platform for mastering Microsoft Excel functions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MobileGatekeeper>
          {children}
        </MobileGatekeeper>
      </body>
    </html>
  );
}
