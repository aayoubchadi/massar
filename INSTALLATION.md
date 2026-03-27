# Installation Guide - Massar Platform

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd massar-platform
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Setup

#### Backend Environment

1. Copy the environment file:
```bash
cd backend
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/massar_platform

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

#### Frontend Environment

The frontend uses the Vite development server, which automatically reads the backend proxy configuration from `vite.config.ts`.

### 4. Database Setup

#### Option A: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service:
   - **Windows**: `net start MongoDB`
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

#### Option B: MongoDB Atlas

1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

### 5. Start the Application

#### Development Mode

Start both frontend and backend concurrently:

```bash
# From the root directory
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

#### Manual Start

Alternatively, start each service separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 6. Verify Installation

1. Open your browser and navigate to http://localhost:5173
2. You should see the Massar Platform homepage
3. Check the backend health: http://localhost:5000/api/health

## Production Deployment

### Frontend Build

```bash
cd frontend
npm run build
```

### Backend Build

```bash
cd backend
npm run build
```

### Environment Variables for Production

Create a `.env.production` file with production-specific values:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=https://your-domain.com
```

## Docker Setup (Optional)

### Dockerfile for Backend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/massar_platform
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change the port in `.env` file
   - Kill the process using the port: `netstat -ano | findstr :5000`

2. **MongoDB Connection Failed**
   - Verify MongoDB is running
   - Check connection string in `.env`
   - Ensure firewall allows MongoDB connections

3. **Dependency Installation Errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and reinstall
   - Try using yarn instead of npm

4. **CORS Errors**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check CORS configuration in backend server

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload in development
2. **API Testing**: Use tools like Postman or Insomnia to test backend endpoints
3. **Database Management**: Use MongoDB Compass for database visualization
4. **Code Quality**: Run `npm run lint` to check for code issues

## Next Steps

After successful installation:

1. **Explore the Features**: Navigate through different sections of the platform
2. **Review the Code**: Understand the project structure and implementation
3. **Customize**: Modify colors, fonts, and styling to match your needs
4. **Add Features**: Extend the platform with additional functionality
5. **Deploy**: Deploy to your preferred hosting platform

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the logs in the terminal
3. Verify all environment variables are set correctly
4. Ensure all prerequisites are properly installed

## Architecture Overview

```
massar-platform/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── contexts/   # React contexts
│   │   ├── utils/      # Utility functions
│   │   └── types/      # TypeScript types
│   └── public/         # Static assets
├── backend/           # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── models/     # Mongoose models
│   │   ├── routes/     # API routes
│   │   ├── middleware/ # Express middleware
│   │   └── utils/      # Utility functions
│   └── dist/           # Compiled TypeScript
├── shared/            # Shared types and utilities
└── docs/             # Documentation
```

This modern educational platform provides a solid foundation for building comprehensive learning management systems with Arabic language support and responsive design.
