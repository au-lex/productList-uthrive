import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import productsRouter from "./routes/products";
import cartRouter from "./routes/cart";
import { errorHandler, notFound } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT ?? 3001;

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ success: true, message: "Storefront API is running", timestamp: new Date().toISOString() });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

// ─── Error handling ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Storefront API running at http://localhost:${PORT}`);
  console.log(`Products endpoint: http://localhost:${PORT}/api/products`);
  console.log(`Cart endpoint:     http://localhost:${PORT}/api/cart`);
  console.log(` Health check:      http://localhost:${PORT}/health\n`);
});

export default app;
