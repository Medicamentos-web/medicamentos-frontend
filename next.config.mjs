/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Force unique build ID to bust Vercel build cache
  generateBuildId: () => `build-${Date.now()}`,

  // Desactivar source maps en producción (protección anti-copia)
  productionBrowserSourceMaps: false,

  // Permitir acceso desde túneles de Cloudflare en dev
  allowedDevOrigins: [
    "politics-organ-stanley-verde.trycloudflare.com",
    "0ktlorw-anonymous-8081.exp.direct",
  ],

  // Headers de seguridad
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=(self)" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Proxy: reenvía peticiones del backend a través de Next.js
  async rewrites() {
    const backendUrl = process.env.BACKEND_INTERNAL_URL || "http://localhost:4000";
    return [
      { source: "/api/:path*", destination: `${backendUrl}/api/:path*` },
      { source: "/auth/:path*", destination: `${backendUrl}/auth/:path*` },
      { source: "/admin/:path*", destination: `${backendUrl}/admin/:path*` },
      { source: "/dashboard", destination: `${backendUrl}/dashboard` },
      { source: "/health", destination: `${backendUrl}/health` },
    ];
  },
};

export default nextConfig;
