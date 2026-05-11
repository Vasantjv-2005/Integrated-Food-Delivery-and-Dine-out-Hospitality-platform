# 🍽️ Integrated Food Delivery Platform

A full-stack food delivery application with real-time restaurant management, order tracking, and user reviews. This project connects a React frontend with a Node.js backend, providing a complete food delivery experience with MongoDB database integration.

## 🎯 Project Overview

This platform allows users to:
- Browse restaurants and menus
- Place real-time orders with tracking
- Add restaurants and menu items dynamically
- Submit reviews and ratings
- Manage shopping cart
- Track order status in real-time

## 🚀 Features

### 🎨 Frontend Features (React)
- **Restaurant Browsing** - Dynamic restaurant listings with filtering
- **Menu Management** - Add restaurants and menu items in real-time
- **Shopping Cart** - Add/remove items with quantity management
- **Order Tracking** - Real-time order status updates
- **User Authentication** - Secure login/registration system
- **Review System** - Submit and view restaurant reviews
- **Responsive Design** - Mobile-friendly interface
- **Real-time Updates** - Live data synchronization

### 🔧 Backend Features (Node.js)
- **User Authentication** - JWT-based secure authentication
- **Restaurant Management** - CRUD operations for restaurants
- **Menu Management** - Dynamic menu item management
- **Order Processing** - Complete order lifecycle
- **Cart Management** - Persistent cart functionality
- **Payment Integration** - Razorpay payment gateway
- **Real-time Updates** - Socket.io for live tracking
- **Review System** - User reviews and ratings
- **Geo-location Search** - Location-based restaurant discovery

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **React Context** - State management
- **Fetch API** - HTTP requests
- **CSS-in-JS** - Styling
- **ESLint** - Code quality

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Socket.io** - Real-time communication
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Razorpay** - Payment processing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Food-delivery-web/
├── Food-delivery-backend/     # Backend API
│   ├── config/                # Configuration files
│   │   ├── db.js              # Database connection
│   │   └── razorpay.js        # Payment setup
│   ├── controllers/           # Business logic handlers
│   │   ├── authController.js   # Authentication
│   │   ├── restaurantController.js # Restaurant operations
│   │   ├── orderController.js    # Order management
│   │   ├── cartController.js     # Cart operations
│   │   └── reviewController.js   # Review management
│   ├── middleware/            # Custom middleware
│   │   └── authMiddleware.js    # JWT authentication
│   ├── models/               # Database schemas
│   │   ├── User.js           # User model
│   │   ├── Restaurant.js     # Restaurant model
│   │   ├── Order.js          # Order model
│   │   ├── Cart.js           # Cart model
│   │   └── Review.js         # Review model
│   ├── routes/               # API route definitions
│   │   ├── authRoutes.js     # Authentication
│   │   ├── restaurantRoutes.js # Restaurant operations
│   │   ├── orderRoutes.js    # Order management
│   │   ├── cartRoutes.js     # Cart operations
│   │   ├── paymentRoutes.js  # Payment processing
│   │   └── reviewRoutes.js   # Review management
│   ├── utils/                # Utility functions
│   │   └── generateToken.js  # JWT token generation
│   ├── .env                  # Environment variables
│   ├── package.json          # Dependencies
│   └── server.js             # Main application entry point
└── foodelo-app/               # Frontend React App
    ├── public/               # Static files
    ├── src/                  # React source code
    │   ├── api.js           # API integration
    │   ├── Foodelo2.jsx     # Main application component
    │   └── App.js           # App entry point
    └── package.json          # Frontend dependencies
```

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String,
  password: String, // Encrypted
  role: String,        // user/admin
  cart: [{
    name: String,
    price: Number,
    qty: Number
  }]
}
```

### Restaurant Model
```javascript
{
  name: String,
  cuisine: String,
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  rating: Number,
  isOpen: Boolean,
  menu: [{
    name: String,
    price: Number,
    veg: Boolean,
    description: String
  }]
}
```

### Order Model
```javascript
{
  user: ObjectId,
  items: [{
    name: String,
    price: Number,
    qty: Number
  }],
  totalPrice: Number,
  address: String,
  status: String, // Placed, Preparing, Out for Delivery, Delivered
}
```

### Review Model
```javascript
{
  user: ObjectId,
  restaurant: ObjectId,
  rating: Number,
  comment: String
}
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Vasantjv-2005/Integrated-Food-Delivery-and-Dine-out-Hospitality-platform.git
cd Food-delivery-web
```

### 2. Backend Setup
```bash
cd Food-delivery-backend
npm install
```

### 3. Environment Variables
Create `.env` file in backend directory:
```env
PORT=5001
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-jwt-secret
CLOUD_NAME=your-cloudinary-name
CLOUD_API_KEY=your-cloudinary-api-key
```

### 4. Frontend Setup
```bash
cd ../foodelo-app
npm install
```

### 5. Start the Applications

**Backend:**
```bash
cd Food-delivery-backend
node server.js
```
Server runs on: `http://localhost:5001`

**Frontend:**
```bash
cd foodelo-app
npm start
```
App runs on: `http://localhost:3001`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/nearby?lat=X&lng=Y` - Get nearby restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `POST /api/restaurants` - Add new restaurant (authenticated)
- `POST /api/restaurants/:id/menu` - Add menu item (authenticated)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Place new order
- `PUT /api/orders/:id` - Update order status

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:index` - Remove item from cart

### Reviews
- `POST /api/reviews` - Submit review
- `GET /api/reviews/:restaurantId` - Get restaurant reviews

