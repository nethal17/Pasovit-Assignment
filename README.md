# Clothing Brand E-Commerce Web App

A full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce application for a clothing brand with modern UI using Tailwind CSS and shadcn/ui components.

## Features

### Backend
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Product Management**: Browse clothing items with advanced filtering
- **Search & Filters**: Search by name/description, filter by category, size, and price range
- **Pagination**: Efficient product listing with pagination support
- **Shopping Cart**: Guest and authenticated user cart support
- **Orders**: Complete checkout system with order history
- **Email Notifications**: Order confirmation emails via Nodemailer

### Frontend
- **Modern UI**: Built with React, Tailwind CSS, and shadcn/ui components
- **Responsive Design**: Mobile-friendly interface
- **Product Browsing**: Grid layout with filters and search
- **Shopping Cart**: Real-time cart updates
- **User Account**: Registration, login, and order history
- **Checkout Flow**: Multi-step checkout with shipping address

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Nodemailer
- express-validator

### Frontend
- React 18
- React Router v6
- Axios
- Tailwind CSS
- shadcn/ui components
- Radix UI primitives
- Lucide React icons

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
cd Pasovit-Assignment
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5001
MONGODB_URI=mongodb:your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=Clothing Store <noreply@clothingstore.com>
```

**Note for Email Setup:**
- For Gmail, you need to generate an App Password (not your regular password)
- Go to Google Account > Security > 2-Step Verification > App passwords
- Or use any other SMTP service (SendGrid, Mailgun, etc.)

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Database Seeding

Seed the database with demo products (25 clothing items):
```bash
cd backend
npm run seed
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with filters & pagination)
  - Query params: `search`, `category`, `size`, `minPrice`, `maxPrice`, `page`, `limit`
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders (Protected Routes)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID

## Project Structure

```
e-commerce/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── email.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── button.jsx
    │   │   │   ├── card.jsx
    │   │   │   ├── input.jsx
    │   │   │   ├── label.jsx
    │   │   │   ├── select.jsx
    │   │   │   ├── toast.jsx
    │   │   │   └── use-toast.js
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── Products.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   └── Orders.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── lib/
    │   │   └── utils.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## Features Implementation

### User Authentication
- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire in 7 days (configurable)
- Protected routes require valid JWT token

### Product Filters
All filters work together:
- **Search**: Text search in product name and description
- **Category**: Filter by Men, Women, or Kids
- **Size**: Filter by S, M, L, or XL
- **Price Range**: Filter by min and max price
- **Pagination**: Default 10 items per page

### Shopping Cart
- Guest users: Cart stored by session ID
- Authenticated users: Cart stored by user ID
- Cart persists across sessions
- Add to cart even when not logged in

### Order & Email
- Orders saved with complete item details
- Nodemailer sends HTML email confirmation
- Email includes: Order ID, items, quantities, sizes, total price, shipping address

## Demo Products

The seed script includes 25 products across categories:
- **Men**: T-shirts, jeans, jackets, hoodies, etc.
- **Women**: Dresses, blouses, skirts, leggings, etc.
- **Kids**: Graphic tees, shorts, hoodies, jackets, etc.

All products have:
- Name, description, price
- Category (Men/Women/Kids)
- Available sizes
- Image URLs (Unsplash)
- Stock information

## Development Notes

### Tailwind CSS & shadcn/ui
- Tailwind configured with custom design system
- shadcn/ui components for consistent UI
- Responsive design with mobile-first approach

### State Management
- React Context API for global state (Auth & Cart)
- Local state for component-specific data

### API Integration
- Axios for HTTP requests
- Centralized API service layer
- Error handling with toast notifications

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or update `MONGODB_URI` with Atlas connection string
- Check firewall settings

### Email Not Sending
- Verify SMTP credentials in `.env`
- For Gmail, use App Password, not regular password
- Check spam folder

### Port Already in Use
- Change `PORT` in backend `.env`
- Update proxy in frontend `package.json`

## License

MIT

## Author

Built with ❤️ using MERN Stack
