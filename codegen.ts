import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./packages/backend/src/schema.graphql",
  documents: [
    "./packages/frontend/src/**/*.tsx",
    "./packages/frontend/src/**/*.ts"
  ],
  generates: {
    "packages/backend/src/types.ts": {
      config: {
        contextType: './graphql-server#GraphqlContext'
      },
      plugins: ["typescript", "typescript-resolvers", "typescript-document-nodes"]
    },
    "packages/frontend/src/gql/": {
      preset: "client"
    }
  }
};

export default config;
