// eslint-disable-next-line
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.resolver.extraNodeModules.stream = require.resolve('stream-browserify')
config.resolver.extraNodeModules.buffer = require.resolve('buffer')

module.exports = config
