**News Aggregator App**

This is a full-stack news aggregator application designed to fetch, display, and manage news articles from various Greek media sources. The project features a modern React frontend and a robust Node.js backend with a MongoDB database.

**Description**
The application aggregates news from five prominent Greek news websites:
Real.gr
Instyle.gr
Olo Ygeia
The Cars
Real Player
It presents the collected articles in a clean, user-friendly interface, providing a single hub for news consumption. The backend is built with a scalable, layered architecture to support future features like user authentication and personalized feeds.

**Key Features**
Centralized News Feed: View articles from multiple sources in one place.
Source-Specific Filtering: Browse news from a single, selected source.
RESTful API: A well-structured backend API to serve article data.
Scalable Architecture: The backend uses a modern layered architecture (Controllers, Services, Repositories) for maintainability and future growth.
(Planned) User Authentication: User registration and login functionality.
(Planned) Automated Data Fetching: A cron job to periodically fetch and store new articles.
Tech Stack

**Frontend**
React: A JavaScript library for building user interfaces.
Vite: A next-generation frontend tooling for fast development.
TypeScript: Typed superset of JavaScript.
Tailwind CSS: A utility-first CSS framework.

**Backend**
Node.js: A JavaScript runtime environment.
Express.js: A minimal and flexible Node.js web application framework.
MongoDB: A NoSQL database for storing articles and sources.
Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
TypeScript: Typed superset of JavaScript.
dotenv: For managing environment variables.

Project Structure
The repository is organized as a monorepo with two main folders:
news-aggregator-app/
├── backend/       # Contains the Node.js/Express REST API
└── frontend/      # Contains the React client application
