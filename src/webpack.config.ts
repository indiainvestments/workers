const { EnvironmentPlugin } = require("webpack");

module.exports = {
  entry: "./handler.ts",
  plugins: [
    new EnvironmentPlugin({
      DISCORD: process.env.DISCORD_INVITE,
      REDDIT: process.env.SUBREDDIT_LINK,
      YOUTUBE: process.env.YOUTUBE_CHANNEL,
    })
  ]
}