/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com", "images.unsplash.com","img.freepik.com","example.com","images.pexels.com"],
    },
    eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
