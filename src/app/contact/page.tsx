import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Riccis Bikkies",
  description:
    "Visit the Ricci's Bikkies factory outlet at 29 Hunter Road, Healesville in the Yarra Valley. Find our address, opening hours and phone numbers.",
};

const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=Ricci%27s%20Bikkies%2029%20Hunter%20Rd%20Healesville%20VIC%203777&z=15&output=embed";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Ricci%27s+Bikkies+29+Hunter+Rd+Healesville+VIC+3777";

const details = [
  {
    label: "Factory Outlet",
    lines: ["Factories 1 & 2, 29 Hunter Road", "Healesville, Victoria 3777"],
    action: { text: "Get directions", href: MAP_LINK },
  },
  {
    label: "Opening Hours",
    lines: ["Monday – Friday, 7am – 3pm", "Weekends closed"],
  },
  {
    label: "Phone",
    lines: ["0407 380 946", "03 5962 1294"],
    action: { text: "Call us", href: "tel:+61407380946" },
  },
];

export default function ContactPage() {
  return (
    <main className="wrapper pt-[max(20vh,11rem)] pb-32">
      <section className="mb-16">
        <div className="text-mono mb-4">Find Us</div>
        <h1 className="text-xl mb-8">
          Visit the
          <br />
          <span className="text-accent">Yarra Valley</span>
        </h1>
        <p className="serif text-lg opacity-90 leading-[1.2] max-w-[44ch]">
          Tucked away in Healesville, our factory outlet is where every batch is
          baked by hand. Drop in to taste the range, stock up, or simply say
          hello.
        </p>
      </section>

      <div className="grid grid-cols-12 gap-12 max-[900px]:grid-cols-1">
        {/* Details — left */}
        <div className="col-span-4 max-[900px]:col-span-1 flex flex-col gap-10">
          {details.map((d) => (
            <div
              key={d.label}
              className="flex flex-col gap-2 border-t border-line pt-5"
            >
              <span className="text-mono">{d.label}</span>
              {d.lines.map((line) => (
                <span key={line} className="serif text-[1.4rem] leading-tight">
                  {line}
                </span>
              ))}
              {d.action && (
                <a
                  href={d.action.href}
                  target={d.action.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    d.action.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="mt-3 self-start text-mono no-underline border-b border-text-main pb-0.5 text-text-main transition-opacity hover:opacity-60"
                >
                  {d.action.text} →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Map — right */}
        <div className="col-span-8 max-[900px]:col-span-1">
          <div className="relative w-full aspect-[16/11] max-[900px]:aspect-[4/3] overflow-hidden border border-line bg-surface">
            <iframe
              title="Ricci's Bikkies location on Google Maps"
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale-[0.15] contrast-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Contact form — below the map */}
      <section className="mt-24 border-t border-line pt-16 grid grid-cols-12 gap-12 max-[900px]:grid-cols-1">
        <div className="col-span-4 max-[900px]:col-span-1">
          <div className="text-mono mb-4">Get in Touch</div>
          <h2 className="text-md max-w-[16ch]">
            Questions, orders or just hello.
          </h2>
        </div>
        <div className="col-span-8 max-[900px]:col-span-1">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
