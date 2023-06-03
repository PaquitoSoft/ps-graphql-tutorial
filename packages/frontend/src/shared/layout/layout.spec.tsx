import { renderWithProviders } from '../../utils/test-utils';

import Layout from './layout';

describe('Layout', () => {
  it('should render children', () => {
    const container = renderWithProviders(
      <Layout>
        <p>FooBar</p>
      </Layout>
    );

    expect(container.getByText('FooBar')).toBeInTheDocument();
  });
  it('should render page title when provided', async () => {
    const container = renderWithProviders(
      <Layout pageTitle="My title">
        <p>FooBar</p>
      </Layout>
    );

    expect(container.getByText('My title')).toBeInTheDocument();
    expect(container.getByText('FooBar')).toBeInTheDocument();
  });

  it('should render header with data', async () => {
    const container = renderWithProviders(
      <Layout pageTitle="My title">
        <p>FooBar</p>
      </Layout>
    );

    await container.findByText('electronics');
  });
});