## 🌐 How It Works

### Real-time Data Flow
1. **User Action** → Frontend React Component
2. **API Call** → Backend Express Route
3. **Database** → MongoDB Operations
4. **Response** → Frontend State Update
5. **UI Update** → Real-time Display

### Adding Restaurants
1. **Login** to your account
2. **Click "➕ Add Restaurant"** in navbar
3. **Fill restaurant details** and menu items
4. **Submit** → Saved to MongoDB
5. **Appears immediately** in restaurant listings

### Placing Orders
1. **Add items** to cart from restaurant menus
2. **Proceed to Checkout**
3. **Fill delivery details**
4. **Place Order** → Saved to MongoDB
5. **Track order** with real-time status updates

### Submitting Reviews
1. **Visit restaurant** page
2. **Rate restaurant** (1-5 stars)
3. **Write review** text
4. **Submit** → Saved to MongoDB
5. **Appears immediately** in reviews section

## 🔌 Real-time Features

### Socket.io Integration
- **Order Status Updates**: Live tracking of order progress
- **Restaurant Updates**: Real-time menu item additions
- **Review Notifications**: Instant review display

### WebSocket Events
- `joinOrder(orderId)` - Track specific order
- `orderUpdated` - Receive status changes

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs encryption
- **CORS Configuration**: Cross-origin setup
- **Protected Routes**: Authentication middleware
- **Input Validation**: Request data validation

## 🌍 Geo-location Features

### Location-Based Search
- **Nearby Restaurants**: Find restaurants within radius
- **Coordinate Storage**: Precise location tracking
- **MongoDB Geospatial**: Optimized location queries
- **2dsphere Index**: Fast location searches

## 💳 Payment Integration

### Razorpay Integration
- **Order Creation**: Generate payment orders
- **Payment Verification**: Secure transaction processing
- **Real-time Updates**: Payment status tracking

## 📱 MongoDB Atlas Setup

### Collections
- **users**: User accounts and profiles
- **restaurants**: Restaurant data with menus
- **orders**: Order history and tracking
- **carts**: Shopping cart data
- **reviews**: User reviews and ratings

### Data Relationships
- Users → Orders (one-to-many)
- Users → Carts (one-to-one)
- Users → Reviews (one-to-many)
- Restaurants → Reviews (one-to-many)
- Restaurants → Menu Items (one-to-many)

## 🚀 Deployment

### Development
- **Backend**: `node server.js`
- **Frontend**: `npm start`
- **Database**: MongoDB Atlas

### Production
1. **Environment Variables**: Set production values
2. **Build Frontend**: `npm run build`
3. **Deploy Backend**: Hosting platform
4. **Database**: MongoDB Atlas
5. **Domain**: Configure DNS

## 🧪 Testing

### API Testing
```bash
# Test restaurants
curl http://localhost:5001/api/restaurants

# Test authentication
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Frontend Testing
- Open browser to `http://localhost:3001`
- Test registration/login flow
- Test restaurant and menu addition
- Test order placement
- Test review submission

## 📊 Performance

### MongoDB Optimizations
- **Geospatial Index**: Fast location queries
- **Compound Indexes**: Optimized data retrieval
- **Connection Pooling**: Efficient database connections

### Frontend Optimizations
- **Component Caching**: React memoization
- **API Caching**: Response caching
- **Lazy Loading**: Component lazy loading

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch
3. **Make** changes
4. **Test** thoroughly
5. **Submit** pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For technical support or questions:
- Check the documentation
- Review the code comments
- Create an issue on GitHub

---

**🎉 Happy Coding! Enjoy building your food delivery platform!**
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `GET /api/orders/:id` - Get order by ID

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:foodId` - Remove item from cart

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

### Reviews
- `POST /api/reviews` - Add review
- `GET /api/reviews/:restaurantId` - Get restaurant reviews

## 🔌 Real-time Features

The application uses Socket.io for real-time order tracking:

- **Order Status Updates**: Clients receive live updates when order status changes
- **Order Rooms**: Users join specific order rooms to track their orders
- **Connection Management**: Handles user connections and disconnections

### Socket Events
- `joinOrder(orderId)` - Join an order room for tracking
- `orderStatusUpdate` - Receive order status updates

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **CORS Configuration**: Cross-origin resource sharing setup
- **Environment Variables**: Sensitive data stored in environment variables

## 🌍 Geo-location Features

The backend supports location-based restaurant search using MongoDB's geospatial queries:

- **2dsphere Index**: Optimized for geo-location searches
- **Nearby Search**: Find restaurants within specified radius
- **Coordinate Storage**: Stores longitude and latitude for precise location tracking

## 💳 Payment Integration

Integrated with Razorpay for secure payment processing:

- **Order Creation**: Generate Razorpay orders
- **Payment Verification**: Verify payment completion
- **Secure Transactions**: End-to-end encrypted payment flow

## 🚀 Deployment

For production deployment:

1. Set production environment variables
2. Configure MongoDB Atlas for database
3. Set up Cloudinary for image storage
4. Configure Razorpay for payments
5. Deploy to your preferred hosting platform (Heroku, AWS, etc.)

## 📝 Development Notes

- The server runs on port 5000 by default
- CORS is configured for `http://localhost:3000` (frontend)
- Socket.io CORS is also configured for the frontend URL
- Database connection is established automatically on server start
- All timestamps are automatically added using Mongoose timestamps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For any queries or issues, please reach out to the development team.
