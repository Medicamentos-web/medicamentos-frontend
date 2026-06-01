/** @type {import('next').NextConfig} */
// Sin hook de Webpack personalizado: si usas `next dev --turbo`, mezclar ambos
// provoca avisos de Next y a veces pantalla en blanco o HMR roto.
// `next build` sigue usando Webpack por defecto; `prebuild` limpia .next antes.
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
