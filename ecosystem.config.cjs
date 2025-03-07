module.exports = {
  apps: [{
    name: 'media-bot',
    script: 'src/bot/index.js',
    env: {
      NODE_ENV: 'production',
      HOST: '192.168.2.219'
    },
    env_production: {
      NODE_ENV: 'production',
      HOST: '192.168.2.219'
    }
  }]
}