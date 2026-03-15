/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'www.voiceoverguy.co.uk' },
      { protocol: 'https', hostname: 'voiceoverguy.co.uk' },
    ],
  },
};

module.exports = nextConfig;
