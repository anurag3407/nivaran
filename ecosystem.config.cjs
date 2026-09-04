module.exports = {
  apps: [
    {
      name: "nivaran",
      script: "npm",
      args: "start -- -p 3001",
      cwd: "/home/ubuntu/apps/nivaran",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
