/* eslint-disable */
/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    domains: ["knjzcsrhngnomfeoymis.supabase.co"]
  }
};

module.exports = nextConfig;
