# Massar Platform - Modern Educational Management System

A modern, responsive web application inspired by the Moroccan government's Massar platform, built with React, Node.js, and Tailwind CSS.

## Features

- **Multi-role Authentication**: Students, Teachers, and Administrators
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Arabic/RTL Support**: Full Arabic language support
- **Academic Management**: Courses, grades, attendance tracking
- **Real-time Dashboard**: Live updates and notifications
- **Modern UI/UX**: Clean, intuitive interface

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Hook Form for forms
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- CORS for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see `.env.example`)

4. Start the development servers:
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
massar-platform/
├── frontend/          # React application
├── backend/           # Node.js API server
├── shared/            # Shared types and utilities
└── docs/             # Documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
