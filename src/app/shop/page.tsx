import ShopBrowser from "@/components/shop/ShopBrowser";
import { products } from "@/data/products";

export const metadata = {
  title: "Shop — Riccis Bikkies",
  description: "Browse our full collection of artisan savoury biscuits and pita crisps.",
};

export default function ShopPage() {
  return (
    <main className="wrapper pt-[max(20vh,11rem)] pb-32">
      <section className="mb-16">
        <div className="text-mono mb-4">Our Range</div>
        <h1 className="text-xl mb-8">
          Our
          <br />
          <span className="italic">Products</span>
        </h1>
      </section>

      <ShopBrowser products={products} />
    </main>
  );
}
