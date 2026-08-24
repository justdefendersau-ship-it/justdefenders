/**
 * ==================================================================================================
 * JUSTDEFENDERSÂ® ENGINEERING
 * Authority: PR-004A â€” PM2 Production Entrypoint Correction
 * ==================================================================================================
 */

module.exports = {
  apps: [
    {
      name: "justdefenders-frontend",
      cwd: "C:/dev/justdefenders/frontend",
      script: "server/server.js",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
