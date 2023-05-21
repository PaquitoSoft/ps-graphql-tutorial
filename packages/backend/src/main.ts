import { createServer } from 'node:http';

import { createAppYoga } from './graphql-server';
import { connect } from './db/connection-manager';

const HTTP_PORT = process.env.PORT;

async function bootstrap() {
  // Connect to database
  await connect(process.env.DATABASE_CONNECTION_URL);
  console.log('Connected to MongoDB!')

  // Create Yoga instance
  const yoga = createAppYoga();

  // Create HTTP server
  const server = createServer(yoga);

  // Start HTTP server
  server.listen(HTTP_PORT, () => {
    console.info(`Server is running on http://localhost:${HTTP_PORT}/graphql`);
  });
}

bootstrap();
