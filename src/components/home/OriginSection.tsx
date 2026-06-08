export default function OriginSection() {
  const stats = [
    { label: "Baking Since", value: "2003" },
    { label: "Made", value: "By Hand" },
    { label: "Family Run", value: "100%" },
    { label: "Additives", value: "None" },
  ];

  return (
    <section
      id="about"
      className="grid-12 py-32 border-t border-line scroll-mt-24"
    >
      {/* Text — cols 3–7 */}
      <div className="col-span-5 col-start-3">
        <div className="text-mono mb-6">About Us</div>
        <h2 className="text-md mb-8">Simple ingredients, done well.</h2>
        <p className="text-lg serif leading-[1.2] opacity-90">
          In the heart of Victoria&apos;s Yarra Valley, surrounded by wineries
          and good food, sits a little mud brick home — the heart of Ricci&apos;s
          Bikkies. We&apos;ve been baking our gourmet pita crisps by hand for
          over 22 years, using locally sourced ingredients and keeping things as
          sustainable as possible.
        </p>
        <p className="mt-6 leading-[1.6] opacity-80">
          What began in 2003, when a young mum started experimenting in her
          kitchen with hand-made pita crisps free from additives and
          preservatives, is now a proudly family-run company. That original
          recipe still sits at the heart of everything we make.
        </p>
        <div className="mt-8 text-mono">— With thanks, Ricci &amp; Ross</div>
      </div>

      {/* Stats — cols 9–12, 2×2 grid */}
      <div className="col-span-4 col-start-9 grid grid-cols-2 gap-8 content-start">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 border-b border-line pb-4">
            <span className="text-mono">{stat.label}</span>
            <span className="font-display text-[2.5rem] text-accent leading-none">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
