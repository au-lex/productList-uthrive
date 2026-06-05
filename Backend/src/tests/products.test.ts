import request from "supertest";
import app from "../server";

describe("Products API", () => {
  let productId: number;

  // ─────────────────────────────────────────────
  // GET ALL PRODUCTS
  // ─────────────────────────────────────────────
  it("GET /api/products → should return products", async () => {
    const res = await request(app).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // ─────────────────────────────────────────────
  // CREATE PRODUCT
  // ─────────────────────────────────────────────
  it("POST /api/products → should create product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Test Phone",
      brand: "Apple",
      category: "Electronics",
      price: 1200,
      rating: 4.5,
      reviews: 10,
      sku: "TEST-001",
      stock: 5,
      color: "Black",
      description: "Test product",
      image: "test.jpg",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Test Phone");

    productId = res.body.data.id;
  });

  // ─────────────────────────────────────────────
  // GET BY ID
  // ─────────────────────────────────────────────
  it("GET /api/products/:id → should return product", async () => {
    const res = await request(app).get(`/api/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(productId);
  });

  it("GET /api/products/:id → should return 404", async () => {
    const res = await request(app).get("/api/products/999999");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  // ─────────────────────────────────────────────
  // UPDATE PRODUCT
  // ─────────────────────────────────────────────
  it("PUT /api/products/:id → should update product", async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .send({
        name: "Updated Product",
        price: 2000,
      });

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Updated Product");
  });

  // ─────────────────────────────────────────────
  // ARCHIVE PRODUCT
  // ─────────────────────────────────────────────
  it("PATCH /archive → should archive product", async () => {
    const res = await request(app).patch(
      `/api/products/${productId}/archive`
    );

    expect(res.status).toBe(200);
    expect(res.body.data.archived).toBe(true);
  });

  it("PATCH /archive → should fail if already archived", async () => {
    const res = await request(app).patch(
      `/api/products/${productId}/archive`
    );

    expect(res.status).toBe(400);
  });

  // ─────────────────────────────────────────────
  // RESTORE PRODUCT
  // ─────────────────────────────────────────────
  it("PATCH /restore → should restore product", async () => {
    const res = await request(app).patch(
      `/api/products/${productId}/restore`
    );

    expect(res.status).toBe(200);
    expect(res.body.data.archived).toBe(false);
  });

  // ─────────────────────────────────────────────
  // DELETE PRODUCT
  // ─────────────────────────────────────────────
  it("DELETE /api/products/:id → should delete product", async () => {
    const res = await request(app).delete(
      `/api/products/${productId}`
    );

    expect(res.status).toBe(200);
  });
});