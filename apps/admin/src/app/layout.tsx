import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OnlyFlags Admin — Dashboard",
  description: "Admin dashboard for the OnlyFlags platform. Design/Development by Photon-Bounce.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
