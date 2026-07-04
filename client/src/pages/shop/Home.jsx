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

    let sortedProducts = [...products];

    if (value === "lowToHigh") {
      sortedProducts.sort((a, b) => a.pPrice - b.pPrice);
    }

    if (value === "highToLow") {
      sortedProducts.sort((a, b) => b.pPrice - a.pPrice);
    }

    if (value === "newest") {
      sortedProducts.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Latest Products
        </h1>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
            className="border p-2 rounded-lg"
          />

          <select
            value={sortBy}
            onChange={handleSort}
            className="border p-2 rounded-lg"
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

      </div>

      <div className="grid md:grid-cols-4 gap-8">

        <div>
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        <div className="md:col-span-3">

          <div className="grid md:grid-cols-3 gap-6">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;