import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [sessionId, setSessionId] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    // Generate or get session ID for guest users
    let sid = localStorage.getItem('sessionId');
    if (!sid) {
      sid = 'guest_' + Math.random().toString(36).substr(2, 9) + Date.now();
      localStorage.setItem('sessionId', sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchCart();
    }
  }, [sessionId, token]);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart(sessionId, token);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, size, quantity = 1) => {
    try {
      const response = await cartAPI.addItem(
        { productId, size, quantity },
        sessionId,
        token
      );
      setCart(response.data);
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await cartAPI.updateItem(
        itemId,
        { quantity },
        sessionId,
        token
      );
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await cartAPI.removeItem(itemId, sessionId, token);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await cartAPI.clearCart(sessionId, token);
      setCart(response.data);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
