module.exports = {
    apps: [
      {
        name: "express-backend",
        script: "./backend/server.js",
        watch: true,
        ignore_watch: [
          "node_modules",
          "assets",
          "*.json"
        ],
        env: {
          NODE_ENV: "development"
        },
        env_production: {
          NODE_ENV: "production"
        }
      },
      {
        name: "react-frontend",
        script: "npm",
        args: "start",
        cwd: "./frontend",
        watch: true,
        ignore_watch: [
          "node_modules",
          "public"
        ],
        env: {
          BROWSER: "none", // This prevents the automatic opening of the browser
          PORT: 3000
        },
        env_production: {
          NODE_ENV: "production",
          PORT: 3000
        }
      }
    ]
  };
  