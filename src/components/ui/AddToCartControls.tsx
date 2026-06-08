"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function AddToCartControls({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (product.soldOut) {
    return (
      <button
        type="button"
        disabled
        className="w-full bg-transparent border border-text-main text-text-main py-4 text-center font-sans text-[0.75rem] uppercase tracking-[0.05em] opacity-40 cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex items-center border border-text-main">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-4 py-4 cursor-pointer hover:bg-surface transition-colors"
        >
          &minus;
        </button>
        <span className="px-4 font-mono text-[0.85rem] min-w-[2rem] text-center">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => q + 1)}
          className="px-4 py-4 cursor-pointer hover:bg-surface transition-colors"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => addItem(product, quantity)}
        className="flex-1 bg-text-main text-bg py-4 text-center font-sans text-[0.75rem] uppercase tracking-[0.05em] cursor-pointer transition-opacity duration-300 hover:opacity-85"
      >
        Add to Cart
      </button>
    </div>
  );
}
