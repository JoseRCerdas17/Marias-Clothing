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
  let apiUrl: URL | null = null;

  try {
    apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL);
  } catch {
    apiUrl = null;
  }

  if (apiUrl) {
    remotePatterns.push({
      protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
      hostname: apiUrl.hostname,
      port: apiUrl.port,
      pathname: "/product-images/**",
    });
  }
}

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns,
  },
  ...(process.env.NODE_ENV === "development"
    ? {
        turbopack: {
          root: process.cwd(),
        },
      }
    : {}),
};

export default nextConfig;
