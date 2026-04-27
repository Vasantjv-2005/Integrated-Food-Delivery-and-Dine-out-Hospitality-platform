# Foodelo Frontend

A React-based food delivery and dining app UI for Bangalore.

---

## Tech Stack

- **React** (Hooks + Context API)
- **No external UI libraries** — all styles are inline
- **Claude API** (used in the Smart page AI assistant)

---

## Project Structure

```
App
├── AppProvider         # Global state (page, restaurant, orders, mood, etc.)
├── CartProvider        # Cart state (items, total, coupon, open/close)
└── Main
    ├── Navbar
    ├── Pages
    │   ├── HomePage        # Hero, Mood Picker, Weather, Trending, Events preview
    │   ├── FoodPage        # Restaurant listing with filters & sorting
    │   ├── RestaurantPage  # Restaurant detail + menu (from backend) + reviews
    │   ├── DinePage        # Table reservation with slot picker
    │   ├── EventsPage      # Event listing with ticket booking modal
    │   ├── CheckoutPage    # Address, payment, order summary
    │   ├── TrackingPage    # Live order tracking with steps
    │   ├── OrdersPage      # Order history with reorder
    │   └── SmartPage       # AI assistant, points, badges, insights
    ├── CartDrawer          # Slide-in cart with coupon support
    └── Toasts              # Notification toasts
```

---

## Static Data (Frontend)

These are hardcoded in the frontend and do not need a backend:

| Data | Description |
|---|---|
| `RESTAURANTS` | 18 restaurants with name, cuisine, rating, tags, etc. |
| `EVENTS` | 12 events with venue, date, price, category |
| `MOODS` | 5 moods mapped to restaurant & event IDs |
| `BADGES` | 6 user badges (earned/locked) |

---

## Backend Integration

### Menu Items

When a user opens a restaurant, the app fetches its menu from your backend.

**Endpoint:**
```
GET /api/menu/:restaurantId
```

**Expected Response:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Butter Chicken",
      "emoji": "🍛",
      "cat": "Main Course",
      "price": 320,
      "veg": false,
      "popular": true,
      "desc": "Creamy tomato-based curry with tender chicken"
    }
  ]
}
```

**Where to update the URL:**  
In `AppProvider` → `viewRestaurant` function:
```js
const res = await fetch(`https://your-backend.com/api/menu/${r.id}`);
```

---

## Pages Overview

### Home
- Greeting based on time of day
- "I Don't Know What to Eat" random picker
- Mood-based restaurant & event suggestions
- Weather-based food suggestions
- Trending restaurants
- Food + Event combo suggestions
- Upcoming events preview

### Food
- Lists all 18 restaurants
- Filter by cuisine (Indian, Chinese, Italian, etc.)
- Filter by Veg only
- Sort by Rating, Delivery Time, Price
- Recently viewed restaurants

### Restaurant
- Restaurant info (rating, cuisine, delivery time, tags)
- Menu loaded from backend, grouped by category
- Popular items highlighted
- Add to cart
- Write & view reviews

### Dine
- Select restaurant, date, guest count
- Visual slot picker (available / unavailable)
- Booking confirmation with ID

### Events
- Filter by category (Music, Food, Comedy, Workshop, etc.)
- Ticket booking modal with quantity selector

### Checkout
- Delivery address form
- Payment method selector (UPI, Card, COD, Wallet)
- Order summary with taxes and delivery fee
- Coupon: `CRAVELY20` → 20% off

### Tracking
- 4-step order progress (Placed → Preparing → On the Way → Delivered)
- Auto-advances every few seconds
- Delivery partner info shown on step 3

### Orders
- Full order history
- Expand to see items
- Reorder button re-adds items to cart

### Smart
- AI food assistant powered by Claude
- Loyalty points + level progress bar
- Badges (earned / locked)
- Food personality stats
- Smart insights

---

## State Management

All state is managed via React Context — no Redux or external store.

| Context | Holds |
|---|---|
| `AppCtx` | Current page, active restaurant, menu items, orders, points, toasts, mood, weather |
| `CartCtx` | Cart items, quantities, open/close state, totals |

---

## Coupon Code

| Code | Discount |
|---|---|
| `CRAVELY20` | 20% off subtotal |

---

## Points System

| Action | Points Earned |
|---|---|
| Place an order | +50 pts |
| Submit a review | +10 pts |
| Every 200 pts | Level up |

# Foodelo - Food Delivery Frontend

A React-based frontend for the Integrated Food Delivery and Dine-out Hospitality Platform.

## Tech Stack
- React.js
- JSX

## Setup & Run
1. Install dependencies
   npm install

2. Start the app
   npm start

3. Open in browser
   http://localhost:3000