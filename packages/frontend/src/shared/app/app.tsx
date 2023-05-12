import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Layout from "../layout/layout";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../../pages/home';

const client = new ApolloClient({
  uri: 'http://localhost:4004/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
