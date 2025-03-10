## apollo docs
https://www.apollographql.com/docs/apollo-server/migration#migrate-from-apollo-server-express
# Map-App News Server

A comprehensive news API server that provides location-based news data through both GraphQL and REST APIs. The server interacts with an MS SQL Server database to store and retrieve news articles, locations, and categories.

## Features

- Location-based news retrieval
- Category filtering of news articles
- REST API for CRUD operations
- GraphQL API for flexible data queries
- SQL Server integration

## System Architecture

The application follows a multi-layered architecture:

- **Models**: Define data structures for news, locations, and categories
- **DAOs** (Data Access Objects): Handle database operations
- **Services**: Implement business logic
- **Controllers**: Handle REST API endpoints
- **Resolvers**: Handle GraphQL queries
- **Routes**: Define API endpoints

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web server framework
- **Apollo Server** - GraphQL implementation
- **MS SQL Server** - Database
- **msnodesqlv8** - SQL Server driver for Node.js

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MS SQL Server
- ODBC Driver 17 for SQL Server

### Database Setup

1. Run the SQL script in `db/newssql.sql` to create the database schema and sample data.
2. Configure user permissions using `db/Assign sql user to db.sql` (uncomment and modify as needed).

### Configuration

Create a `.env` file in the root directory with the following variables:

DB_SERVER=your_server_name DB_NAME=news PORT=3000


### Installation

```bash
# Install dependencies
npm install

# Start the server
npm start

The server will be available at:

GraphQL API: http://localhost:3000/graphql
REST API: http://localhost:3000/api
API Documentation
REST API Endpoints
News Endpoints
POST /api/news: Create a new news article
PUT /api/news/:id: Update an existing news article
DELETE /api/news/:id: Delete a news article
POST /api/news/import: Import multiple news articles
Other Endpoints
GET /api/admin/stats: Get system statistics
GET /api/categories: Get all categories
GET /api/locations: Get all locations
GraphQL API
Use the GraphQL playground at http://localhost:3000/graphql to explore the API.

Example Queries

# Get all news
query {
  news {
    news_id
    title
    description
    location {
      city
      country
    }
    categories {
      type
    }
  }
}

# Get news with filters
query {
  news(location_id: 1, category_id: 7, limit: 5) {
    title
    author
    description
  }
}

# Get all locations
query {
  locations {
    location_id
    city
    country
  }
}

Database Schema
The database consists of four main tables:

location: Stores location information (city, region, country)
news: Stores news articles with references to locations
category: Stores news categories
news_category: Junction table for the many-to-many relationship between news and categories
See db/newssql.sql for the complete schema definition.

Resources
Apollo Server Documentation
Apollo Sandbox for testing