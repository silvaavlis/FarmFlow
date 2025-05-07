# FreshDel - Fresh Vegetables & Fruits E-commerce Platform

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Security Features](#security-features)
9. [Frontend Routes](#frontend-routes)
10. [Admin Features](#admin-features)
11. [Future Improvements](#future-improvements)

## Project Overview
FreshDel is a full-stack e-commerce platform specializing in fresh vegetables and fruits. Built with the MERN stack, it provides a seamless shopping experience with features like product management, user authentication, and an admin dashboard.

## Features
- User authentication (register/login)
- Product browsing and searching
- Shopping cart functionality
- Category-based filtering
- Price range filtering
- Admin product management
- Responsive design
- Real-time cart updates
- Product image gallery
- Toast notifications

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **State Management**: React Context API
- **Styling**: TailwindCSS
- **Notifications**: React-Toastify

## Project Structure
```
Frontend (React + Vite)
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── context/           # State management
│   ├── services/          # API services
│   └── assets/            # Static assets

Backend (Node.js + Express)
├── controllers/           # Business logic
├── models/               # Database schemas
├── routes/               # API routes
├── middleware/           # Custom middleware
└── server.js            # Entry point
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/freshdel
JWT_SECRET=your-secret-key
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Documentation

### User Routes
```
POST /api/user/register
Body: {
  name: String,
  email: String,
  password: String
}

POST /api/user/login
Body: {
  email: String,
  password: String
}
```

### Product Routes
```
GET    /api/products           # Get all products
GET    /api/products/:id       # Get single product
POST   /api/products           # Create product (admin)
PUT    /api/products/:id       # Update product (admin)
DELETE /api/products/:id       # Delete product (admin)
POST   /api/products/seed      # Seed sample products (admin)
```

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean,
  createdAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  subCategory: String,
  image: [String],
  available: Boolean,
  rating: Number,
  reviews: [{
    user: ObjectId,
    rating: Number,
    comment: String,
    date: Date
  }]
}
```

## Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Input validation
- CORS configuration
- Environment variables for sensitive data

## Frontend Routes
```
/               # Home page
/collection     # Product listing
/product/:id    # Product details
/cart          # Shopping cart
/login         # Authentication
/admin/products # Admin dashboard
```

## Admin Features
- Product management dashboard
- Add/Edit/Delete products
- Manage product availability
- Bulk product seeding
- Protected admin routes
- Admin-only access

## Future Improvements
1. User Management
   - User profile management
   - Password reset functionality
   - Email verification

2. Order Management
   - Order tracking
   - Order history
   - Order status updates

3. Payment Integration
   - Multiple payment gateways
   - Secure payment processing
   - Payment status tracking

4. Product Features
   - Product reviews and ratings
   - Wishlist functionality
   - Bulk product import/export
   - Image upload functionality

5. Admin Features
   - Order management dashboard
   - User management
   - Sales analytics
   - Inventory management

6. Additional Features
   - Search suggestions
   - Product recommendations
   - Newsletter subscription
   - Social media integration

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.

## Support
For support, email support@freshdel.com or create an issue in the repository.
