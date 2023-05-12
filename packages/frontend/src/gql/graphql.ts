/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  number: Scalars['Int'];
  street: Scalars['String'];
  zipcode: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  code: Scalars['String'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProductToCart?: Maybe<ShopCart>;
};


export type MutationAddProductToCartArgs = {
  cartItem?: InputMaybe<NewShopCartItem>;
};

export type NewShopCartItem = {
  productId: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  isPopular: Scalars['Boolean'];
  price: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  cart?: Maybe<ShopCart>;
  categories: Array<Category>;
  category: Category;
  product?: Maybe<Product>;
};


export type QueryCategoryArgs = {
  categoryCode?: InputMaybe<Scalars['String']>;
};


export type QueryProductArgs = {
  productId: Scalars['Int'];
};

export type ShopCart = {
  __typename?: 'ShopCart';
  id: Scalars['String'];
  items: Array<Maybe<ShopCartItem>>;
  totalAmount: Scalars['Int'];
  totalUnits: Scalars['Int'];
  userId: Scalars['String'];
};

export type ShopCartItem = {
  __typename?: 'ShopCartItem';
  product: ShopCartItemProduct;
  quantity: Scalars['Int'];
};

export type ShopCartItemProduct = {
  __typename?: 'ShopCartItemProduct';
  id: Scalars['Int'];
  image: Scalars['String'];
  price: Scalars['Int'];
  title: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  productAddedToCart?: Maybe<ShopCartItem>;
};


export type SubscriptionProductAddedToCartArgs = {
  shopCartId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  address: Address;
  email: Scalars['String'];
  id: Scalars['String'];
  name: Username;
};

export type Username = {
  __typename?: 'Username';
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type LayoutDataQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type LayoutDataQueryQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', code: string }> };


export const LayoutDataQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LayoutDataQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<LayoutDataQueryQuery, LayoutDataQueryQueryVariables>;