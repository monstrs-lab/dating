import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: 'short',
})

export default withVanillaExtract({
  output: 'standalone',
  experimental: {
    externalDir: true,
    esmExternals: 'loose',
  },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts'],
      '.jsx': ['.jsx', '.tsx'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    }

    // eslint-disable-next-line no-param-reassign
    config.resolve.alias = {
      ...config.resolve.alias,
      effector: require.resolve('effector'),
      'effector-react': require.resolve('effector-react'),
    }

    return config
  },
})
