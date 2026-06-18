import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minotar.net',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      // Adicionamos o domínio do Google abaixo:
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;