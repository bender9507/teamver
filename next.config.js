/* eslint-disable */
/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

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
        protocol: "https",
        hostname: "knjzcsrhngnomfeoymis.supabase.co"
      }
    ]
  },
  compiler: {
    emotion: true
  }
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public"
        }
      }
    ]
  ],
  nextConfig
);
