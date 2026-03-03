import { getMockTechStack } from '@/data/adapters';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechCategoryCard } from '@/components/ui/TechCategoryCard';
import { TechStackClient } from './TechStackClient';
import { adaptTechStack } from '@/data/adapters';

export async function TechStack() {
    const response = await getMockTechStack();
    const techCategories = adaptTechStack(response);

    return (
        <section id="tech-stack" className="w-full min-h-screen py-32 bg-[var(--color-brand-black)] px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_top_right,var(--color-fire-deep)_0%,transparent_50%)] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeader
                    eyebrow="06 — TECH STACK"
                    headline="Built on Modern\nFoundations"
                    highlightWords={['Modern', 'Foundations']}
                />

                <TechStackClient>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">

                        {/* Intro Card (Spans 2 rows on Desktop) */}
                        <div className="tech-card group relative lg:col-span-1 lg:row-span-2 p-8 md:p-12 border border-white/5 bg-[#030303] rounded-2xl overflow-hidden flex flex-col justify-end min-h-[400px]">
                            {/* Deep Matrix Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,51,51,0.1),transparent_50%)]" />
                            <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-10 transition-opacity duration-700 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                            <div className="relative z-10 w-14 h-14 rounded-xl mb-10 border border-[var(--color-fire-neon)]/50 bg-[#0A0A0A] flex items-center justify-center shadow-[0_0_20px_rgba(255,51,51,0.15)] group-hover:shadow-[0_0_40px_rgba(255,51,51,0.4)] transition-all duration-500 transform group-hover:-translate-y-2">
                                <div className="absolute inset-0 bg-[var(--color-fire-neon)] opacity-10 group-hover:opacity-20 transition-opacity rounded-xl" />
                                <svg className="w-6 h-6 text-[var(--color-fire-neon)] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>

                            <h3 className="relative z-10 text-3xl md:text-4xl font-serif text-white mb-6 leading-tight group-hover:text-[var(--color-fire-neon)] transition-colors duration-500">
                                Top-tier technology,<br />handpicked for every engagement.
                            </h3>
                            <p className="relative z-10 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed group-hover:text-white transition-colors duration-500">
                                We refuse to lock you into legacy systems. Our architecture decisions prioritize velocity, scalar performance, and long-term maintainability.
                            </p>
                        </div>

                        {/* Dynamic Category Cards */}
                        {techCategories.map((category) => (
                            <TechCategoryCard
                                key={category.id}
                                category={category}
                                className="min-h-[200px]"
                            />
                        ))}

                    </div>
                </TechStackClient>
            </div>
        </section>
    );
}
