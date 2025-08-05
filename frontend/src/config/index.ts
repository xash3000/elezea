const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7259',
} as const;

export default config;
