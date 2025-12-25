import path from "node:path";

console.log("LOADED next.config from:", __filename);

const nextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
