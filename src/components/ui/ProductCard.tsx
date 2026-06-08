"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const fullName = product.nameLine2
    ? `${product.name} ${product.nameLine2}`
    : product.name;

  return (
    <article className="group flex flex-col gap-6">
      <Link
        href={`/product/${product.id}`}
        aria-label={fullName}
        className={`aspect-[4/5] overflow-hidden relative block ${
          product.cutout ? "" : "bg-surface border border-line"
        }`}
      >
        <Image
          src={product.image}
          alt={fullName}
          fill
          className={`transition-transform duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:scale-105 ${
            product.cutout
              ? "object-contain p-4"
              : "object-cover saturate-[0.96] contrast-[1.02] brightness-[1.02]"
          }`}
          style={{ objectPosition: product.imagePosition ?? "center" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="serif text-[1.25rem] max-w-[80%]">
            <Link
              href={`/product/${product.id}`}
              className="no-underline text-text-main hover:opacity-70 transition-opacity"
            >
              {product.name}
              {product.nameLine2 && (
                <>
                  <br />
                  {product.nameLine2}
                </>
              )}
            </Link>
          </h3>
          <span className="font-mono text-[0.85rem]">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap mt-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="border border-line px-[0.6rem] py-[0.2rem] rounded-xl text-[0.65rem] font-mono uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          disabled={product.soldOut}
          onClick={() => addItem(product)}
          className="mt-4 bg-transparent border border-text-main text-text-main py-3 text-center font-sans text-[0.75rem] uppercase tracking-[0.05em] cursor-pointer transition-all duration-300 w-full hover:bg-text-main hover:text-bg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text-main"
        >
          {product.soldOut ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
