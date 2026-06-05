import { Request, Response } from "express";
import { products, ALL_BRANDS, ALL_CATEGORIES, MAX_PRICE, getNextId } from "../data/products";
import { ApiResponse, PaginatedResponse, Product } from "../types";

// GET /api/products
export const getAllProducts = (req: Request, res: Response): void => {
  const {
    search = "",
    category,
    brand,
    priceMin,
    priceMax,
    sort = "default",
    page = "1",
    limit = "20",
    archived,
  } = req.query as Record<string, string>;

  let list = [...products];

  // Filter by archived status
  if (archived === "true") {
    list = list.filter((p) => p.archived);
  } else if (archived === "all") {
    // return everything
  } else {
    list = list.filter((p) => !p.archived); // default: active only
  }

  // Search name, brand, description
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Category filter (comma-separated)
  if (category) {
    const cats = category.split(",");
    list = list.filter((p) => cats.includes(p.category));
  }

  // Brand filter (comma-separated)
  if (brand) {
    const brands = brand.split(",");
    list = list.filter((p) => brands.includes(p.brand));
  }

  // Price range
  const min = parseFloat(priceMin ?? "0");
  const max = parseFloat(priceMax ?? String(MAX_PRICE));
  if (!isNaN(min)) list = list.filter((p) => p.price >= min);
  if (!isNaN(max)) list = list.filter((p) => p.price <= max);

  // Sort
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

  // Paginate
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
  const total = list.length;
  const totalPages = Math.ceil(total / limitNum);
  const start = (pageNum - 1) * limitNum;
  const paginated = list.slice(start, start + limitNum);

  const response: PaginatedResponse<Product> = {
    success: true,
    data: paginated,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages,
  };

  res.json(response);
};

// GET /api/products/meta
export const getProductsMeta = (_req: Request, res: Response): void => {
  res.json({
    success: true,
    data: {
      categories: ALL_CATEGORIES,
      brands: ALL_BRANDS,
      maxPrice: MAX_PRICE,
      totalProducts: products.length,
      activeCount: products.filter((p) => !p.archived).length,
      archivedCount: products.filter((p) => p.archived).length,
    },
  });
};

// GET /api/products/:id
export const getProductById = (req: Request, res: Response): void => {
  const id = parseInt(String(req.params["id"]));
  const product = products.find((p) => p.id === id);

  if (!product) {
    const response: ApiResponse = { success: false, error: "Product not found" };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<Product> = { success: true, data: product };
  res.json(response);
};

// POST /api/products
export const createProduct = (req: Request, res: Response): void => {
  const { name, brand, category, price, rating, reviews, sku, stock, color, description, image } =
    req.body as Partial<Product>;

  if (!name || !brand || !category || price === undefined) {
    const response: ApiResponse = {
      success: false,
      error: "Missing required fields: name, brand, category, price",
    };
    res.status(400).json(response);
    return;
  }

  const newProduct: Product = {
    id: getNextId(),
    name,
    brand,
    category,
    price: Number(price),
    rating: Number(rating ?? 0),
    reviews: Number(reviews ?? 0),
    sku: sku ?? "",
    stock: Number(stock ?? 0),
    color: color ?? "",
    description: description ?? "",
    image: image ?? "",
    archived: false,
  };

  products.push(newProduct);

  const response: ApiResponse<Product> = {
    success: true,
    data: newProduct,
    message: "Product created successfully",
  };
  res.status(201).json(response);
};

// PUT /api/products/:id
export const updateProduct = (req: Request, res: Response): void => {
  const id = parseInt(String(req.params["id"]));
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    const response: ApiResponse = { success: false, error: "Product not found" };
    res.status(404).json(response);
    return;
  }

  const updated: Product = { ...products[index], ...(req.body as Partial<Product>), id };
  products[index] = updated;

  const response: ApiResponse<Product> = {
    success: true,
    data: updated,
    message: "Product updated successfully",
  };
  res.json(response);
};

// PATCH /api/products/:id/archive
export const archiveProduct = (req: Request, res: Response): void => {
  const id = parseInt(String(req.params["id"]));
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    const response: ApiResponse = { success: false, error: "Product not found" };
    res.status(404).json(response);
    return;
  }

  if (products[index].archived) {
    const response: ApiResponse = { success: false, error: "Product is already archived" };
    res.status(400).json(response);
    return;
  }

  products[index] = { ...products[index], archived: true };

  const response: ApiResponse<Product> = {
    success: true,
    data: products[index],
    message: "Product archived successfully",
  };
  res.json(response);
};

// PATCH /api/products/:id/restore
export const restoreProduct = (req: Request, res: Response): void => {
  const id = parseInt(String(req.params["id"]));
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    const response: ApiResponse = { success: false, error: "Product not found" };
    res.status(404).json(response);
    return;
  }

  if (!products[index].archived) {
    const response: ApiResponse = { success: false, error: "Product is not archived" };
    res.status(400).json(response);
    return;
  }

  products[index] = { ...products[index], archived: false };

  const response: ApiResponse<Product> = {
    success: true,
    data: products[index],
    message: "Product restored successfully",
  };
  res.json(response);
};

// DELETE /api/products/:id
export const deleteProduct = (req: Request, res: Response): void => {
  const id = parseInt(String(req.params["id"]));
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    const response: ApiResponse = { success: false, error: "Product not found" };
    res.status(404).json(response);
    return;
  }

  products.splice(index, 1);

  const response: ApiResponse = { success: true, message: "Product deleted successfully" };
  res.json(response);
};
