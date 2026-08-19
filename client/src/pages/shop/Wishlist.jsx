import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";
import { getWishProducts } from "../../api/productApi";

import ProductCard from "../../components/product/ProductCard";

function Wishlist() {
  const { wishlist } = useWishlist();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadWishlistProducts();
  }, [wishlist]);

  const loadWishlistProducts = async () => {
    if (wishlist.length === 0) {
      setProducts([]);
      return;
    }

    const res = await getWishProducts(wishlist);

    setProducts(res.Products || []);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">

      {/* Header */}
      <div className="mb-6 sm:mb-8">

        <div className="flex items-center gap-2">

          <Heart
            size={28}
            className="text-red-500"
            fill="currentColor"
          />

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            My Wishlist
          </h1>

        </div>

        <p className="text-gray-500 mt-2">
          Products you've saved for later
        </p>

      </div>

      {/* Empty Wishlist */}
      {products.length === 0 ? (
        <div className="min-h-[40vh] flex items-center justify-center">

          <div className="text-center">

            <div className="flex justify-center mb-4">

              <div className="p-4 bg-red-50 text-red-500 rounded-full">
                <Heart
                  size={32}
                  fill="currentColor"
                />
              </div>

            </div>

            <h2 className="text-xl sm:text-2xl font-bold">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mt-2">
              Save products you love and find them here later.
            </p>

          </div>

        </div>
      ) : (
        /* Products */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;