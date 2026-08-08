import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "ติวสอบ Database กลางภาค | สรุป + แบบฝึกหัด",
  description:
    "สรุปเนื้อหา Normalization (1NF–4NF), ER Diagram/Crow's Foot, Data Dictionary และแบบฝึกหัดสุ่มข้อ ตรวจคำตอบได้ พร้อมจัดอันดับ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
