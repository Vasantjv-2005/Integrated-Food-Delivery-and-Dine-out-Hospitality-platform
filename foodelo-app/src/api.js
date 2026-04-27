// API Configuration for Food Delivery App
const API_BASE_URL = 'http://localhost:5001/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = 'API request failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      // If not JSON, return text or throw error
      const text = await response.text();
      if (text.startsWith('<!DOCTYPE')) {
        throw new Error('Server returned HTML instead of JSON - check API endpoint');
      }
      return text;
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
};

// Restaurant API
export const restaurantAPI = {
  getAll: () => apiRequest('/restaurants'),
  
  getNearby: (lat, lng) => apiRequest(`/restaurants/nearby?lat=${lat}&lng=${lng}`),
  
  getById: (id) => apiRequest(`/restaurants/${id}`),
  
  create: (restaurantData) => apiRequest('/restaurants', {
    method: 'POST',
    body: JSON.stringify(restaurantData),
  }),
  
  addMenuItem: (id, menuItem) => apiRequest(`/restaurants/${id}/menu`, {
    method: 'POST',
    body: JSON.stringify(menuItem),
  }),
};

// Order API
export const orderAPI = {
  getUserOrders: () => apiRequest('/orders'),
  
  placeOrder: (orderData) => apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  updateOrderStatus: (id, status) => apiRequest(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  
  getOrderById: (id) => apiRequest(`/orders/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: () => apiRequest('/cart'),
  addToCart: (item) => apiRequest('/cart', {
    method: 'POST',
    body: JSON.stringify(item),
  }),
  removeFromCart: (index) => apiRequest(`/cart/${index}`, {
    method: 'DELETE',
  }),
};

// Payment API
export const paymentAPI = {
  createOrder: (amount) => apiRequest('/payment/create-order', {
    method: 'POST',
    body: JSON.stringify({ amount }),
  }),
  
  verifyPayment: (paymentData) => apiRequest('/payment/verify', {
    method: 'POST',
    body: JSON.stringify(paymentData),
  }),
};

// Review API
export const reviewAPI = {
  addReview: (reviewData) => apiRequest('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  }),
  
  getRestaurantReviews: (restaurantId) => apiRequest(`/reviews/${restaurantId}`),
};

// User API
export const userAPI = {
  getProfile: () => apiRequest('/users/profile'),
  
  updateProfile: (userData) => apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
};

// Authentication helpers
export const authHelpers = {
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },
  
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  
  removeToken: () => {
    localStorage.removeItem('token');
  },
  
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

const api = {
  authAPI,
  restaurantAPI,
  orderAPI,
  cartAPI,
  paymentAPI,
  reviewAPI,
  userAPI,
};

export default api;
