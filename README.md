# MIYAHI - E-Commerce Web Application

A full-stack e-commerce platform built with **React (Vite)** frontend and **Node.js/Express** backend, featuring authentication, product management, shopping cart, and order processing.

## 📋 Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Design Patterns](#design-patterns)
- [Middleware](#middleware)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Features](#features)

---

## 🏗️ Architecture

### Backend Architecture (MVC + Repository Pattern)

```
Request → Routes → Middleware (Auth/CORS) → Controller → Service → Repository → Database
                                                ↓
                                          Response
```

**Layers:**
1. **Routes** - Define API endpoints and HTTP methods
2. **Middleware** - Authentication, CORS, error handling
3. **Controllers** - Handle requests, validate input, call services
4. **Services** - Business logic, data transformation
5. **Repositories** - Database abstraction, query execution
6. **Models** - MongoDB schemas (User, Product, Order)

### Frontend Architecture (React Context + Custom Hooks)

```
UI Components → Custom Hooks → Context API (State Management)
                                    ↓
                              API Service (axios)
                                    ↓
                              Backend API
```

**Layers:**
1. **Pages** - Route components (Home, Products, Login, etc.)
2. **Components** - Reusable UI components (ProductCard, Navbar, etc.)
3. **Hooks** - Custom React hooks (useAuth, useCart, useProducts, useOrders)
4. **Context** - Global state (AuthContext, CartContext)
5. **Services** - API client configuration and requests
6. **Assets** - Styles and static files

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Middleware:** CORS, Express built-in parsers
- **Utilities:** dotenv (environment variables)

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Styling:** CSS3

---

## 🎯 Design Patterns

### 1. **Repository Pattern** (Backend)
**Purpose:** Abstract database operations and centralize queries.

**Files:**
- `backend/src/repositories/base.repo.js` - Base CRUD operations
- `backend/src/repositories/user.repo.js` - User-specific queries
- `backend/src/repositories/product.repo.js` - Product queries
- `backend/src/repositories/order.repo.js` - Order queries

**Benefits:**
- Decouples services from database logic
- Easy to mock for testing
- Centralized query management
- Switch databases without changing service layer

**Example:**
```javascript
// Service calls repository
const user = await userRepository.findById(userId);

// Repository executes query
async findById(id) {
  return User.findById(id);
}
```

### 2. **Service Layer Pattern** (Backend)
**Purpose:** Encapsulate business logic separate from controllers.

**Files:**
- `backend/src/services/auth.service.js` - Authentication logic
- `backend/src/services/product.service.js` - Product business rules
- `backend/src/services/order.service.js` - Order processing
- `backend/src/services/user.service.js` - User management

**Benefits:**
- Reusable business logic across multiple controllers
- Easier to test independently
- Single responsibility principle

### 3. **Context API Pattern** (Frontend)
**Purpose:** Manage global state without prop drilling.

**Files:**
- `frontend/my-app/src/context/AuthContext.jsx` - User authentication state
- `frontend/my-app/src/context/CartContext.jsx` - Shopping cart state

**Benefits:**
- Avoid prop drilling
- Centralized state management
- Easy access from any component

**Example:**
```javascript
const { user, login, logout } = useAuth();
const { cart, addToCart, removeFromCart } = useCart();
```

### 4. **Custom Hooks Pattern** (Frontend)
**Purpose:** Encapsulate stateful logic and side effects.

**Files:**
- `frontend/my-app/src/hooks/useAuth.js` - Authentication logic
- `frontend/my-app/src/hooks/useCart.js` - Cart management
- `frontend/my-app/src/hooks/useProducts.js` - Product fetching
- `frontend/my-app/src/hooks/useOrders.js` - Order operations

**Benefits:**
- Reuse logic across components
- Clean component code
- Easier testing and maintenance

**Example:**
```javascript
const { products, loading, error } = useProducts();
```

### 5. **Protected Route Pattern** (Frontend)
**Purpose:** Restrict access to authenticated users only.

**File:** `frontend/my-app/src/components/ProtectedRoute.jsx`

**Implementation:**
```javascript
<ProtectedRoute>
  <OrderPage />
</ProtectedRoute>
```

### 6. **MVC Pattern** (Backend)
**Purpose:** Separate concerns into Model, View (API response), and Controller.

**Files:**
- **Models:** `backend/src/models/User.js`, `Product.js`, `Order.js`
- **Views:** JSON responses from API
- **Controllers:** `backend/src/controllers/auth.controller.js`, etc.

---

## 🔧 Middleware

### Backend Middleware

#### 1. **CORS Middleware**
**File:** `server.js`

**Purpose:** Allow cross-origin requests from frontend to backend.

```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
```

**Benefits:**
- Enable frontend-backend communication
- Secure cross-origin requests
- Configurable per environment

#### 2. **JWT Authentication Middleware**
**File:** `backend/src/middleware/auth.middleware.js`

**Purpose:** Verify JWT tokens on protected routes.

```javascript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

**Usage in Routes:**
```javascript
router.get('/profile', authMiddleware, getProfile);
router.post('/orders', authMiddleware, createOrder);
```

**Benefits:**
- Protect sensitive endpoints
- Extract user info for services
- Automatic token validation

#### 3. **Express Built-in Middleware**
**File:** `server.js`

```javascript
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data
```

#### 4. **Error Handling Middleware**
**Purpose:** Centralized error responses.

```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});
```

### Frontend Middleware (Axios Interceptors)

**File:** `frontend/my-app/src/services/api.js`

#### 1. **Request Interceptor**
**Purpose:** Attach JWT token to every request.

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### 2. **Response Interceptor**
**Purpose:** Handle 401 errors and transform responses.

```javascript
api.interceptors.response.use(
  (response) => {
    // Extract data from {success: true, data: ...}
    return response.data?.data || response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**Benefits:**
- Automatic token injection
- Unified error handling
- Auto-logout on expiration

---

## 📁 Project Structure

```
miyahi/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   ├── environment.js     # Environment variables
│   │   │   └── logger.js          # Logging utility
│   │   ├── controllers/           # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── order.controller.js
│   │   │   └── user.controller.js
│   │   ├── services/              # Business logic
│   │   │   ├── auth.service.js
│   │   │   ├── product.service.js
│   │   │   ├── order.service.js
│   │   │   └── user.service.js
│   │   ├── repositories/          # Database abstraction
│   │   │   ├── base.repo.js
│   │   │   ├── user.repo.js
│   │   │   └── product.repo.js
│   │   ├── models/                # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── middleware/            # Express middleware
│   │   │   └── auth.middleware.js
│   │   ├── routes/                # API endpoints
│   │   │   ├── auth.routes.js
│   │   │   ├── product.routes.js
│   │   │   └── order.routes.js
│   │   └── utils/
│   │       └── jwt.js             # JWT utilities
│   ├── package.json
│   └── server.js                  # Entry point
│
├── frontend/my-app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Layout/
│   │   │       ├── Navbar.jsx
│   │   │       ├── Footer.jsx
│   │   │       └── Layout.jsx
│   │   ├── context/               # Global state
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── hooks/                 # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   ├── useProducts.js
│   │   │   └── useOrders.js
│   │   ├── pages/                 # Route components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Order.jsx
│   │   │   └── Contact.jsx
│   │   ├── services/
│   │   │   └── api.js             # Axios client & services
│   │   ├── assets/
│   │   │   └── styles/
│   │   │       └── main.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🚀 Setup & Installation

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=3000
MONGODB_URI=mongodb://localhost:27017/miyahi
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
EOF

# Start backend
node server.js
# Backend runs on http://localhost:3000
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend/my-app

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_BASE=http://localhost:3000/api
EOF

# Start frontend dev server
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login user |
| GET | `/api/auth/profile` | ✅ | Get current user |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | ❌ | Get all products |
| GET | `/api/products/:id` | ❌ | Get product by ID |
| POST | `/api/products` | ✅ | Create product (admin) |
| PUT | `/api/products/:id` | ✅ | Update product (admin) |
| DELETE | `/api/products/:id` | ✅ | Delete product (admin) |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | ✅ | Create order |
| GET | `/api/orders/my-orders` | ✅ | Get user's orders |
| GET | `/api/orders/:id` | ✅ | Get order by ID |
| PATCH | `/api/orders/:id/status` | ✅ | Update order status |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users` | ✅ | Get all users (admin) |
| GET | `/api/users/:id` | ✅ | Get user by ID |
| PUT | `/api/users/:id` | ✅ | Update user |
| DELETE | `/api/users/:id` | ✅ | Delete user (admin) |

---

## ✨ Features

### Authentication
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Token stored in localStorage
- ✅ Auto-logout on token expiration
- ✅ Protected routes (ProtectedRoute component)

### Products
- ✅ Browse all products
- ✅ Filter by category
- ✅ Product details page
- ✅ Search functionality

### Shopping Cart
- ✅ Add/remove items
- ✅ Update quantities
- ✅ Persistent cart (localStorage)
- ✅ Cart summary

### Orders
- ✅ Checkout process
- ✅ Shipping information form
- ✅ Order confirmation
- ✅ View order history
- ✅ Track order status

### User Interface
- ✅ Responsive navbar
- ✅ User profile menu
- ✅ Footer with links
- ✅ Clean, modern design

---

## 📝 Environment Variables

### Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/miyahi
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_BASE=http://localhost:3000/api
```

---

## 🔐 Security Features

- ✅ JWT authentication on protected routes
- ✅ CORS configured for frontend domain
- ✅ Password hashing (implement in auth.service.js)
- ✅ Token validation on every request
- ✅ Auto-redirect on 401 (unauthorized)
- ✅ Secure token storage (localStorage)

---

## 📚 Code Examples

### Using useAuth Hook
```javascript
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using useProducts Hook
```javascript
import { useProducts } from '../hooks/useProducts';

export default function ProductsList() {
  const { products, loading } = useProducts();
  
  if (loading) return <p>Loading...</p>;
  return products.map(p => <ProductCard key={p._id} product={p} />);
}
```

### API Service Example
```javascript
import { productService } from '../services/api';

// Fetch products
const response = await productService.getAll({ category: 'electronics' });

// Create order
const order = await orderService.create({
  items: cart,
  shippingAddress: {...}
});
```

---

## 🐛 Troubleshooting

**Backend won't start:**
- Ensure MongoDB is running: `mongod`
- Check port 3000 is not in use
- Verify .env file exists with correct values

**Frontend can't connect to backend:**
- Ensure backend is running on http://localhost:3000
- Check VITE_API_BASE in .env
- Clear browser cache and restart dev server

**401 Unauthorized errors:**
- Ensure token is saved in localStorage after login
- Check JWT_SECRET matches between login and protected routes
- Verify auth middleware is applied to protected routes

---

## 📞 Support

For issues or questions, check:
1. Backend console for server errors
2. Browser DevTools (F12) for network/console errors
3. MongoDB connection status
4. Environment variables in .env files

---

**Last Updated:** November 30, 2025