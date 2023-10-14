import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "image-2-colors",
  description: "easily extract colors from an image",
  twitter: {
    card: "summary_large_image",
    site: "https://image2colors.vercel.app",
    creator: "@ducaswtf",
    title: "image-2-colors - easily extract colors from an image",
    images: ["/snap.png"],
  },
  openGraph: {
    locale: "pt_BR",
    url: "https://image2colors.vercel.app",
    title: "image-2-colors - easily extract colors from an image",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>{children}</body>
    </html>
  );
}
