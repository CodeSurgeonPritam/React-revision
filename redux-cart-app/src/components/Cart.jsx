import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cartSlice";

function Cart() {
  const { cartItems, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>🛒 Shopping Cart ({totalQuantity} items)</h2>
      {cartItems.length === 0 ? <p>Cart is empty!</p> : null}
      {cartItems.map((item) => (
        <div key={item.id} style={{ borderBottom: "1px solid gray", padding: "10px" }}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}
      {cartItems.length > 0 && <button onClick={() => dispatch(clearCart())}>Clear Cart</button>}
    </div>
  );
}

export default Cart;
