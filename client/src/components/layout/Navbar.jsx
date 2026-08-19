import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
  Heart,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        {/* Desktop + Mobile Header */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl sm:text-2xl font-bold text-blue-600"
          >
            ShopHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">

            <Link
              to="/"
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative hover:text-blue-600 transition"
            >
              <ShoppingCart size={21} />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2 hover:text-blue-600 transition"
                >
                  <Heart size={18} />
                  Wishlist
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-blue-600 transition"
                >
                  <User size={18} />
                  Profile
                </Link>

                <Link
                  to="/my-orders"
                  className="hover:text-blue-600 transition"
                >
                  My Orders
                </Link>

                {user.role === 1 && (
                  <Link
                    to="/admin"
                    className="text-green-600 font-semibold hover:text-green-700"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="hover:text-blue-600 transition"
                >
                  Register
                </Link>
              </>
            )}

          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-4">

            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="relative"
            >
              <ShoppingCart size={22} />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() =>
                setIsMenuOpen(!isMenuOpen)
              }
              className="p-1"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X size={25} />
              ) : (
                <Menu size={25} />
              )}
            </button>

          </div>

        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">

            <div className="flex flex-col gap-2">

              <Link
                to="/"
                onClick={closeMenu}
                className="px-3 py-3 rounded-lg hover:bg-gray-100"
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    to="/wishlist"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
                  >
                    <Heart size={18} />
                    Wishlist
                  </Link>

                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
                  >
                    <User size={18} />
                    Profile
                  </Link>

                  <Link
                    to="/my-orders"
                    onClick={closeMenu}
                    className="px-3 py-3 rounded-lg hover:bg-gray-100"
                  >
                    My Orders
                  </Link>

                  {user.role === 1 && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="px-3 py-3 rounded-lg text-green-600 font-semibold hover:bg-gray-100"
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-red-500 hover:bg-red-50 text-left"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="px-3 py-3 rounded-lg hover:bg-gray-100"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="px-3 py-3 rounded-lg hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;