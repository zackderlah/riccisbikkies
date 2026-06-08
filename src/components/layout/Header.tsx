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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleOpenCart = () => {
    closeMenu();
    openCart();
  };

  const solidHeader = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          solidHeader
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
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
              className="hidden md:flex items-center gap-2 bg-transparent border border-line px-4 py-2 rounded-[20px] cursor-pointer font-sans text-[0.75rem] uppercase tracking-[0.05em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-bg"
            >
              Cart [{count}]
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] cursor-pointer"
            >
              <span
                className={`block w-6 h-px bg-text-main transition-all duration-300 origin-center ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-text-main transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-text-main transition-all duration-300 origin-center ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[99] md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-text-main/30 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className={`absolute top-0 right-0 h-full w-full max-w-[320px] bg-bg border-l border-line flex flex-col pt-24 px-8 gap-2 transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`no-underline serif text-[1.75rem] py-3 border-b border-line transition-opacity hover:opacity-60 ${
                pathname === link.href ? "opacity-100" : "opacity-80"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={handleOpenCart}
            className="mt-4 flex items-center justify-between w-full bg-transparent border border-line px-4 py-3 rounded-[20px] cursor-pointer font-sans text-[0.75rem] uppercase tracking-[0.05em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-bg"
          >
            Cart
            <span className="font-mono">[{count}]</span>
          </button>
        </nav>
      </div>
    </>
  );
}
