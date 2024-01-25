import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
}

export default config
