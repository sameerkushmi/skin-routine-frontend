import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Skin Care Routine | Best Daily Skincare Tips for Healthy & Glowing Skin",
  description:
    "Discover the best skincare routine for healthy, glowing skin. Learn daily skincare steps, tips for oily, dry, and acne-prone skin, and expert advice to achieve radiant results.",
  keywords: [
    "skin care routine",
    "daily skincare routine",
    "glowing skin tips",
    "skincare for oily skin",
    "skincare for dry skin",
    "acne skincare routine",
    "healthy skin tips",
    "face care routine",
  ],
  openGraph: {
    title: "Best Skin Care Routine for Glowing & Healthy Skin",
    description:
      "Follow a complete skincare routine with expert tips for clear, healthy, and radiant skin every day.",
    type: "website",
  },
  icons:{
    icon: "/logo.png",
  }
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
