import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      {/* 12-col grid matching original design */}
      <div className="wrapper grid-12 py-16">
        {/* Brand — cols 1–4 */}
        <div className="col-span-4 flex flex-col gap-4">
          <h4>
            <Logo className="text-[1.65rem]" />
          </h4>
          <p className="text-sm opacity-70">
            Artisan savoury biscuits crafted in the heart of the Yarra Valley,
            Melbourne.
          </p>
          <div className="text-mono mt-8">
            © {new Date().getFullYear()} Riccis Bikkies Pty Ltd
          </div>
        </div>

        {/* Shop links — cols 6–8 */}
        <div className="col-span-3 col-start-6 flex flex-col gap-2">
          <span className="text-mono mb-8">Shop</span>
          <Link href="/shop" className="no-underline text-text-main text-[0.85rem]">
            All Provisions
          </Link>
          <Link href="/shop" className="no-underline text-text-main text-[0.85rem]">
            Gift Boxes
          </Link>
          <Link href="/wholesale" className="no-underline text-text-main text-[0.85rem]">
            Wholesale
          </Link>
        </div>

        {/* Info links — cols 9–11 */}
        <div className="col-span-3 flex flex-col gap-2">
          <span className="text-mono mb-8">Information</span>
          <Link href="/#about" className="no-underline text-text-main text-[0.85rem]">
            About
          </Link>
          <Link href="/shop" className="no-underline text-text-main text-[0.85rem]">
            Shipping & Returns
          </Link>
          <Link href="/contact" className="no-underline text-text-main text-[0.85rem]">
            Contact Us
          </Link>
        </div>

        {/* Newsletter — cols 10–12 */}
        <div className="col-span-3 col-start-10">
          <span className="text-mono">The Larder Dispatch</span>
          <p className="text-sm mt-8 opacity-70">
            Join our mailing list for seasonal releases and cellar door events.
          </p>
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-transparent border-0 border-b border-text-main py-2 font-sans text-text-main outline-none mt-4 placeholder:text-line"
          />
        </div>
      </div>
    </footer>
  );
}
