import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
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
