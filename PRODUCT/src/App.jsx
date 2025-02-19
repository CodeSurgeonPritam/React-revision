import { useState, useEffect } from "react";
import product from "./db/data.json";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [data, setData] = useState(product.data.items);
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const categories = [...new Set(product.data.items.map((item) => item.category))];
      setSubcategories(categories);
    } catch (error) {
      console.error("Error loading categories:", error);
      setSubcategories([]);
    }
  }, []);

  // Cart Functions
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      toast.success(`Added another ${item.name} to cart!`);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      toast.success(`${item.name} added to cart!`);
    }
  };

  const removeFromCart = (itemId) => {
    const itemToRemove = cart.find(item => item.id === itemId);
    setCart(cart.filter((item) => item.id !== itemId));
    toast.error(`${itemToRemove.name} removed from cart!`);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    toast.success('Cart updated!');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    toast.success('Order placed successfully!', {
      icon: '🎉',
      duration: 4000,
    });
    setCart([]);
    setIsCartOpen(false);
  };

  // Filtering logic
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
    <div className="min-h-screen bg-gray-50 relative">
      {/* Toast Container */}
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#4CAF50',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
          duration: 2000,
        }}
      />

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Product Catalog</h1>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b py-4">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <div className="text-xl font-bold mb-4">
                    Total: ${getTotalPrice().toFixed(2)}
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Sort by Price</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
            <input
              type="number"
              placeholder="Filter by price"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">All Categories</option>
              {subcategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
