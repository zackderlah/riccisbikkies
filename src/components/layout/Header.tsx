"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import AnimatedLogo from "./AnimatedLogo";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-bg shadow-[0_1px_20px_rgba(56,34,24,0.06)]"
          : "mix-blend-multiply"
      }`}
    >
      <div className="wrapper py-6 flex justify-between items-center">
        <Link
          href="/"
          aria-label="riccis bikkies — home"
          className="group font-display text-[1.75rem] font-semibold text-text-main no-underline tracking-[-0.01em]"
        >
          <AnimatedLogo text="riccis bikkies" />
        </Link>

        <nav className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`no-underline text-text-main text-[0.8rem] uppercase tracking-[0.05em] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-text-main after:transition-all after:duration-300 after:ease-[cubic-bezier(0.215,0.61,0.355,1)] hover:after:w-full ${
                pathname === link.href ? "after:w-full" : "after:w-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="md:hidden bg-transparent border border-line px-4 py-2 rounded-[20px] no-underline font-sans text-[0.75rem] uppercase tracking-[0.05em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-bg"
          >
            Shop
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            className="flex items-center gap-2 bg-transparent border border-line px-4 py-2 rounded-[20px] cursor-pointer font-sans text-[0.75rem] uppercase tracking-[0.05em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-bg"
          >
            Cart [{count}]
          </button>
        </div>
      </div>
    </header>
  );
}
