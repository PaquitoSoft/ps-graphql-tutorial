import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import HomePage from '../../pages/home/home';
import CategoryPage from '../../pages/category/category';
import ProductPage from '../../pages/product/product';
import ShopCartPage from '../../pages/shop-cart/shop-cart';
import { UserProvider } from '../providers/user-provider';
import OrderConfirmationPage from '../../pages/order-confirmation/order-confirmation';

const USER_ID_STORAGE_KEY = '__uid';

const httpLink = createHttpLink({
  uri: 'http://localhost:4004/graphql'
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryCode" element={<CategoryPage />} />
            <Route path="/category/:categoryCode/product/:productId" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<ShopCartPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
