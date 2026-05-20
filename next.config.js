// JustDefenders ©
// File: C:\dev\justdefenders\frontend\next.config.js
// Timestamp: 14 May 2026 16:45 Sydney

/** @type {import('next').NextConfig} */

const nextConfig = {

  reactStrictMode: true,

  swcMinify: true,

  /**
   * Exclude React Native mobile workspace
   * from Next.js production traversal.
   *
   * Mobile runtime is stabilised separately.
   */
  webpack: (config) => {

    config.resolve.alias = {

      ...(config.resolve.alias || {}),

      "react-native$": false
    }

    return config
  },

  typescript: {

    /**
     * Continue production hardening
     * while allowing alpha readiness build.
     */
    ignoreBuildErrors: false
  },

  eslint: {

    ignoreDuringBuilds: false
  }
}

module.exports = nextConfig