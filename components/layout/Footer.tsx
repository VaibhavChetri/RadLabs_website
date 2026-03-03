import React from 'react';
import Link from 'next/link';
import { MOCK_COMPANY_INFO } from '@/data/mock/company';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    // Map platform names to lucide icons
    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'linkedin': return <Linkedin className="w-6 h-6" />;
            case 'twitter': return <Twitter className="w-6 h-6" />;
            case 'instagram': return <Instagram className="w-6 h-6" />;
            default: return null;
        }
    };

    return (
        <footer className="w-full bg-[var(--color-bg-elevated)] border-t border-[var(--color-border-subtle)] text-[#888888] py-16 px-8 lg:px-16" role="contentinfo">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

                {/* Brand Column (Span 4) */}
                <div className="md:col-span-4 flex flex-col items-start pr-8">
                    <div className="text-2xl font-serif text-white italic tracking-tight mb-4">
                        {MOCK_COMPANY_INFO.name}
                    </div>
                    <p className="font-sans text-sm leading-relaxed mb-8 max-w-sm">
                        {MOCK_COMPANY_INFO.mission}
                    </p>
                    <div className="font-mono text-xs text-[var(--color-fire-neon)] tracking-[0.2em]">
                        {MOCK_COMPANY_INFO.tagline.toUpperCase()}
                    </div>
                </div>

                {/* Quick Links (Span 2) */}
                <div className="md:col-span-2 flex flex-col">
                    <h4 className="font-mono text-[10px] tracking-widest text-[#555555] uppercase mb-6">Explore</h4>
                    <nav className="flex flex-col space-y-4">
                        <Link href="#services" className="text-sm hover:text-white transition-colors duration-300">Services</Link>
                        <Link href="#capabilities" className="text-sm hover:text-white transition-colors duration-300">Capabilities</Link>
                        <Link href="#process" className="text-sm hover:text-white transition-colors duration-300">Process</Link>
                        <Link href="#industries" className="text-sm hover:text-white transition-colors duration-300">Industries</Link>
                    </nav>
                </div>

                {/* Legal & Socials (Span 3) */}
                <div className="md:col-span-3 flex flex-col">
                    <h4 className="font-mono text-[10px] tracking-widest text-[#555555] uppercase mb-6">Connect</h4>
                    <div className="flex flex-row space-x-6 mb-12">
                        {MOCK_COMPANY_INFO.socialLinks.map((social) => (
                            <a
                                key={social.id}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-[var(--color-fire-neon)] hover:scale-110 transition-all duration-300 flex items-center justify-center p-2 rounded-full border border-white/10 hover:border-[var(--color-fire-neon)]/50"
                                aria-label={social.platform}
                            >
                                {getSocialIcon(social.platform)}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Start Project CTA (Span 3) */}
                <div className="md:col-span-3 flex flex-col lg:items-end">
                    <div className="p-8 border border-[var(--color-border-subtle)] bg-black/50 text-center w-full lg:max-w-[280px]">
                        <h4 className="font-serif text-lg text-white mb-4">Ready to start?</h4>
                        <a
                            href={`mailto:${MOCK_COMPANY_INFO.email}`}
                            className="font-mono text-xs tracking-widest text-[var(--color-fire-neon)] hover:text-white transition-colors duration-300 block mb-6"
                        >
                            {MOCK_COMPANY_INFO.email}
                        </a>
                        <a
                            href="#contact"
                            className="inline-block border border-[var(--color-border-red)] text-white font-mono text-xs uppercase tracking-widest py-3 px-6 hover:bg-[var(--color-fire-core)] hover:border-[var(--color-fire-neon)] transition-all duration-300 w-full"
                        >
                            Book Intro
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="max-w-[1920px] mx-auto mt-24 pt-8 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="font-mono text-[10px] tracking-widest text-[#555555]">
                    © {currentYear} {MOCK_COMPANY_INFO.name}. All rights reserved.
                </div>
                <div className="flex space-x-6">
                    <Link href="/privacy" className="font-mono text-[10px] tracking-widest hover:text-white transition-colors duration-300">Privacy Policy</Link>
                    <Link href="/terms" className="font-mono text-[10px] tracking-widest hover:text-white transition-colors duration-300">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
