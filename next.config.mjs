/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve existing image domains if needed
  images: {
    unoptimized: true,
  },
  // Transpile MUI packages for App Router compatibility
  transpilePackages: ['@mui/material', '@mui/icons-material', '@mui/system'],
  experimental: {
    optimizeCss: false, // Stops CSS from being inlined into one minified line
  },
  compress: false, // Stops gzip collapsing everything into one unreadable line
};

export default nextConfig;
