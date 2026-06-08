"use client";

import { useCallback, useEffect, useState } from "react";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=Ricci%27s+Bikkies+Healesville";

interface Review {
  name: string;
  quote: string;
}

// Real reviews from Ricci's Bikkies' Google listing (Healesville, VIC) —
// rated 5.0 across 256 reviews. Lightly trimmed for length only.
const reviews: Review[] = [
  {
    name: "Caitlyn Freeland",
    quote:
      "Obsessed with these snacks. Haven't found any products that compare. I suspect I'm their most loyal client, lol.",
  },
  {
    name: "Sandra S.",
    quote:
      "This is seriously the best chilli! It's not super hot but enough to notice, and we put it on absolutely everything — eggs, bread, veggies, meat. You really need to get yourself some!",
  },
  {
    name: "Elisha",
    quote:
      "Obsessed with their Crispy Chilli & Candied Garlic. Perfect level of spice for someone like me — a chilli oil rookie — balanced with a sweet, garlicky taste I haven't been able to find in any chilli oil since.",
  },
  {
    name: "Anita Mason",
    quote:
      "I love the Palmiettes de Croissant with Cinnamon — absolutely delicious. The delicate crunchy texture is just so more-ish, and the crispy chilli is divine. Sensational!",
  },
  {
    name: "Veronica Gillmer",
    quote:
      "I tried Ricci's crispy chilli with candied garlic at the Melbourne Makers market and I've been a big fan since. I put it on almost everything — not too spicy, not too sweet and never overpowering.",
  },
  {
    name: "Dayna Spuur",
    quote:
      "A family business whose quality speaks volumes. All three sauces are absolutely delicious, versatile and taste amazing — crispy chilli on eggs and avo, and anything in between.",
  },
];

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`} aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-4 h-4 fill-[#e0a92e]"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.98 21.98 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perPage, setPerPage] = useState(3);
  const count = reviews.length;
  const maxIndex = Math.max(0, count - perPage);

  useEffect(() => {
    const tablet = window.matchMedia("(max-width: 1024px)");
    const mobile = window.matchMedia("(max-width: 640px)");
    const update = () => setPerPage(mobile.matches ? 1 : tablet.matches ? 2 : 3);
    update();
    tablet.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      tablet.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  const go = useCallback(
    (next: number) => setIndex(Math.min(Math.max(next, 0), maxIndex)),
    [maxIndex],
  );

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
      6000,
    );
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  return (
    <section className="py-32 border-t border-line">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-end mb-16">
        <div>
          <div className="text-mono mb-6">Kind Words</div>
          <h2 className="text-lg max-w-[14ch]">Loved across the Valley & beyond.</h2>
        </div>

        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border border-line px-6 py-4 no-underline text-text-main transition-colors duration-300 hover:bg-surface self-start md:self-auto"
        >
          <GoogleG className="w-7 h-7" />
          <span className="flex flex-col">
            <span className="flex items-center gap-2">
              <span className="font-display text-[1.75rem] leading-none">5.0</span>
              <Stars />
            </span>
            <span className="text-mono mt-1">256 Google reviews</span>
          </span>
        </a>
      </div>

      {/* Carousel */}
      <div
        className="relative border border-line bg-surface/40"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="group"
        aria-roledescription="carousel"
        aria-label="Customer reviews"
      >
        <div className="overflow-hidden p-4 md:p-6">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
            style={{ transform: `translateX(-${index * (100 / perPage)}%)` }}
          >
            {reviews.map((review, i) => (
              <div
                key={review.name + i}
                className="shrink-0 px-3 md:px-4"
                style={{ flexBasis: `${100 / perPage}%` }}
              >
                <figure className="h-full flex flex-col gap-6 border border-line bg-bg/50 p-8 min-h-[20rem]">
                  <div className="flex items-center justify-between">
                    <Stars />
                    <GoogleG className="w-5 h-5 opacity-80" />
                  </div>
                  <blockquote className="serif text-[1.35rem] leading-[1.4] opacity-90">
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-2">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-bg font-display text-[1.1rem] leading-none shrink-0">
                      {review.name.charAt(0)}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm normal-case tracking-normal font-medium">
                        {review.name}
                      </span>
                      <span className="text-mono">Google review</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous review"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-line bg-bg/70 backdrop-blur-sm text-text-main cursor-pointer transition-colors duration-300 hover:bg-text-main hover:text-bg"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next review"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-line bg-bg/70 backdrop-blur-sm text-text-main cursor-pointer transition-colors duration-300 hover:bg-text-main hover:text-bg"
        >
          ›
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 pb-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === index ? "w-6 bg-accent" : "w-2 bg-muted hover:bg-text-main/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
