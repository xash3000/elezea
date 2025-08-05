// next.config.ts
const nextConfig = {
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7259';
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${apiBaseUrl}/api/:path*`, // Backend URL
      },
    ];
  },
};

export default nextConfig;
