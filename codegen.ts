
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./packages/backend/src/schema.graphql",
  generates: {
    "packages/backend/src/types.ts": {
      config: {
        contextType: './main#GraphqlContext'
      },
      plugins: ["typescript", "typescript-resolvers", "typescript-document-nodes"]
    }
  }
};

export default config;
