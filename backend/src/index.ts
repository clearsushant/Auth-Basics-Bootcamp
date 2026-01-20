import express from "express";
import cookieParser from "cookie-parser";
import unprotectedRoutes from "./routes/unprotected";
import protectedRoutes from "./routes/protected";
import cors from "cors";
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);


// Unprotected routes
app.use(unprotectedRoutes);

// Protected routes
app.use(protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});