module.exports = {
  apps: [{
    name: 'discord-media-bot',
    script: 'src/bot/index.js',
    watch: false,
    autorestart: true,
    max_restarts: 5,
    env: {
      NODE_ENV: 'production'
    }
  }]
}