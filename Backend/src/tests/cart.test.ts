import request from "supertest";
import app from "../server";

describe("Cart API", () => {
  const cartId = "test-cart";
  let productId: number;

  // ─────────────────────────────────────────────
  // FIRST CREATE A PRODUCT (needed for cart)
  // ─────────────────────────────────────────────
  beforeAll(async () => {
    const res = await request(app).post("/api/products").send({
      name: "Cart Product",
      brand: "Sony",
      category: "Electronics",
      price: 500,
      rating: 4,
      reviews: 5,
      sku: "CART-001",
      stock: 10,
      color: "Black",
      description: "For cart test",
      image: "img.jpg",
    });

    productId = res.body.data.id;
  });

  // ─────────────────────────────────────────────
  // GET EMPTY CART
  // ─────────────────────────────────────────────
  it("GET /cart → should return empty cart", async () => {
    const res = await request(app).get(`/api/cart/${cartId}`);

    expect(res.status).toBe(200);
    expect(res.body.data.items).toEqual([]);
  });

  // ─────────────────────────────────────────────
  // ADD TO CART
  // ─────────────────────────────────────────────
  it("POST /cart/items → should add item", async () => {
    const res = await request(app)
      .post(`/api/cart/${cartId}/items`)
      .send({
        productId,
        qty: 2,
      });

    expect(res.status).toBe(201);
    expect(res.body.data.count).toBe(2);
  });

  // ─────────────────────────────────────────────
  // UPDATE CART ITEM
  // ─────────────────────────────────────────────
  it("PATCH /cart/items/:productId → update qty", async () => {
    const res = await request(app)
      .patch(`/api/cart/${cartId}/items/${productId}`)
      .send({
        qty: 5,
      });

    expect(res.status).toBe(200);
    expect(res.body.data.count).toBe(5);
  });

  // ─────────────────────────────────────────────
  // REMOVE ITEM
  // ─────────────────────────────────────────────
  it("DELETE /cart/items/:productId → remove item", async () => {
    const res = await request(app).delete(
      `/api/cart/${cartId}/items/${productId}`
    );

    expect(res.status).toBe(200);
  });

  // ─────────────────────────────────────────────
  // CLEAR CART
  // ─────────────────────────────────────────────
  it("DELETE /cart → clear cart", async () => {
    const res = await request(app).delete(`/api/cart/${cartId}`);

    expect(res.status).toBe(200);
    expect(res.body.data.items).toEqual([]);
  });
});