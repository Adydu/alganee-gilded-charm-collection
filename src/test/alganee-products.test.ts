import { describe, expect, it } from "vitest";

import { alganeeProducts, amazonProductUrl } from "@/lib/alganee-products";

describe("Alganee product catalog", () => {
  it("links the featured bracelet watch to the exact Amazon page supplied", () => {
    const watch = alganeeProducts.find((product) => product.id === "pearl-charm-bracelet-watch");

    expect(amazonProductUrl).toBe(
      "https://www.amazon.in/gp/product/B0HLXDSR12/ref=cx_skuctr_share_ls_srb?smid=A3C866BRGP0529&tag=ShopReferral_dad8e8c3-0b59-41a0-87f0-9ca0e7a890d8/",
    );
    expect(watch?.amazonUrl).toBe(amazonProductUrl);
  });

  it("keeps unlisted styles clearly marked as previews instead of suggesting they are available", () => {
    const placeholders = alganeeProducts.filter((product) => product.isPlaceholder);

    expect(placeholders.map((product) => product.badge)).toEqual(["Coming soon", "Coming soon"]);
    expect(placeholders.every((product) => !product.amazonUrl)).toBe(true);
  });
});