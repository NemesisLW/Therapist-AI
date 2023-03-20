/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  async headers() {
    return [
      {
        source: "/fonts/inter-var.woff2",
        headers: [
          {
            key: "Cache-control",
            value: "public, immutable, max-age=31536000",
          },
        ],
      },
    ];
  },
};
