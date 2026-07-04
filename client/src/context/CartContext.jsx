import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (product) => {

    const exists = cart.find(
      (item) => item._id === product._id
    );

    if (exists) {

      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        )
      );

      return;
    }

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  const removeFromCart = (id) => {
    setCart(
      cart.filter(
        (item) => item._id !== id
      )
    );
  };

  const increaseQuantity = (id) => {

    setCart(
      cart.map((item) =>
        item._id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {

    setCart(
      cart.map((item) =>
        item._id === id
          ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1,
          }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;