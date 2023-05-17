/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query CategoryDetailQuery($categoryCode: String!) {\n    category(categoryCode: $categoryCode) {\n      code\n      products {\n        id\n        title\n        price\n        image\n        isPopular\n      }\n    }\n  }\n": types.CategoryDetailQueryDocument,
    "\n  query ProductDetailQuery($productId: Int!) {\n    product(productId: $productId) {\n      id\n      title\n      price\n      category\n      description\n      image\n    }\n  }\n": types.ProductDetailQueryDocument,
    "\n  mutation AddProductToCart($productId: Int!) {\n    addProductToCart(cartItem: {\n      productId: $productId,\n      quantity: 1\n    }) {\n      id\n      userId\n      items {\n      quantity\n        product {\n          title\n          price\n        }\n      }\n    }\n  }\n": types.AddProductToCartDocument,
    "\n  query ShopCartQuery {\n    cart {\n      id\n      userId\n      totalUnits\n      totalAmount\n      items {\n        quantity\n        product {\n          id\n          title\n          price\n          image\n        }\n      }\n    }\n  }\n": types.ShopCartQueryDocument,
    "\n  query LayoutDataQuery {\n    categories {\n      code\n    }\n  }\n": types.LayoutDataQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CategoryDetailQuery($categoryCode: String!) {\n    category(categoryCode: $categoryCode) {\n      code\n      products {\n        id\n        title\n        price\n        image\n        isPopular\n      }\n    }\n  }\n"): (typeof documents)["\n  query CategoryDetailQuery($categoryCode: String!) {\n    category(categoryCode: $categoryCode) {\n      code\n      products {\n        id\n        title\n        price\n        image\n        isPopular\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductDetailQuery($productId: Int!) {\n    product(productId: $productId) {\n      id\n      title\n      price\n      category\n      description\n      image\n    }\n  }\n"): (typeof documents)["\n  query ProductDetailQuery($productId: Int!) {\n    product(productId: $productId) {\n      id\n      title\n      price\n      category\n      description\n      image\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddProductToCart($productId: Int!) {\n    addProductToCart(cartItem: {\n      productId: $productId,\n      quantity: 1\n    }) {\n      id\n      userId\n      items {\n      quantity\n        product {\n          title\n          price\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddProductToCart($productId: Int!) {\n    addProductToCart(cartItem: {\n      productId: $productId,\n      quantity: 1\n    }) {\n      id\n      userId\n      items {\n      quantity\n        product {\n          title\n          price\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ShopCartQuery {\n    cart {\n      id\n      userId\n      totalUnits\n      totalAmount\n      items {\n        quantity\n        product {\n          id\n          title\n          price\n          image\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ShopCartQuery {\n    cart {\n      id\n      userId\n      totalUnits\n      totalAmount\n      items {\n        quantity\n        product {\n          id\n          title\n          price\n          image\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LayoutDataQuery {\n    categories {\n      code\n    }\n  }\n"): (typeof documents)["\n  query LayoutDataQuery {\n    categories {\n      code\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;