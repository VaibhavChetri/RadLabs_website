import { ContactClient } from './ContactClient';
import { MOCK_COMPANY_INFO, MOCK_CONTACT_ITEMS } from '@/data/mock/company';

export function Contact() {
    return (
        <section id="contact" className="w-full min-h-screen relative flex flex-col justify-center items-center py-32 overflow-hidden bg-black">
            {/* Background with parallax attachment */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed opacity-40 z-0 scale-105"
                style={{
                    // A placeholder atmospheric background using a dark tech gradient
                    backgroundImage: 'linear-gradient(to bottom right, #000000, #1a0505, #000000)',
                }}
            />

            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />

            <div className="max-w-7xl mx-auto px-8 relative z-10 w-full">

                <ContactClient email={MOCK_COMPANY_INFO.email}>
                    <div className="contact-animate opacity-0 font-mono text-sm tracking-[0.2em] text-[var(--color-fire-neon)] font-bold mb-8 text-center">
                        [ START A PROJECT ]
                    </div>

                    <h2 className="contact-animate opacity-0 text-5xl md:text-7xl lg:text-[100px] font-serif italic text-white text-center leading-none mb-16 tracking-tight">
                        Let's Build Something<br />Remarkable
                    </h2>

                    <div className="contact-animate opacity-0 flex justify-center">
                        <a
                            href={`mailto:${MOCK_COMPANY_INFO.email}`}
                            className="group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-6 bg-transparent border border-[var(--color-fire-neon)] overflow-hidden"
                        >
                            {/* Button Hover Fill */}
                            <div className="absolute inset-0 bg-[var(--color-fire-neon)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                            <span className="relative z-10 font-mono text-sm md:text-base tracking-[0.1em] uppercase text-white group-hover:text-black transition-colors duration-300">
                                Start a Conversation
                            </span>
                        </a>
                    </div>
                </ContactClient>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-32 relative z-10 max-w-5xl mx-auto border-t border-white/10 pt-16">
                    {MOCK_CONTACT_ITEMS.map((item) => (
                        <div key={item.id} className="flex flex-col items-center md:items-start text-center md:text-left">
                            <h4 className="font-mono text-[10px] md:text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
                                {item.label}
                            </h4>
                            {item.href === '#' ? (
                                <span className="text-[var(--color-text-secondary)] font-sans">{item.value}</span>
                            ) : (
                                <a
                                    href={item.href}
                                    className="text-white hover:text-[var(--color-fire-neon)] transition-colors duration-300 font-sans"
                                >
                                    {item.value}
                                </a>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
