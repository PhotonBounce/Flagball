import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OnlyFlags — The Future of Flag Football",
  description: "Play. Earn. Collect. The blockchain-integrated flag football platform where every play counts. Design/Development by Photon-Bounce.",
  keywords: ["flag football", "NFT", "blockchain", "sports", "play to earn", "Polygon"],
  openGraph: {
    title: "OnlyFlags — The Future of Flag Football",
    description: "Play. Earn. Collect. The blockchain-integrated flag football platform.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Ambient background layers */}
        <div className="of-bg-mesh" aria-hidden="true" />
        <div className="of-field-grid" aria-hidden="true" />
        <div className="of-noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
