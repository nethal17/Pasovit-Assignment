import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
            Clothing Store
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-gray-300 transition">
              Products
            </Link>

            {isAuthenticated && (
              <Link to="/orders" className="hover:text-gray-300 transition">
                My Orders
              </Link>
            )}

            <Link to="/cart" className="relative hover:text-gray-300 transition">
              <ShoppingCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-gray-800 hover:text-background">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
