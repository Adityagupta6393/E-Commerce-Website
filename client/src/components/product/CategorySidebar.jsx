function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Categories
      </h2>

      <button
        onClick={() => onSelectCategory(null)}
        className={`w-full text-left p-2 rounded mb-2 ${
          !selectedCategory
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        All Products
      </button>

      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => onSelectCategory(category)}
          className={`w-full text-left p-2 rounded mb-2 ${
            selectedCategory?._id === category._id
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {category.cName}
        </button>
      ))}
    </div>
  );
}

export default CategorySidebar;