import styles from "./ProductCard.module.css";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: (productId: number) => void;
};

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{product.name}</h3>
      <span className={styles.category}>{product.category}</span>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
      <button
        className={styles.button}
        onClick={() => onAddToCart?.(product.id)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
