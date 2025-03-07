module.exports = {
  apps: [{
    name: 'media-bot',
    script: 'src/bot/index.js',
    env: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0' // Listen on all network interfaces
    },
    env_production: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0' // Listen on all network interfaces
    }
  }]
}