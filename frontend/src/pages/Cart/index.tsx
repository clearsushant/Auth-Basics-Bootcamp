import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import styles from "./Cart.module.css";

type CartItem = {
  productId: number;
  quantity: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
};

type CartItemWithDetails = CartItem & {
  product?: Product;
};

const Cart = () => {
  const { apiFetch } = useApi();
  const [cart, setCart] = useState<CartItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      try {
        // Fetch cart
        const cartResponse = await apiFetch("/cart");

        if (!cartResponse.ok) {
          if (cartResponse.status !== 401) {
            const data = await cartResponse.json();
            throw new Error(data.error || "Failed to fetch cart");
          }
          return;
        }

        const cartData = await cartResponse.json();
        const cartItems: CartItem[] = cartData.cart;

        // Fetch products
        const productsResponse = await apiFetch("/products");
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }

        const products: Product[] = await productsResponse.json();

        // Merge cart items with product details
        const cartWithDetails = cartItems.map(item => ({
          ...item,
          product: products.find(p => p.id === item.productId)
        }));

        setCart(cartWithDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCartAndProducts();
  }, [apiFetch]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0).toFixed(2);
  };

  if (loading) {
    return <div className={styles.loading}>Loading cart...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cart</h1>
      {cart.length === 0 ? (
        <div className={styles.empty}>Your cart is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => (
              <div key={item.productId} className={styles.item}>
                <div className={styles.itemDetails}>
                  <span className={styles.itemName}>
                    {item.product?.name || `Product #${item.productId}`}
                  </span>
                  <span className={styles.itemPrice}>
                    ${item.product?.price.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className={styles.itemMeta}>
                  <span className={styles.itemQty}>Qty: {item.quantity}</span>
                  <span className={styles.itemTotal}>
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <strong>Total: ${calculateTotal()}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
