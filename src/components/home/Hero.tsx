import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid-12 min-h-screen pt-[15vh] pb-[5vh]">
      {/* Title — cols 1–8 */}
      <div className="col-span-8 flex flex-col gap-8 justify-start">
        <div className="text-mono">Established 2003 — Victoria, AU</div>
        <h1 className="text-xl">
          Savoury craft,
          <br />
          <span className="italic">baked</span> in the
          <br />
          Yarra Valley.
        </h1>
        <Link
          href="/shop"
          className="inline-block self-start bg-text-main border border-text-main text-bg px-12 py-4 font-sans text-[0.75rem] uppercase tracking-[0.05em] no-underline transition-all duration-300 hover:bg-transparent hover:text-text-main"
        >
          Shop the Collection
        </Link>
      </div>

      {/* Meta info — cols 10–12 */}
      <div className="col-span-3 col-start-10 flex flex-col justify-end gap-4 pb-4">
        <div className="flex flex-col gap-1 border-t border-line pt-2">
          <span className="text-mono">Ingredient Focus</span>
          <span className="text-sm">Local Wheat & Wild Herbs</span>
        </div>
        <div className="flex flex-col gap-1 border-t border-line pt-2">
          <span className="text-mono">Pairing Profile</span>
          <span className="text-sm">Cheeses, Charcuterie & Wine</span>
        </div>
        <div className="flex flex-col gap-1 border-t border-line pt-2">
          <span className="text-mono">Production</span>
          <span className="text-sm">Small Batch Artisan</span>
        </div>
      </div>

      {/* Hero image — cols 4–12 */}
      <div className="col-span-9 col-start-4 h-[50vh] overflow-hidden relative mt-16">
        <Image
          src="https://static.wixstatic.com/media/11d54a_791d37cbee4c472c9b09b52eb7a92957~mv2.jpg/v1/fill/w_1600,h_900,al_c,q_85,enc_auto/11d54a_791d37cbee4c472c9b09b52eb7a92957~mv2.jpg"
          alt="Ricci's Bikkies gourmet pita crisps"
          fill
          className="object-cover sepia-[0.2] contrast-[1.1]"
          priority
          sizes="(max-width: 1024px) 100vw, 75vw"
        />
      </div>
    </section>
  );
}
