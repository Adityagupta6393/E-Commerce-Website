import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingCart, Package, Star } from "lucide-react";

import { getSingleProduct } from "../../api/productApi";
import { useCart } from "../../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await getSingleProduct(id);

      if (res.Product) {
        setProduct(res.Product);
        setImageIndex(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart");
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">

      {/* Product Section */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

        {/* Images */}
        <div>

          {/* Main Image */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">

            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/products/${product.pImages[imageIndex]}`}
              alt={product.pName}
              className="w-full h-72 sm:h-96 lg:h-[500px] object-cover"
            />

          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 sm:gap-4 mt-4 overflow-x-auto pb-2">

            {product.pImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setImageIndex(i)}
                className={`shrink-0 rounded-lg overflow-hidden border-2 ${
                  imageIndex === i
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/products/${img}`}
                  alt={`${product.pName} ${i + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
                />
              </button>
            ))}

          </div>

        </div>

        {/* Product Details */}
        <div className="flex flex-col">

          <p className="text-sm sm:text-base text-gray-500 mb-2">
            {product.pCategory?.cName}
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {product.pName}
          </h1>

          {/* Price */}
          <p className="text-2xl sm:text-3xl text-green-600 font-bold mt-5">
            ₹{product.pPrice}
          </p>

          {/* Description */}
          <div className="mt-6">

            <h2 className="font-bold text-lg mb-2">
              Description
            </h2>

            <p className="text-gray-700 leading-7">
              {product.pDescription}
            </p>

          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mt-6">

            <Package size={20} />

            <span>
              Stock:
            </span>

            <span className="font-bold">
              {product.pQuantity}
            </span>

          </div>

          {/* Add To Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.pQuantity <= 0}
            className="mt-8 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
          >
            <ShoppingCart size={20} />

            {product.pQuantity > 0
              ? "Add To Cart"
              : "Out of Stock"}
          </button>

        </div>

      </div>

      {/* Reviews */}
      <div className="mt-12 sm:mt-16 lg:mt-20">

        <div className="flex items-center gap-2 mb-5 sm:mb-6">

          <Star
            size={24}
            className="text-yellow-500"
            fill="currentColor"
          />

          <h2 className="text-2xl sm:text-3xl font-bold">
            Reviews
          </h2>

        </div>

        {product.pRatingsReviews?.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">
            No Reviews Yet
          </div>
        )}

        <div className="space-y-4">

          {product.pRatingsReviews?.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-sm p-4 sm:p-5 rounded-xl"
            >

              <h3 className="font-bold">
                {review.user?.name}
              </h3>

              <p className="text-yellow-500 mt-1">
                ⭐ {review.rating}/5
              </p>

              <p className="mt-2 text-gray-700 leading-6">
                {review.review}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;