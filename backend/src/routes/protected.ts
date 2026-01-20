import { Router, Response, Request } from "express";
import { authenticateToken, authorizeRole, AuthRequest } from "../middleware/auth";
import { Role } from "../types/roles";
import { getCart, addToCart } from "../data/cart";

const router = Router();

// Apply authentication to all routes in this router
router.use(authenticateToken);

// Example protected route - get user profile
router.get("/profile", (req: AuthRequest, res: Response) => {
  res.json({
    user: {
      username: req.user?.username,
      role: req.user?.role
    }
  });
});

// Get user's cart
router.get("/cart", (req: AuthRequest, res: Response) => {
  const username = req.user?.username;
  if (!username) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const cart = getCart(username);
  res.json({ cart });
});

// Add item to cart
router.post("/cart", (req: AuthRequest, res: Response) => {
  const username = req.user?.username;
  if (!username) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { productId } = req.body;
  if (!productId || typeof productId !== 'number') {
    return res.status(400).json({ error: 'Valid productId required' });
  }

  addToCart(username, productId);
  res.json({ message: 'Item added to cart', cart: getCart(username) });
});

// Admin only route
router.get("/admin", authorizeRole([Role.ADMIN]), (_req: AuthRequest, res: Response) => {
  res.json({ message: "Welcome to the admin panel!" });
});

// User only route
router.get("/user", authorizeRole([Role.USER]), (_req: AuthRequest, res: Response) => {
  res.json({ message: "Welcome to the user dashboard!" });
});

export default router;