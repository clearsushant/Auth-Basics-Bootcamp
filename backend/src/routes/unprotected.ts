import { Router, Response, Request } from "express";
import jwt from 'jsonwebtoken';
import { products } from "../data/products";
import { JWT_SECRET } from '../data/auth';
import { findUser, verifyPassword } from '../utils/loginUtils';

const router = Router();

router.get("/hello", (_req: any, res: Response) => {
  res.send("Hello World!");
});

router.get("/products", (_req: any, res: Response) => {
  res.json(products);
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const user = findUser(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'strict',
    maxAge: 3600000 // 1 hour
  });

  res.json({
    user: {
      username: user.username,
      role: user.role
    }
  });
});

router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

export default router;
