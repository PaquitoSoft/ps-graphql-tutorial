import path from 'node:path';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import {
  PubSub,
  YogaInitialContext,
  createPubSub,
  createSchema,
  createYoga
} from 'graphql-yoga';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';

import { Resolvers, ShopCartItem } from './types';
import authRequiredDirective from './directives/auth-required';
import CategoriesAPI from './datasources/categories-api';
import ProductsAPI from './datasources/products-api';
import ShopCartsAPI from './datasources/shop-carts-api';
import UsersAPI from './datasources/users-api';
import { connect } from './db/connection-manager';
import ShopCartModel from './db/models/shop-cart.model';

const HTTP_PORT = process.env.PORT;

type AppPubSubDefinition = {
  productAddedToCart: [payload: ShopCartItem]
}

export interface GraphqlContext extends YogaInitialContext {
  userId?: string;
  pubSub: PubSub<AppPubSubDefinition>,
  dataSources: {
    categories: CategoriesAPI;
    products: ProductsAPI;
    shopCarts: ShopCartsAPI;
    users: UsersAPI;
  }
};

const pubSub = createPubSub<AppPubSubDefinition>();

const ecommerceRestApiUrl = process.env.ECOMMERCE_API_BASE_URL as string;

const typeDefs = readFileSync(path.join(__dirname, './schema.graphql'), 'utf8');

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
const resolvers: Resolvers = mergeResolvers(resolversArray);

const { authDirectiveTypeDef, authDirectiveTransformer } = authRequiredDirective();

console.log({ authDirectiveTypeDef });

let schema = createSchema({
  typeDefs: [authDirectiveTypeDef, typeDefs],
  resolvers
});
schema = authDirectiveTransformer(schema);

async function bootstrap() {
  // Connect to database
  await connect(process.env.DATABASE_CONNECTION_URL);
  console.log('Connected to MongoDB!')

  // Create Yoga instance
  const yoga = createYoga({
    schema,
    maskedErrors: false,
    context({ request, params }) {
      const authHeader = request.headers.get('Authorization');
      return {
        request,
        params,
        userId: authHeader ? authHeader.split(' ')[1] : undefined,
        pubSub,
        dataSources: {
          categories: new CategoriesAPI(ecommerceRestApiUrl),
          products: new ProductsAPI(ecommerceRestApiUrl),
          shopCarts: new ShopCartsAPI(ShopCartModel),
          users: new UsersAPI(ecommerceRestApiUrl),
        }
      }
    }
  });

  // Create HTTP server
  const server = createServer(yoga);

  // Start HTTP server
  server.listen(HTTP_PORT, () => {
    console.info(`Server is running on http://localhost:${HTTP_PORT}/graphql`);
  });
}

bootstrap();
