// I Forgot to set Type in Package.Json to "module" so I had to use require instead of import. can fix later.
require('dotenv').config();// env vars
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const cors = require('cors');

//local imports
const schema = require('./src/graphql/Schema/schema.js');
const routes = require('./src/routes/routes.js');
const Database = require('./db/db.js');

async function startServer() {
  // Connect to the database
  try {
    await Database.connect();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    // You might want to decide whether to continue starting the server or not
  }

  const app = express();
  const PORT = process.env.PORT || 3000;

  // Create Apollo Server instance
  const server = new ApolloServer({
    schema,
    introspection: true,
  });

  // Start the Apollo Server
  await server.start();

  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Apply Apollo middleware to a specific path
  app.use('/graphql', expressMiddleware(server));
  
  // REST API routes
  app.use('/api', routes);

  // Start Express server
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
    console.log(`API endpoint running at http://localhost:${PORT}/api`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});