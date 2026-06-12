import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products } from "@/data/products";
import AddToCartControls from "@/components/ui/AddToCartControls";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product Not Found — Riccis Bikkies" };

  const fullName = product.nameLine2
    ? `${product.name} ${product.nameLine2}`
    : product.name;

  return {
    title: `${fullName} — Riccis Bikkies`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) notFound();

  const fullName = product.nameLine2
    ? `${product.name} ${product.nameLine2}`
    : product.name;

  return (
    <main className="wrapper pt-[max(20vh,11rem)] pb-32">
      <Link
        href="/shop"
        className="text-mono inline-block mb-12 hover:opacity-60 transition-opacity"
      >
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-2 gap-16 max-[900px]:grid-cols-1">
        {/* Image */}
        <div
          className={`aspect-[4/5] overflow-hidden relative rounded-lg border border-line ${
            product.cutout ? "" : "bg-surface"
          }`}
        >
          <Image
            src={product.image}
            alt={fullName}
            fill
            priority
            className={
              product.cutout
                ? "object-contain p-6"
                : "object-cover saturate-[0.96] contrast-[1.02] brightness-[1.02]"
            }
            style={{ objectPosition: product.imagePosition ?? "center" }}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-8 max-w-xl">
          <div className="flex flex-col gap-4">
            <h1 className="serif text-lg leading-[1.05]">
              {product.name}
              {product.nameLine2 && (
                <>
                  <br />
                  {product.nameLine2}
                </>
              )}
            </h1>
            <span className="font-mono text-[1.1rem]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="border border-line px-[0.6rem] py-[0.2rem] rounded-xl text-[0.65rem] font-mono uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-[1rem] leading-[1.7] opacity-90 border-t border-line pt-8">
            {product.description}
          </p>

          <AddToCartControls product={product} />

          <div className="border-t border-line pt-6 text-mono opacity-70 leading-[1.8]">
            Hand-baked in the Yarra Valley · 100% Australian made · No artificial
            colours, flavours or preservatives
          </div>
        </div>
      </div>
    </main>
  );
}
