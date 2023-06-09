import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { client } from './apollo-client';
import App from './shared/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App apolloClient={client} />
  </StrictMode>
);
