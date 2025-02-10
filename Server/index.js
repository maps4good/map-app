require('dotenv').config(); // required .env.config to get env vars
const { ApolloServer } = require('@apollo/server'); // Import ApolloServer from the correct package
const { startStandaloneServer } = require('@apollo/server/standalone'); // Import startStandaloneServer
const express = require('express');
const schema = require('./graphql/schema'); // Ensure this points to your GraphQL schema
const newsRoutes = require('./routes/newsRoutes');
const Database = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
Database.connect();

// Middleware
app.use(express.json());
app.use('/api', newsRoutes); // Custom API routes

// Create Apollo Server instance
const server = new ApolloServer({
  schema,
  introspection: true,  // Enable introspection (optional)
  playground: true,     // Enable Apollo GraphQL Playground
});

// Apply Apollo Server to Express
startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
  console.log(`API endpoint running at http://localhost:${PORT}/api`);
});
