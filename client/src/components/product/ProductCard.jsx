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

  return (
    <Link
      to={`/product/${product._id}`}
      className="relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
      >
        <Heart
          fill={
            isWishlisted(product._id)
              ? "red"
              : "none"
          }
        />
      </button>

      <img
        src={`http://localhost:5000/uploads/products/${product.pImages[0]}`}
        alt={product.pName}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">
        <h2 className="font-bold text-lg">
          {product.pName}
        </h2>

        <p className="text-green-600 font-semibold mt-2">
          ₹{product.pPrice}
        </p>

        <p className="text-gray-500 text-sm mt-2">
          {product.pCategory?.cName}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;