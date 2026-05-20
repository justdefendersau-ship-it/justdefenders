/**
 * ============================================================
 * JustDefenders ©
 * File: C:\dev\justdefenders\frontend\ecosystem.config.js
 * Timestamp: 16 May 2026 21:10 Sydney
 * PM2 Production Runtime
 * ============================================================
 */

module.exports = {

  apps: [

    {
      name: "justdefenders-frontend",

      cwd: "C:/dev/justdefenders/frontend",

      script: "node_modules/next/dist/bin/next",

      args: "start -p 8081",

      env: {

        NODE_ENV: "production"
      }
    }
  ]
}