import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const products = [
  { id: 1, name: "iPhone 13", price: 799 },
  { id: 2, name: "Samsung S21", price: 699 },
  { id: 3, name: "OnePlus 9", price: 599 },
];

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
