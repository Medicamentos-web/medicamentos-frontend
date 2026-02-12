/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Permitir acceso desde túneles de Cloudflare en dev
  allowedDevOrigins: [
    "politics-organ-stanley-verde.trycloudflare.com",
    "0ktlorw-anonymous-8081.exp.direct",
  ],

  // Proxy: reenvía peticiones del backend a través de Next.js
  // Esto permite acceso WAN con un solo túnel (puerto 3000)
  async rewrites() {
    const backendUrl = process.env.BACKEND_INTERNAL_URL || "http://localhost:4000";
    return [
      // API endpoints
      { source: "/api/:path*", destination: `${backendUrl}/api/:path*` },
      // Auth endpoints
      { source: "/auth/:path*", destination: `${backendUrl}/auth/:path*` },
      // Admin panel
      { source: "/admin/:path*", destination: `${backendUrl}/admin/:path*` },
      // Dashboard del backend
      { source: "/dashboard", destination: `${backendUrl}/dashboard` },
      // Health check
      { source: "/health", destination: `${backendUrl}/health` },
    ];
  },
};

export default nextConfig;
