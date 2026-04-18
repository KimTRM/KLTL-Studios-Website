"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/app/globals.css";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="main-header">
            <Link href="/" className="brand-link" aria-label="Go to homepage">
                <Image
                    src="/res/icon/Icon.svg"
                    width={160}
                    height={72}
                    alt="KLTL Studios Logo"
                    className="logo"
                />
            </Link>
            <button
                className="hamburger"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
            >
                &#9776;
            </button>
            <nav className={`header-nav${open ? " open" : ""}`}>
                <Link href="/" className="header-link" onClick={() => setOpen(false)}>
                    Home
                </Link>
                <Link href="/about" className="header-link" onClick={() => setOpen(false)}>
                    About
                </Link>
                <Link href="/projects" className="header-link" onClick={() => setOpen(false)}>
                    Projects
                </Link>
            </nav>
        </header >
    );
}
