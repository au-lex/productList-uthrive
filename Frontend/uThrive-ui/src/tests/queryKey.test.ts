import { describe, it, expect } from "vitest";
import { queryKeys } from "../services/lib/queryKeys";

describe("queryKeys", () => {
  describe("products", () => {
    it("products.all is ['products']", () => {
      expect(queryKeys.products.all).toEqual(["products"]);
    });

    it("products.lists() prefixes all with 'list'", () => {
      expect(queryKeys.products.lists()).toEqual(["products", "list"]);
    });

    it("products.list(filters) appends the filters object", () => {
      const filters = { search: "nike", page: 1 };
      expect(queryKeys.products.list(filters)).toEqual(["products", "list", filters]);
    });

    it("products.meta() returns ['products', 'meta']", () => {
      expect(queryKeys.products.meta()).toEqual(["products", "meta"]);
    });

    it("products.details() returns ['products', 'detail']", () => {
      expect(queryKeys.products.details()).toEqual(["products", "detail"]);
    });

    it("products.detail(id) appends the numeric id", () => {
      expect(queryKeys.products.detail(42)).toEqual(["products", "detail", 42]);
    });

    it("two different ids produce different keys", () => {
      expect(queryKeys.products.detail(1)).not.toEqual(queryKeys.products.detail(2));
    });

    it("list keys are prefixed by lists() key (useful for invalidateQueries)", () => {
      const listsKey = queryKeys.products.lists();
      const listKey = queryKeys.products.list({ search: "x" });
      expect(listKey.slice(0, listsKey.length)).toEqual(listsKey);
    });
  });

  describe("cart", () => {
    it("cart.all is ['cart']", () => {
      expect(queryKeys.cart.all).toEqual(["cart"]);
    });

    it("cart.details() returns ['cart', 'detail']", () => {
      expect(queryKeys.cart.details()).toEqual(["cart", "detail"]);
    });

    it("cart.detail(cartId) appends the cart id string", () => {
      expect(queryKeys.cart.detail("guest")).toEqual(["cart", "detail", "guest"]);
    });

    it("two different cartIds produce different keys", () => {
      expect(queryKeys.cart.detail("guest")).not.toEqual(queryKeys.cart.detail("user-123"));
    });
  });
});