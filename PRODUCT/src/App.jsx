import { useState, useEffect } from "react";
import product from "./db/data.json";

const App = () => {
  const [data, setData] = useState(product.data.items);
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    try {
      const categories = [...new Set(product.data.items.map((item) => item.category))];
      setSubcategories(categories);
    } catch (error) {
      console.error("Error loading categories:", error);
      setSubcategories([]);
    }
  }, []);

  const handlePriceInput = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
      setCustomPrice(value);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = !search || 
      item.name.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
      item.category === selectedCategory;
    
    const matchesPrice = !customPrice || 
      Math.abs(parseFloat(item.price) - parseFloat(customPrice)) < 0.01;
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (priceSort === "low") return parseFloat(a.price) - parseFloat(b.price);
    if (priceSort === "high") return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Product Catalog</h1>
          <p className="mt-2 text-blue-100">Find your perfect product</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
            </div>

            {/* Price Sort Dropdown */}
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Sort by Price</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>

            {/* Price Input */}
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Filter by exact price"
                value={customPrice}
                onChange={handlePriceInput}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span className="absolute right-3 top-3 text-gray-400">$</span>
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All Categories</option>
              {subcategories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Found {filteredData.length} products
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                      {item.name}
                    </h2>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      ${parseFloat(item.price).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {item.category}
                    </span>
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search filters
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
