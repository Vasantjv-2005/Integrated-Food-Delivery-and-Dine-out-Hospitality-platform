# Food Delivery Backend API

A comprehensive backend API for a food delivery application built with Node.js, Express, and MongoDB. This API provides real-time order tracking, user authentication, restaurant management, and payment processing capabilities.

## 🚀 Features

- **User Authentication** - Secure registration and login with JWT
- **Restaurant Management** - Add, update, and manage restaurants with geo-location support
- **Menu Management** - Dynamic menu items with pricing and dietary information
- **Order Processing** - Complete order lifecycle with real-time status updates
- **Cart Management** - Add/remove items from user cart
- **Payment Integration** - Razorpay payment gateway integration
- **Real-time Updates** - Socket.io for live order tracking
- **Review System** - User reviews and ratings for restaurants
- **Geo-location Search** - Find restaurants by location using MongoDB geospatial queries

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Socket.io** - Real-time communication
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Razorpay** - Payment processing
- **Cloudinary** - Image storage
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Food-delivery-backend/
├── config/                 # Configuration files
│   ├── db.js              # Database connection
│   ├── cloudinary.js      # Cloudinary setup
│   └── razorpay.js        # Razorpay configuration
├── controllers/           # Business logic handlers
├── middleware/            # Custom middleware functions
├── models/               # Database schemas
│   ├── User.js           # User model with cart
│   ├── Restaurant.js     # Restaurant model with menu
│   ├── Order.js          # Order model
│   ├── Cart.js           # Cart model
│   └── Review.js         # Review model
├── routes/               # API route definitions
│   ├── authRoutes.js     # Authentication routes
│   ├── userRoutes.js     # User management
│   ├── restaurantRoutes.js # Restaurant operations
│   ├── orderRoutes.js    # Order management
│   ├── cartRoutes.js     # Cart operations
│   ├── paymentRoutes.js  # Payment processing
│   └── reviewRoutes.js   # Review management
├── utils/                # Utility functions
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── server.js             # Main application entry point
```

## 🗄️ Database Schema

### User Model
- **name**: User's full name
- **email**: Unique email address
- **password**: Encrypted password
- **role**: User role (user/admin)
- **cart**: Array of cart items with food details

### Restaurant Model
- **name**: Restaurant name
- **cuisine**: Type of cuisine
- **location**: Geo-coordinates for location-based search
- **rating**: Average rating (default: 4)
- **isOpen**: Restaurant status
- **menu**: Array of menu items with pricing and dietary info

### Order Model
- **user**: Reference to user
- **items**: Order items with quantities
- **totalPrice**: Order total
- **address**: Delivery address
- **status**: Order status (Placed, Preparing, Out for Delivery, Delivered)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Food-delivery-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/nearby` - Get nearby restaurants (geo-location)
- `GET /api/restaurants/:id` - Get restaurant by ID
- `POST /api/restaurants` - Add new restaurant (admin)
- `PUT /api/restaurants/:id` - Update restaurant (admin)
- `DELETE /api/restaurants/:id` - Delete restaurant (admin)

### Orders
- `GET /api/orders` - Get user orders
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
