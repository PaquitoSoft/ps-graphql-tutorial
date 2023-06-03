import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { v4 as uuid } from 'uuid';
import nodeFetch from 'node-fetch';

const USER_ID_STORAGE_KEY = '__uid';

const httpLink = createHttpLink({
  uri: process.env.NX_GRAPHQL_ENDPOINT,
  fetch: window.fetch || nodeFetch
});

const authLink = setContext((_, { headers }) => {
  let userId = window.localStorage.getItem(USER_ID_STORAGE_KEY);
  if (!userId) {
    userId = uuid();
    window.localStorage.setItem(USER_ID_STORAGE_KEY, userId);
  }
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${userId}`
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
