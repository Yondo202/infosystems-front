module.exports = {
  apps: [
    {
      name: "infoweb",
      script: "npm",
      args: "start",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
