import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "lh3.googleusercontent.com",
  },
  {
    protocol: "https",
    hostname: "*.googleusercontent.com",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
  {
    protocol: "https",
    hostname: "picsum.photos",
  },
  {
    protocol: "http",
    hostname: "localhost",
    port: "8000",
    pathname: "/product-images/**",
  },
  {
    protocol: "https",
    hostname: "*.up.railway.app",
    pathname: "/product-images/**",
  },
];

if (process.env.NEXT_PUBLIC_API_URL) {
  const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL);

  remotePatterns.push({
    protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
    hostname: apiUrl.hostname,
    port: apiUrl.port,
    pathname: "/product-images/**",
  });
}

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
