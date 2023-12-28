module.exports = function conf(api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
  }
}
