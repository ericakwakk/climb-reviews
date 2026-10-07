/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prototype: tell search engines not to list ANY response (pages, images, files).
  // Works together with the robots meta tag in app/layout.js. Remove both at launch.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
