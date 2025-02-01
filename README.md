# Northcoders News API

Hosted Website: https://be-nc-news-r5rg.onrender.com
Project Link: https://github.com/aldaldaldald/be-nc-news

---

## Summary

Northcoders News API is a back-end application built with Node.js and Express, providing a live API for accessing and interacting with news-related data. The API is hosted on Render and allows users to retrieve articles, post comments, and interact with a database hosted on Supabase. It includes a suite of tests written using Jest and Supertest to ensure the functionality and reliability of the API endpoints.

The API is fully functional and accessible online, but there is currently no front-end interface.

---

## Built With

### Front-End:

No front-end has been built yet.

### Back-End:

Node.js: Backend development and environment setup.
Express: Web framework for handling routing, middleware, and HTTP requests.
pg: PostgreSQL client for connecting to the database hosted on Supabase.

### Testing & Build Tools:

Jest: Used for unit and integration testing to ensure the reliability and correctness of the API.
Supertest: HTTP testing library, used with Jest to test API routes and responses.
dotenv: Loads environment variables for configuring the application.
npm: Package manager for handling dependencies and scripts.
Jest Sorted: Extends jest.expect with 2 custom matchers, toBeSorted and toBeSortedBy.
Husky: Runs tests upon committing or pushing.

### Version Control:

Git (via GitHub): Version control software that lets multiple people make separate changes to web pages at the same time.

### API Routes

API documentation is available in the endpoints.json file at the root of the repository or can be accessed by visiting /api in your browser once the app is running.

---

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Before you begin, make sure you have the following installed:

Node.js (minimum version: v12.0.0 or higher)
npm (Node Package Manager, comes with Node.js)
PostgreSQL (minimum version: v10.0.0 or higher)

Links to download

Node.js: https://nodejs.org/en/
PostgreSQL: https://node-postgres.com

## Installation

Fork and clone the repository
First, fork the repository found at the top of this page to your GitHub account, then clone it to your local machine:
git clone https://github.com/[your_username]/be-nc-news.git

Install dependencies
Navigate into the project directory with your command line interface and install the necessary dependencies:
cd be-nc-news.git
npm install

Set up environment variables
Create two .env files for the project: .env.development and .env.test.
In .env.development, add: PGDATABASE=[database_name]
In .env.test, add: PGDATABASE=[database_name]\_test

Make sure to replace [database_name] with the appropriate name for your development and test environments.

**Important: Ensure that these .env files are gitignored to keep sensitive information secure. .env.\* should be included to catch this.**

Set up your local database:
If you're using Supabase locally or have a PostgreSQL instance running, make sure it’s configured and accessible. You can follow the Supabase documentation for local development setup if needed.

Seed the local database:
To set up the initial data for the application, run the seed script. This will populate the database with necessary sample data.
Run the following command to seed the database:
npm run seed

Run the application locally
To start the API locally, run the following command:
npm start

Run tests
To ensure everything is set up correctly, you can run the tests using Jest:
npm test

---

## Roadmap

Add full testing suite with GET, POST, PATCH, and DELETE requests. (Completed)
Front-end interface to be built.
More to be confirmed.

---

## Acknowledgments

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

---
