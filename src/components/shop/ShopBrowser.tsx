"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/data/products";

interface ShopBrowserProps {
  products: Product[];
}

const categories: { label: string; tag: string | null }[] = [
  { label: "All", tag: null },
  { label: "Chilli Crisp", tag: "Chilli Crisp" },
  { label: "Sauces", tag: "Sauce Trio" },
  { label: "Pita Bits", tag: "Pita Bits" },
  { label: "Palmiettes", tag: "Palmiettes" },
  { label: "Original Crisps", tag: "Original Pita Crisps" },
  { label: "Stonebaker", tag: "Stonebaker" },
  { label: "Vegan", tag: "Vegan" },
];

export default function ShopBrowser({ products }: ShopBrowserProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      if (!matchesTag) return false;
      if (!q) return true;
      const haystack = [p.name, p.nameLine2 ?? "", p.description, ...p.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [products, query, activeTag]);

  return (
    <>
      <div className="border-t border-line pt-8 mb-12 flex flex-col gap-8">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          {/* Search */}
          <label className="flex items-center gap-3 border-b border-text-main py-2 w-full max-w-sm">
            <svg
              viewBox="0 0 20 20"
              className="w-4 h-4 shrink-0 opacity-60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="M14 14l4 4" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the collection"
              aria-label="Search products"
              className="bg-transparent border-0 outline-none font-sans text-text-main w-full placeholder:text-line"
            />
          </label>

          <span className="text-mono">
            {filtered.length}{" "}
            {filtered.length === 1 ? "product" : "products"}
          </span>
        </div>

        {/* Category filters */}
        <div className="flex gap-2.5 flex-wrap">
          {categories.map((cat) => {
            const active = activeTag === cat.tag;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveTag(cat.tag)}
                aria-pressed={active}
                className={`border px-4 py-2 rounded-full text-[0.7rem] font-mono uppercase tracking-[0.05em] cursor-pointer transition-all duration-300 ${
                  active
                    ? "bg-text-main text-bg border-text-main"
                    : "border-line text-text-main hover:border-text-main"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-3 gap-12 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center flex flex-col gap-4 border-t border-line">
          <p className="serif text-lg">No products found.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveTag(null);
            }}
            className="self-center text-mono no-underline border-b border-text-main pb-0.5 cursor-pointer hover:opacity-60 transition-opacity"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
