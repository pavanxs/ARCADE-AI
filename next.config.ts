import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Polyfills for Node.js modules in browser for 0G SDK compatibility
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        process: false,
        child_process: false,
        path: false,
        os: false,
        url: false,
        querystring: false,
        http: false,
        https: false,
        assert: false,
        events: false,
        string_decoder: false,
        circomlibjs: false,
      };

      // Provide polyfills for global objects
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': JSON.stringify({
            ...process.env,
            NODE_ENV: process.env.NODE_ENV,
          }),
          'global': 'globalThis',
        })
      );

      // Handle Buffer polyfill
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        })
      );
    }

    return config;
  },
};

export default nextConfig;