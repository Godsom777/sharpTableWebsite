/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve existing image domains if needed
  images: {
    unoptimized: true,
  },
  // Transpile MUI packages for App Router compatibility
  transpilePackages: ['@mui/material', '@mui/icons-material', '@mui/system'],
};

export default nextConfig;
