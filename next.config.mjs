import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'ui-avatars.com', 'www.gstatic.com'],
  },
};

export default withPWA({
  dest: 'public',
  disable: true,
  register: false,
  skipWaiting: true,
})(nextConfig);
