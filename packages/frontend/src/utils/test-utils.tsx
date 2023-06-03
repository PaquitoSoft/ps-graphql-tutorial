import '@testing-library/jest-dom';
import type { ReactNode } from "react";
import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import { client } from '../apollo-client';

export function renderWithProviders(children: ReactNode) {
  return render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ApolloProvider>
  );
}
