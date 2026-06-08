"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    subtotal,
    count,
    closeCart,
    removeItem,
    setQuantity,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[200] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-text-main/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute top-0 right-0 h-full w-full max-w-[440px] bg-bg border-l border-line flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-line">
          <h2 className="serif text-[1.5rem]">
            Your Cart{" "}
            <span className="font-mono text-[0.85rem] align-middle">
              [{count}]
            </span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="text-[1.5rem] leading-none cursor-pointer hover:opacity-60 transition-opacity"
          >
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="serif text-lg">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="text-mono underline underline-offset-4"
            >
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-8 py-4 divide-y divide-line">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <div className="relative w-16 h-20 shrink-0 overflow-hidden bg-surface">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover mix-blend-multiply"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between gap-2">
                      <span className="serif text-[1rem] leading-tight">
                        {item.name}
                        {item.nameLine2 ? ` ${item.nameLine2}` : ""}
                      </span>
                      <span className="font-mono text-[0.8rem] whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            setQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 cursor-pointer hover:bg-surface transition-colors"
                        >
                          &minus;
                        </button>
                        <span className="px-3 font-mono text-[0.8rem]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            setQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 cursor-pointer hover:bg-surface transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-mono underline underline-offset-4 hover:opacity-60 transition-opacity"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-8 py-6 flex flex-col gap-4">
              <div className="flex justify-between items-baseline">
                <span className="text-mono">Subtotal</span>
                <span className="font-mono text-[1rem]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-mono opacity-70">
                Shipping &amp; taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block bg-text-main text-bg py-3 text-center font-sans text-[0.75rem] uppercase tracking-[0.05em] no-underline transition-opacity duration-300 hover:opacity-85"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
