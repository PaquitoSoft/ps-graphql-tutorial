import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../../pages/home';
import CategoryPage from '../../pages/category/category';
import ProductPage from '../../pages/product/product';
import { UserProvider } from '../providers/user-provider';

const client = new ApolloClient({
  uri: 'http://localhost:4004/graphql',
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
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
