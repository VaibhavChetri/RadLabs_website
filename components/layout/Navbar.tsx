'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MOCK_COMPANY_INFO } from '@/data/mock/company';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle scroll state for navbar compression and active section
    useEffect(() => {
        const handleScroll = () => {
            // Compress navbar after 50px
            setIsScrolled(window.scrollY > 50);

            // Simple intersection observer alternative for active section tracking
            const sections = ['services', 'capabilities', 'process', 'why-us', 'tech-stack', 'results', 'contact'];
            let current = '';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the top of the section is near the top of the viewport or passing it
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        current = section;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Capabilities', href: '#capabilities' },
        { name: 'Process', href: '#process' },
    ];

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 inset-x-0 z-50 transition-all duration-500',
                    isScrolled
                        ? 'py-4 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                        : 'py-8 bg-transparent border-b-transparent'
                )}
            >
                <div className="max-w-[1920px] mx-auto px-8 lg:px-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex flex-col items-start relative z-50"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="font-serif italic text-2xl lg:text-3xl text-white tracking-tight group-hover:text-[var(--color-fire-neon)] transition-colors duration-300">
                            {MOCK_COMPANY_INFO.name.split(' ')[0]}
                            <span className="text-[var(--color-fire-neon)]">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-mono tracking-widest uppercase transition-colors duration-300 relative py-2",
                                        isActive ? "text-white" : "text-[#888888] hover:text-white"
                                    )}
                                >
                                    {link.name}
                                    {/* Active Indicator Line */}
                                    <span
                                        className={cn(
                                            "absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-fire-neon)] transition-transform duration-300 origin-left",
                                            isActive ? "scale-x-100" : "scale-x-0"
                                        )}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Start Project CTA (Desktop) */}
                    <div className="hidden md:block">
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center px-6 py-2 border border-white/20 hover:border-[var(--color-fire-neon)] hover:bg-[var(--color-fire-core)]/20 transition-all duration-300"
                        >
                            <span className="font-mono text-xs tracking-widest uppercase text-white">Start Project</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 p-2 -mr-2 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <span className={cn("w-full h-[1px] bg-current transition-all duration-300", mobileMenuOpen ? "rotate-45 translate-y-[9px]" : "")} />
                            <span className={cn("w-full h-[1px] bg-current transition-all duration-300", mobileMenuOpen ? "opacity-0" : "")} />
                            <span className={cn("w-full h-[1px] bg-current transition-all duration-300", mobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : "")} />
                        </div>
                    </button>

                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-[#0A0A0A] z-40 md:hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out",
                    mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none delay-200"
                )}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-fire-core)_0%,transparent_70%)] opacity-10" />

                <nav className="flex flex-col items-center gap-8 relative z-10 w-full px-8">
                    {navLinks.map((link, idx) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                                "text-3xl font-serif text-white transition-all duration-500",
                                mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div
                        className={cn(
                            "mt-12 w-full max-w-xs transition-all duration-500",
                            mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                        style={{ transitionDelay: `${navLinks.length * 100}ms` }}
                    >
                        <Link
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-center w-full py-4 border border-[var(--color-fire-neon)] bg-[var(--color-fire-core)]/10 text-white font-mono text-sm tracking-widest uppercase"
                        >
                            Start Project
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
}
