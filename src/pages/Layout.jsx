
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Menu, X } from "lucide-react";

export default function Layout({ children }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "Home" },
        { name: "Gallery", href: "Home", section: "#gallery" },
        { name: "About", href: "Home", section: "#about" },
        { name: "Contact", href: "Home", section: "#contact" },
    ];

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap');
                
                body {
                    font-family: 'Inter', sans-serif;
                }
                
                .font-display {
                    font-family: 'Playfair Display', serif;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: #c9a962;
                    transition: width 0.3s ease;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                }
            `}</style>

            {/* Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
                        : "bg-transparent py-6"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            to={createPageUrl("Home")}
                            className="group flex items-center gap-3"
                        >
                            <span
                                className={`font-display text-2xl tracking-wide transition-colors duration-300 ${
                                    scrolled ? "text-[#1a1a1a]" : "text-white"
                                }`}
                            >
                                Lumière
                            </span>
                            <span
                                className={`text-xs tracking-[0.3em] uppercase transition-colors duration-300 ${
                                    scrolled ? "text-[#c9a962]" : "text-white/70"
                                }`}
                            >
                                Photography
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.section || "#"}
                                    onClick={(e) => {
                                        if (link.section) {
                                            e.preventDefault();
                                            document.querySelector(link.section)?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                        }
                                    }}
                                    className={`nav-link relative text-sm tracking-wide uppercase transition-colors duration-300 ${
                                        scrolled
                                            ? "text-[#1a1a1a] hover:text-[#c9a962]"
                                            : "text-white/90 hover:text-white"
                                    }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`md:hidden p-2 transition-colors ${
                                scrolled ? "text-[#1a1a1a]" : "text-white"
                            }`}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
                        mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-6 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.section || "#"}
                                onClick={(e) => {
                                    setMobileMenuOpen(false);
                                    if (link.section) {
                                        e.preventDefault();
                                        setTimeout(() => {
                                            document.querySelector(link.section)?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                        }, 300);
                                    }
                                }}
                                className="block text-sm tracking-wide uppercase text-[#1a1a1a] hover:text-[#c9a962] transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="font-display text-2xl mb-2">Lumière</h3>
                            <p className="text-white/50 text-sm tracking-wide">
                                Capturing moments, creating memories
                            </p>
                        </div>
                        <div className="flex items-center gap-8">
                            <a href="#" className="text-white/50 hover:text-[#c9a962] transition-colors text-sm">
                                Instagram
                            </a>
                            <a href="#" className="text-white/50 hover:text-[#c9a962] transition-colors text-sm">
                                Behance
                            </a>
                            <a href="#" className="text-white/50 hover:text-[#c9a962] transition-colors text-sm">
                                Dribbble
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/10 text-center">
                        <p className="text-white/30 text-xs tracking-wide">
                            © 2024 Lumière Photography. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
