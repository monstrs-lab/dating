import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['../../../../native/app/src/**/*.graphql'],
  emitLegacyCommonJSImports: false,
  generates: {
    '../../../../native/app/src/operations/sdk.ts': {
      plugins: [
        {
          '@graphql-codegen/add': {
            content: '/* eslint-disable */\n// @ts-nocheck',
          },
        },
        '@graphql-codegen/typescript',
        '@graphql-codegen/typescript-operations',
        '@graphql-codegen/typescript-graphql-request',
      ],
      config: {
        maybeValue: 'T | undefined',
        useTypeImports: true,
        emitLegacyCommonJSImports: true,
        inlineFragmentTypes: 'combine',
      },
    },
  },
}

export default config
