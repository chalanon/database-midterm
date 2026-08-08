// basePath ใช้เฉพาะตอน build production (สำหรับ GitHub Pages subpath)
// ในโหมด dev ให้เป็น "" เสมอ เพื่อไม่ให้ NEXT_PUBLIC_BASE_PATH ที่รั่วมาจาก session อื่น
// ทำให้ asset 404 บน localhost (ไม่เช่นนั้นจะเลือกตอบข้อสอบไม่ได้)
const isDev = process.env.NODE_ENV !== "production";
const basePath = isDev ? "" : process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
