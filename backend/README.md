# Shree Ashtavinayak Logistics - Backend API

A comprehensive MERN stack backend with TypeScript, Express.js, MySQL, and Prisma ORM featuring JWT authentication, role-based access control, and city management.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👥 **Role-Based Access** - Admin and User roles with different permissions
- 🏙️ **City Management** - CRUD operations for cities with pricing
- 📊 **User Management** - Admin can manage users and their roles
- 🛡️ **Security** - Helmet, CORS, input validation, and password hashing
- 📁 **Database** - MySQL with Prisma ORM for type-safe database operations
- 🚀 **TypeScript** - Full TypeScript support for better development experience

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: express-validator
- **Security**: bcryptjs, helmet, cors

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Cities
- `GET /api/cities` - Get all active cities (Public)
- `GET /api/cities/:id` - Get city by ID (Public)
- `GET /api/cities/admin` - Get all cities including inactive (Admin only)
- `POST /api/cities` - Create new city (Admin only)
- `PUT /api/cities/:id` - Update city (Admin only)
- `DELETE /api/cities/:id` - Delete/deactivate city (Admin only)

### Users (Admin only)
- `GET /api/users` - Get all users with pagination
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats/overview` - Get user statistics

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MySQL server
- npm or yarn

### 1. Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/logistics_db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRE_TIME="7d"

# Server
PORT=5000
NODE_ENV="development"

# CORS
FRONTEND_URL="http://localhost:3000"

# Admin Default Credentials
ADMIN_EMAIL="admin@shreelogistics.com"
ADMIN_PASSWORD="admin123"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Push database schema to MySQL
npm run prisma:push

# Seed the database with initial data
npm run seed
```

### 4. Development

```bash
# Start development server
npm run dev

# Or use the setup command (generates, pushes, seeds, and starts)
npm run setup
```

The server will start on `http://localhost:5000`

### 5. Production Build

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

## Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  firstName String
  lastName  String
  role      UserRole @default(USER)
  cityId    String?
  city      City?    @relation(fields: [cityId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### City Model
```prisma
model City {
  id          String @id @default(cuid())
  name        String @unique
  state       String
  pricePerKg  Float
  description String?
  isActive    Boolean @default(true)
  users       User[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Default Admin Account

After running the seed script, you can login with:
- **Email**: admin@shreelogistics.com
- **Password**: admin123

## API Documentation

### Response Format

All API responses follow this structure:

```json
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "errors": array (optional)
}
```

### Authentication

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Prisma Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Push schema changes without migration
npm run prisma:push

# Open Prisma Studio (Database GUI)
npm run prisma:studio

# Seed database
npm run seed
```

## Project Structure

```
backend/
├── src/
│   ├── routes/          # API route handlers
│   ├── middleware/      # Custom middleware
│   ├── utils/          # Utility functions
│   ├── scripts/        # Database seeders
│   └── index.ts        # Main server file
├── prisma/
│   └── schema.prisma   # Database schema
├── package.json
└── README.md
```

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure token generation and verification
- **Input Validation**: express-validator for request validation
- **CORS**: Configured for frontend domain
- **Helmet**: Security headers
- **Role-based Access**: Admin and User permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.