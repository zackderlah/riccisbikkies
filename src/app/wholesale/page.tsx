import type { Metadata } from "next";
import WholesaleForm from "@/components/wholesale/WholesaleForm";

export const metadata: Metadata = {
  title: "Wholesale Enquiry — Riccis Bikkies",
  description:
    "Partner with Ricci's Bikkies for trade and hospitality wholesale supply.",
};

const tradeStats = [
  { label: "Minimum Order", value: "24 units" },
  { label: "Lead Time", value: "5–7 days" },
  { label: "Delivery", value: "Metro VIC" },
  { label: "Shelf Life", value: "90 days" },
];

export default function WholesalePage() {
  return (
    <main className="wrapper pt-[max(20vh,11rem)] pb-32">
      <section className="flex flex-col gap-16">
        <div>
          <div className="text-mono mb-4">Trade & Hospitality</div>
          <h1 className="text-xl mb-8">
            Wholesale
            <br />
            <span className="text-accent">Enquiry</span>
          </h1>
          <p className="serif text-lg opacity-90 leading-[1.2] mb-8">
            Partner with Ricci&apos;s Bikkies for your cellar door, deli,
            restaurant or specialty grocer. We supply premium savoury provisions
            to stockists across Victoria and interstate.
          </p>

          <div className="grid grid-cols-2 gap-8 mt-16">
            {tradeStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 border-t border-line pt-4"
              >
                <span className="text-mono">{stat.label}</span>
                <span className="font-display text-[2rem] text-accent">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <WholesaleForm />
      </section>
    </main>
  );
}
