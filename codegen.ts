
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./packages/backend/src/schema.graphql",
  documents: [
    "./packages/frontend/src/**/*.tsx"
  ],
  generates: {
    "packages/backend/src/types.ts": {
      config: {
        contextType: './main#GraphqlContext'
      },
      plugins: ["typescript", "typescript-resolvers", "typescript-document-nodes"]
    },
    "packages/frontend/src/gql/": {
      preset: "client"
    }
  }
};

export default config;
