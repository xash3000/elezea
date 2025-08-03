// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://localhost:7259/api/:path*", // Backend URL
      },
    ];
  },
};
