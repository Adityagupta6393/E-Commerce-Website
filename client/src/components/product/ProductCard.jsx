import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const handleWishlist = (e) => {
    e.preventDefault();

    if (isWishlisted(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  const wishlisted = isWishlisted(product._id);

  return (
    <Link
      to={`/product/${product._id}`}
      className="group relative block bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
    >

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        aria-label={
          wishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
        className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <Heart
          size={20}
          className={
            wishlisted
              ? "text-red-500"
              : "text-gray-600"
          }
          fill={wishlisted ? "red" : "none"}
        />
      </button>

      {/* Product Image */}
      <div className="w-full aspect-square overflow-hidden bg-gray-100">

        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/products/${product.pImages[0]}`}
          alt={product.pName}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4">

        <h2 className="font-bold text-base sm:text-lg line-clamp-1">
          {product.pName}
        </h2>

        <p className="text-green-600 font-semibold text-base sm:text-lg mt-1 sm:mt-2">
          ₹{product.pPrice}
        </p>

        <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-1">
          {product.pCategory?.cName}
        </p>

      </div>

    </Link>
  );
}

export default ProductCard;