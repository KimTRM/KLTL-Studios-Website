"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  // { name: "Skills", href: "/skills" },
  // { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node | null;
      if (!target) return;

      if (menuRef.current && (menuRef.current === target || menuRef.current.contains(target))) {
        // click inside menu: ignore
        return;
      }

      if (buttonRef.current && (buttonRef.current === target || buttonRef.current.contains(target))) {
        // click on toggle button: ignore
        return;
      }

      setOpen(false);
    }

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  return (
    <header className="sticky top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-neutral-900 transition-colors duration-300">
      <nav className="flex items-center justify-between h-19 main-header">
        <Link href="/" className="brand-link">
          <Image
            src="/res/icon/Icon.svg"
            width={160}
            height={72}
            alt="KLTL Studios Logo"
            className="logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <div ref={menuRef} className={`header-nav${open ? " open z-[9999]" : ""}`}>
          <ul className={`md:flex items-center space-x-9`}>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-semibold transition-colors tracking-wide",
                      isActive
                        ? "text-red-700 font-black"
                        : "text-neutral-500 hover:text-white"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>


        {/* Mobile menu could be added here, keeping minimal for now */}
        <div className="md:hidden flex items-center">
          {/* Minimal generic placeholder for mobile */}
          <button
            ref={buttonRef}
            className="hamburger"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
          >
            &#9776;
          </button>
        </div>
      </nav>
    </header >
  );
}
