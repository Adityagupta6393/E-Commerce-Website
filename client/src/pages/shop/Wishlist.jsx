import { useEffect, useState } from "react";

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
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        My Wishlist
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
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