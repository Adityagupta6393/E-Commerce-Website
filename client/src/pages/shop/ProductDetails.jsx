import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

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
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="grid md:grid-cols-2 gap-10">

        {/* Images */}

        <div>

          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/products/${product.pImages[imageIndex]}`}
            className="w-full h-[500px] object-cover rounded-xl"
          />

          <div className="flex gap-4 mt-4">

            {product.pImages.map((img, i) => (
              <img
                key={i}
                src={`${import.meta.env.VITE_API_URL}/uploads/products/${img}`}
                onClick={() => setImageIndex(i)}
                className={`w-24 h-24 object-cover rounded cursor-pointer border-4 ${
                  imageIndex === i
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              />
            ))}

          </div>

        </div>

        {/* Details */}

        <div>

          <h1 className="text-4xl font-bold">
            {product.pName}
          </h1>

          <p className="text-gray-500 mt-3">
            {product.pCategory?.cName}
          </p>

          <p className="text-3xl text-green-600 font-bold mt-5">
            ₹{product.pPrice}
          </p>

          <p className="mt-8 text-gray-700 leading-8">
            {product.pDescription}
          </p>

          <p className="mt-6">
            Stock:
            <span className="font-bold ml-2">
              {product.pQuantity}
            </span>
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl"
          >
            Add To Cart
          </button>

        </div>

      </div>

      {/* Reviews */}

      <div className="mt-20">

        <h2 className="text-3xl font-bold mb-6">
          Reviews
        </h2>

        {product.pRatingsReviews?.length === 0 && (
          <p>No Reviews Yet</p>
        )}

        {product.pRatingsReviews?.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow p-5 rounded-xl mb-4"
          >
            <h3 className="font-bold">
              {review.user?.name}
            </h3>

            <p className="text-yellow-500">
              ⭐ {review.rating}/5
            </p>

            <p className="mt-2">
              {review.review}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ProductDetails;