import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Heart } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          ShopHub
        </Link>

        <div className="flex items-center gap-6">

          <Link to="/">
            Home
          </Link>

          <Link
            to="/cart"
            className="relative"
          >
            <ShoppingCart />

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
                className="flex items-center gap-2"
              >
                <Heart size={18} />
                Wishlist
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2"
              >
                <User size={18} />
                Profile
              </Link>

              <Link to="/my-orders">
                My Orders
              </Link>

              {user.role === 1 && (
                <Link
                  to="/admin"
                  className="text-green-600 font-semibold"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;