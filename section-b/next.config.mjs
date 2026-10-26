/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    // Lets you write `@use "styles/tokens"` from any .scss file.
    includePaths: ["./src"]
  }
};

export default nextConfig;
