import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import ProductCard from "../../components/ProductCard";
import toast from "react-hot-toast";
import styles from "./Products.module.css";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
};

const Products = () => {
  const { apiFetch } = useApi();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiFetch("/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiFetch]);

  const handleAddToCart = async (productId: number) => {
    try {
      const response = await apiFetch("/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        toast.success("Added to cart!");
      } else {
        toast.error("Failed to add to cart");
      }
    } catch {
      toast.error("Error adding to cart");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
