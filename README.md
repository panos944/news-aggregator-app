# News Aggregator App

This is a full-stack news aggregator built with the MERN stack (MongoDB, Express, React, Nodejs) that automatically fetches, displays and manages articles. Features real-time RSS processing, a responsive React frontend, and a scalable Node.js/Express backend with MongoDB Atlas integration and automated hourly updates.

## Description

The application aggregates news from five prominent Greek websites:

- **Real.gr** - General news and current affairs
- **Instyle.gr** - Lifestyle and fashion content  
- **Olo Ygeia** - Health and wellness articles
- **The Cars** - Automotive news and reviews
- **Real Player** - The digital home of Real FM 97.8

It presents the collected articles in a clean, user-friendly interface, providing a single hub for Greek news consumption. The backend features a scalable, layered architecture with automated RSS feed processing.

## Key Features

✅ **Implemented:**
- **Centralized News Feed**: View articles from multiple sources in one place
- **Source-Specific Pages**: Browse news from individual sources via dedicated pages
- **Real-time RSS Integration**: Automated fetching from live RSS feeds with image extraction
- **RESTful API**: Well-structured backend API serving article data
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Automated Data Fetching**: Cron job runs hourly to fetch fresh articles
- **Layered Architecture**: Controllers → Services → Repositories → Models pattern

🚧 **Planned Features:**
- User Authentication (registration and login)
- Personalized news feeds
- Article bookmarking
- Advanced filtering and search

## Tech Stack

### Frontend
- **React** - Component-based UI library
- **Vite** - Fast development build tool
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose** - MongoDB object modeling
- **TypeScript** - Type-safe development
- **RSS Parser** - Feed processing with media content extraction
- **Node Cron** - Scheduled task management
- **CORS** - Cross-origin resource sharing

## Project Structure

 ```
news-aggregator-app/
├── backend/ # Node.js/Express REST API
│ ├── src/
│ │ ├── api/ # Route definitions
│ │ ├── controllers/ # Request handlers
│ │ ├── services/ # Business logic
│ │ ├── repositories/ # Data access layer
│ │ ├── models/ # MongoDB schemas
│ │ ├── dtos/ # Data transfer objects
│ │ ├── config/ # Database configuration
│ │ ├── scripts/ # Utility scripts
│ │ └── seed/ # Database seeding
│ └── package.json
└── frontend/ # React client application
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route components
│ ├── types/ # TypeScript definitions
│ └── data/ # Static data and configurations
└── package.json
```
## Architecture Highlights

- **Layered Backend**: Clean separation between API routes, business logic, and data access
- **RSS Processing**: Advanced image extraction from various RSS feed formats
- **Database Integration**: MongoDB with proper indexing and upsert operations
- **Error Handling**: Comprehensive error management across all layers
- **Type Safety**: Full TypeScript implementation for both frontend and backend

---

*Setup instructions and deployment guide will be added upon project completion.*
