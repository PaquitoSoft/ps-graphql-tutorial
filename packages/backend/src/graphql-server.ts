import path from 'node:path';
import { readFileSync } from 'node:fs';
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
import ShopCartModel from './db/models/shop-cart.model';

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

function createAppSchema() {
  const schema = createSchema({
    typeDefs: [authDirectiveTypeDef, typeDefs],
    resolvers
  });
  return authDirectiveTransformer(schema);
}

export function createAppYoga() {
  return createYoga({
    schema: createAppSchema(),
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
}
