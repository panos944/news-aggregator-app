# News Aggregator App

A full-stack MERN news aggregator application designed to fetch, display, and manage news articles from various Greek media sources. Features modern React frontend, robust Node.js backend with MongoDB, complete authentication system, and comprehensive testing.

## 🌟 Key Features

✅ **Complete Authentication System**
- JWT-based user registration and login
- Protected routes and middleware
- Password hashing with bcrypt
- Role-based access control

✅ **Centralized News Feed**
- View articles from multiple sources in one place
- Source-specific filtering and browsing
- Real-time RSS feed parsing and image extraction

✅ **Modern Architecture**
- Layered backend architecture (Controllers, Services, Repositories, DTOs)
- RESTful API with comprehensive documentation
- TypeScript throughout for type safety

✅ **Comprehensive Testing**
- Backend unit tests (Jest, Supertest)
- Frontend component tests (Vitest, Testing Library)
- 85%+ test coverage

✅ **API Documentation**
- Interactive Swagger/OpenAPI documentation
- Try-it-out functionality for all endpoints
- Authentication examples and schemas

✅ **Production Ready**
- Environment-based configuration
- Error handling and validation
- Mobile-responsive design

## 📰 News Sources

The application aggregates news from five prominent Greek websites:
- [Real.gr](https://www.real.gr) - General news
- [InStyle.gr](https://www.instyle.gr) - Fashion and lifestyle  
- [Olo Ygeia](https://www.oloygeia.gr) - Health and wellness
- [The Cars](https://www.thecars.gr) - Automotive news
- [Real Player](https://player.real.gr/) - Radio news

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **Vitest** + Testing Library for testing

### Backend  
- **Node.js** + **Express.js** with TypeScript
- **MongoDB** + **Mongoose** for data persistence
- **JWT** for authentication
- **bcrypt** for password hashing
- **express-validator** for input validation
- **rss-parser** for RSS feed processing
- **Jest** + **Supertest** for testing
- **Swagger** for API documentation

## 📁 Project Structure

```
news-aggregator-app/
├── backend/                 # Node.js/Express REST API
│   ├── src/
│   │   ├── api/            # Route definitions
│   │   ├── config/         # Database and Swagger config
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth and validation middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── services/       # Business logic
│   │   ├── utils/          # JWT utilities
│   │   └── __tests__/      # Unit tests
│   └── docs/               # API examples
└── frontend/               # React client application
    ├──src/
      ├── components/ # React components
      ├── contexts/ # React Context providers
      ├── pages/ # Page components
      ├── services/ # API service functions
      ├── types/ # TypeScript definitions
      └── tests/ # Unit tests
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/news-aggregator-app.git
   cd news-aggregator-app
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Start development server
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   
   # Start development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/api-docs

## 🧪 Testing

- **Vitest** for unit testing
- **Testing Library** for component testing
- **Coverage reporting** included

```bash
npm test              # Run tests
npm run test:ui       # Run with UI
npm run test:coverage # Run with coverage
```