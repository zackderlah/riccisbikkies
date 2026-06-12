"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";

const SHIPPING_FLAT = 9.95;
const FREE_SHIPPING_THRESHOLD = 60;

export default function CheckoutPage() {
  const { items, subtotal, setQuantity, removeItem, clear } = useCart();
  const [orderRef, setOrderRef] = useState<string | null>(null);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  }, [items.length, subtotal]);

  const total = subtotal + shipping;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ref = `RB-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setOrderRef(ref);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (orderRef) {
    return (
      <main className="wrapper pt-[max(20vh,11rem)] pb-32 min-h-screen">
        <div className="max-w-2xl border border-line p-12 flex flex-col gap-4">
          <span className="text-mono">Order Confirmed</span>
          <h1 className="text-lg">Thank you for your order.</h1>
          <p className="opacity-80 leading-[1.6]">
            Your order reference is{" "}
            <span className="font-mono">{orderRef}</span>. We&apos;ve sent a
            confirmation to your email and will hand-pack your provisions in our
            Healesville bakehouse before they ship.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block self-start bg-transparent border border-text-main text-text-main px-12 py-3 font-sans text-[0.75rem] uppercase tracking-[0.05em] no-underline transition-all duration-300 hover:bg-text-main hover:text-bg"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="wrapper pt-[max(20vh,11rem)] pb-32 min-h-screen">
        <div className="max-w-2xl flex flex-col gap-6">
          <span className="text-mono">Checkout</span>
          <h1 className="text-lg">Your cart is empty.</h1>
          <p className="opacity-80 leading-[1.6]">
            Add a few provisions from the collection and they&apos;ll appear
            here, ready for checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block self-start bg-transparent border border-text-main text-text-main px-12 py-3 font-sans text-[0.75rem] uppercase tracking-[0.05em] no-underline transition-all duration-300 hover:bg-text-main hover:text-bg"
          >
            Browse the Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="wrapper pt-[max(20vh,11rem)] pb-32">
      <section className="mb-12">
        <div className="text-mono mb-4">Checkout</div>
        <h1 className="text-xl">
          Complete
          <br />
          <span className="text-accent">Your Order</span>
        </h1>
      </section>

      <div className="grid grid-cols-[1.2fr_1fr] gap-16 max-[900px]:grid-cols-1 border-t border-line pt-12">
        {/* Customer details */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <span className="text-mono">Contact &amp; Delivery</span>

          <div className="grid grid-cols-2 gap-8 max-[768px]:grid-cols-1">
            <label className="flex flex-col gap-2">
              <span className="text-mono">First Name</span>
              <input
                type="text"
                required
                className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
                placeholder="First name"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-mono">Last Name</span>
              <input
                type="text"
                required
                className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
                placeholder="Last name"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-mono">Email</span>
            <input
              type="email"
              required
              className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
              placeholder="Email address"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-mono">Street Address</span>
            <input
              type="text"
              required
              className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
              placeholder="Address"
            />
          </label>

          <div className="grid grid-cols-3 gap-8 max-[768px]:grid-cols-1">
            <label className="flex flex-col gap-2">
              <span className="text-mono">Suburb</span>
              <input
                type="text"
                required
                className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
                placeholder="Suburb"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-mono">State</span>
              <input
                type="text"
                required
                className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
                placeholder="State"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-mono">Postcode</span>
              <input
                type="text"
                required
                inputMode="numeric"
                className="bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none placeholder:text-line"
                placeholder="Postcode"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-mono">Delivery Notes</span>
            <textarea
              rows={3}
              className="bg-transparent border border-line p-4 font-sans text-text-main outline-none resize-none placeholder:text-line"
              placeholder="Anything we should know?"
            />
          </label>

          <button
            type="submit"
            className="mt-2 bg-text-main text-bg py-4 text-center font-sans text-[0.75rem] uppercase tracking-[0.05em] cursor-pointer transition-opacity duration-300 w-full hover:opacity-85"
          >
            Place Order — ${total.toFixed(2)}
          </button>
          <p className="text-mono opacity-70 -mt-4">
            This is a demo checkout — no payment is taken.
          </p>
        </form>

        {/* Order summary */}
        <aside className="flex flex-col gap-6 h-fit border border-line p-8 max-[900px]:order-first">
          <span className="text-mono">Order Summary</span>

          <ul className="flex flex-col divide-y divide-line">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 py-4">
                <div className="relative w-14 h-16 shrink-0 overflow-hidden bg-surface">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover mix-blend-multiply"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <span className="serif text-[0.95rem] leading-tight">
                    {item.name}
                    {item.nameLine2 ? ` ${item.nameLine2}` : ""}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-line">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 cursor-pointer hover:bg-surface transition-colors"
                      >
                        &minus;
                      </button>
                      <span className="px-2 font-mono text-[0.75rem]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 cursor-pointer hover:bg-surface transition-colors"
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
                <span className="font-mono text-[0.8rem] whitespace-nowrap">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-line pt-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-mono">Subtotal</span>
              <span className="font-mono text-[0.85rem]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-mono">Shipping</span>
              <span className="font-mono text-[0.85rem]">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="text-mono opacity-70">
                Spend ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more
                for free shipping.
              </p>
            )}
            <div className="flex justify-between items-baseline border-t border-line pt-3 mt-2">
              <span className="text-sm">Total</span>
              <span className="font-mono text-[1rem]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
