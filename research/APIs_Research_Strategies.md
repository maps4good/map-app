# News APIs Overview

## Available News APIs

1. **[NewsAPI](https://newsapi.org/)**
   - Provides news articles from a wide range of sources.
   - Free tier allows up to 500 requests per day.

2. **[ContextualWeb News API](https://rapidapi.com/contextualwebsearch/api/web-search)**
   - Offers access to news data from multiple sources and categories.
   - Free tier available with 1,000 requests per month.

3. **[Currents API](https://currentsapi.services/en/docs/)**
   - Offers real-time news from multiple sources and categories.
   - Free tier provides up to 1,000 requests per month.

4. **[New York Times API](https://developer.nytimes.com/apis)**
   - Access to articles, reviews, and more from the New York Times.
   - Offers free access with limited requests.

5. **[Guardian API](https://open-platform.theguardian.com/documentation/)**
   - Offers news data from The Guardian newspaper.
   - Free access with limited requests per day.

## Data Retrieval Strategies

To manage news data effectively, consider the following strategies:

### 1. Set Up a Daily Scheduler
   - Use task schedulers (e.g., cron jobs, AWS Lambda) to automate data retrieval at regular intervals (e.g., daily).
   - Limit requests to a small subset of data to stay within daily API request limits.

### 2. Track Data Retrieval
   - Store the retrieved data in a database (e.g., SQL Server).
   - Track the last updated time to prevent re-fetching the same data.

### 3. Implement Pagination
   - Retrieve data in chunks (pages) over multiple days, ensuring you don’t exceed the daily limit.
   - Keep track of the last page fetched to continue the next time.

### 4. Caching Data
   - Cache data to prevent unnecessary re-fetching and reduce API load.

### 5. Combine Data from Multiple Sources
   - Use multiple APIs to gather data across different categories and sources, maximizing the use of available requests.

### 6. Data Refresh Mechanism
   - Set up a refresh mechanism to ensure the data stays up-to-date.

## Example Data Retrieval Workflow
1. **Day 1**: Retrieve news from Source A (first page) and store it.
2. **Day 2**: Retrieve news from Source A (second page), and then Source B (first page).
3. Continue until all pages from both sources are retrieved.

## Techniques to Optimize API Requests

### 1. Pagination
   - **What it is**: Fetch data in batches (pages) to avoid exceeding request limits.
   - **Example**: If 100 results per request, fetch 1,000 results in 10 requests. https://www.youtube.com/watch?v=ZX3qt0UWifc  Real nice explaination and hands on example from easy to complex.

### 2. Incremental Retrieval (Time-based)
   - **What it is**: Fetch only new data since the last request using timestamps.
   - **Example**: Retrieve only articles added since the last request.

### 3. Rate Limiting and Backoff Strategies
   - **What it is**: Distribute requests over time to avoid hitting rate limits.
   - **Example**: If allowed 1 request per minute, send requests slowly.

### 4. Batching Requests (If Supported)
   - **What it is**: Send multiple requests in a single API call to reduce overhead.
   - **Example**: Combine 5 requests into 1 batch request.

### 5. Caching
   - **What it is**: Store previously fetched data locally to avoid redundant requests.
   - **Example**: Cache weather data for 1 hour.
   https://www.youtube.com/watch?v=6FyXURRVmR0 // Explains Caching in general.
    https://www.youtube.com/watch?v=dGAgxozNWFE  // Explains Caching in depth.  Hardware, OS, Software, db, and Cloud Caching. 
    nice that it shows caching in different parts of an app architecture.

### 6. Webhooks (If Available)
   - **What it is**: Use webhooks to receive data when an event occurs, reducing the need for frequent requests.
   - **Example**: Use financial APIs that notify you when stock prices change.

### 7. Data Export (If Supported) "we should look into this"
   - **What it is**: Export large datasets in bulk (e.g., CSV, JSON) for offline processing.
   - **Example**: Download historical news data in bulk.

### 8. Using Multiple API Keys
   - **What it is**: Rotate multiple API keys to increase your request limit.
   - **Example**: Use one key for 1,000 requests, then switch to another key.

## Strategy Summary
To efficiently retrieve data over time without exceeding API limits, combine strategies such as pagination, incremental retrieval, caching, and backoff. Always ensure compliance with the API's terms of service while optimizing data retrieval.
