/* eslint-disable */
/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  pageExtensions: ["page.tsx", "page.ts"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "knjzcsrhngnomfeoymis.supabase.co"
      },
      {
        protocol: 'http',
        hostname: 'via.placeholder.com'
      },
    ],
  },
  compiler: {
    emotion: true
  }
};

module.exports = nextConfig;
