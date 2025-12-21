# Car Adverts API - Backend

A Node.js REST API server built with Express.js and Prisma for managing car dealership operations, including dealers, cars, and sales personnel.

## 🚀 Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.2
- **ORM**: Prisma 7.2
- **Database**: PostgreSQL
- **Adapter**: @prisma/adapter-pg

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- PostgreSQL database
- Git

## 🛠️ Installation

1. **Clone the repository** (if applicable):

   ```bash
   git clone <repository-url>
   cd CarAdverts/Backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
   PORT=3000
   NODE_ENV=development
   ```

4. **Generate Prisma Client**:

   ```bash
   npx prisma generate
   ```

5. **Run database migrations**:
   ```bash
   npx prisma migrate deploy
   ```
   Or for development:
   ```bash
   npx prisma migrate dev
   ```

## 🗄️ Database Schema

The application uses the following main models:

- **Dealer**: Represents a car dealership
- **Car**: Represents a car listing with details (make, model, year, price, etc.)
- **User**: Represents sales personnel or administrators associated with a dealer

### Models Overview

- `Dealer`: id, name, createdAt, updatedAt
- `Car`: id, make, model, year, description, registration, price, dealerId, buyInDate
- `User`: id, email, password, role (ADMIN/SALESMAN), dealerId

## 🚦 Running the Server

### Development Mode

Currently, there's no dev script configured. You can run:

```bash
node server.js
```

Or add a dev script to `package.json`:

```json
"scripts": {
  "dev": "node --watch server.js",
  "start": "node server.js"
}
```

Then run:

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the PORT specified in your `.env` file).

## 📡 API Endpoints

### Health Check

- **GET** `/api/v1/health` - Check server health status
  ```json
  {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

### Cars

- **POST** `/api/v1/car` - Create a new car listing

  **Request Body**:

  ```json
  {
    "make": "Toyota",
    "model": "Camry",
    "year": 2023,
    "description": "Excellent condition, low mileage",
    "registration": "ABC123",
    "price": 25000,
    "dealerId": "dealer-uuid-here"
  }
  ```

  **Response** (201 Created):

  ```json
  {
    "message": "Car created successfully",
    "data": {
      "id": "car-uuid",
      "make": "Toyota",
      "model": "Camry",
      "year": 2023,
      "description": "Excellent condition, low mileage",
      "registration": "ABC123",
      "price": 25000,
      "dealerId": "dealer-uuid-here",
      "buyInDate": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

  **Validation**:

  - All fields are required
  - `year` must be a number between 1900 and current year + 1
  - `price` must be a positive number
  - `dealerId` must reference an existing dealer

## 📁 Project Structure

```
Backend/
├── Car/
│   ├── Car/
│   │   └── route.js          # Car CRUD routes
│   └── Deal/
│       └── route.js          # Deal routes (to be implemented)
├── Dealer/
│   ├── Customer/
│   │   └── route.js          # Customer routes (to be implemented)
│   ├── Dealer/
│   │   └── route.js          # Dealer routes (to be implemented)
│   └── SalesPerson/
│       └── route.js          # SalesPerson routes (to be implemented)
├── lib/
│   └── prisma.js             # Prisma client configuration
├── prisma/
│   ├── migrations/           # Database migrations
│   └── schema.prisma         # Prisma schema definition
├── generated/
│   └── prisma/               # Generated Prisma client
├── server.js                 # Express server entry point
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🔧 Development

### Prisma Commands

- **Generate Prisma Client**: `npx prisma generate`
- **Create Migration**: `npx prisma migrate dev --name migration_name`
- **Apply Migrations**: `npx prisma migrate deploy`
- **Open Prisma Studio**: `npx prisma studio` (GUI to view/edit database)

### Environment Variables

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## 🐛 Error Handling

The API includes error handling middleware that returns appropriate HTTP status codes:

- `400`: Bad Request (validation errors)
- `404`: Not Found (resource doesn't exist)
- `409`: Conflict (duplicate entries)
- `500`: Internal Server Error

## 📝 Notes

- The Prisma client is configured with a PostgreSQL adapter for connection pooling
- Passwords are currently stored in plain text - implement hashing (bcrypt) for production
- Additional routes for Dealers, SalesPerson, and Customers are prepared but not yet implemented
- The API uses ES Modules (`type: "module"` in package.json)

## 👤 Author

Stephen Byrne

## 📄 License

ISC
