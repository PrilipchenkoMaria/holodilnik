module.exports = {
  apps: [
    {
      exec_mode: "cluster",
      filter_env: ["REACT_"],
      name: "server",
      script: "./server/index.js",
      watch: false,
    },
  ],
  static: [{
    host: "0.0.0.0",
    monitor: "false",
    name: "client",
    path: "./build",
    port: "3000",
    spa: "true",
  }],
};
