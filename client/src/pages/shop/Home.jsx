import { useEffect, useState } from "react";

import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from "../../api/productApi";

import { getAllCategories } from "../../api/categoryApi";

import ProductCard from "../../components/product/ProductCard";
import CategorySidebar from "../../components/product/CategorySidebar";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.Products || []);
  };

  const loadCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.Categories || []);
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);

    if (!category) {
      return loadProducts();
    }

    const res = await getProductsByCategory(category._id);
    setProducts(res.Products || []);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      return loadProducts();
    }

    const res = await searchProducts(value);

    setProducts(res.Products || []);
  };

  const handleSort = (e) => {
    const value = e.target.value;

    setSortBy(value);

    const sortedProducts = [...products];

    if (value === "lowToHigh") {
      sortedProducts.sort(
        (a, b) => a.pPrice - b.pPrice
      );
    }

    if (value === "highToLow") {
      sortedProducts.sort(
        (a, b) => b.pPrice - a.pPrice
      );
    }

    if (value === "newest") {
      sortedProducts.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Latest Products
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Find the products you love
        </p>

      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="w-full sm:flex-1 border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Sort */}
        <select
          value={sortBy}
          onChange={handleSort}
          className="w-full sm:w-auto border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">
            Sort By
          </option>

          <option value="lowToHigh">
            Price: Low to High
          </option>

          <option value="highToLow">
            Price: High to Low
          </option>

          <option value="newest">
            Newest
          </option>
        </select>

      </div>

      {/* Categories */}
      <div className="mb-6 md:mb-0">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Products */}
      <div className="mt-6">

        {products.length === 0 ? (

          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-500">
              No products found.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Home;