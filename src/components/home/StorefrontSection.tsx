import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { products, getProduct } from "@/data/products";

interface StorefrontSectionProps {
  showViewAll?: boolean;
}

// A curated mix: one chilli, one sauce, one biscuit.
const featuredIds = [
  "crispy-chilli-candied-garlic",
  "sauces-wasabi-trio",
  "olive-oil-sea-salt",
];

export default function StorefrontSection({
  showViewAll = true,
}: StorefrontSectionProps) {
  const displayed = featuredIds
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const total = products.length;

  return (
    <section className="py-16 pb-32 border-t border-line">
      <div className="flex justify-between items-baseline mb-16">
        <h2 className="text-lg">Our Favourites</h2>
        <span className="text-mono">
          Displaying 1–{displayed.length} of {total} provisions
        </span>
      </div>

      {/* 3-col desktop, 2-col tablet, 1-col mobile */}
      <div className="grid grid-cols-3 gap-12 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
        {displayed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showViewAll && displayed.length < total && (
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-block bg-transparent border border-text-main text-text-main px-12 py-3 font-sans text-[0.75rem] uppercase tracking-[0.05em] no-underline transition-all duration-300 hover:bg-text-main hover:text-bg"
          >
            View All Products
          </Link>
        </div>
      )}
    </section>
  );
}
