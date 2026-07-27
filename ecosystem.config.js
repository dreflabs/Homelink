module.exports = {
  apps: [
    {
      name: 'homelink',
      script: 'server.js',
      cwd: './.next/standalone',
      instances: 1, // atau 'max' untuk cluster
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
    },
  ],
};
