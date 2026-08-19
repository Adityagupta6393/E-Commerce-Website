function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Categories
      </h2>

      {/* Mobile: horizontal scroll */}
      <div className="flex md:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">

        <button
          onClick={() => onSelectCategory(null)}
          className={`
            shrink-0
            px-4 py-2
            rounded-lg
            text-sm
            whitespace-nowrap
            transition
            ${
              !selectedCategory
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => onSelectCategory(category)}
            className={`
              shrink-0
              px-4 py-2
              rounded-lg
              text-sm
              whitespace-nowrap
              transition
              ${
                selectedCategory?._id === category._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {category.cName}
          </button>
        ))}

      </div>

      {/* Desktop: vertical sidebar */}
      <div className="hidden md:block">

        <button
          onClick={() => onSelectCategory(null)}
          className={`
            w-full
            text-left
            p-2.5
            rounded-lg
            mb-2
            transition
            ${
              !selectedCategory
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }
          `}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => onSelectCategory(category)}
            className={`
              w-full
              text-left
              p-2.5
              rounded-lg
              mb-2
              transition
              ${
                selectedCategory?._id === category._id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {category.cName}
          </button>
        ))}

      </div>

    </div>
  );
}

export default CategorySidebar;