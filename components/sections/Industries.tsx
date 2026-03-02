import { getMockIndustries } from '@/data/adapters';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IndustryCard } from '@/components/ui/IndustryCard';
import { IndustriesClient } from './IndustriesClient';
import { adaptIndustries } from '@/data/adapters';

export async function Industries() {
    const response = await getMockIndustries();
    const industries = adaptIndustries(response);

    return (
        <section id="industries" className="w-full min-h-screen py-32 bg-[var(--color-brand-black)] border-y border-[var(--color-border-subtle)]">
            <div className="max-w-[1920px] mx-auto">
                <div className="px-8 lg:px-16 mb-16 w-full">
                    <SectionHeader
                        eyebrow="05 — INDUSTRIES"
                        headline="Domain Expertise"
                        highlightWords={['Domain']}
                    />
                </div>

                {/* Full bleed 4-column grid */}
                <IndustriesClient>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full">
                        {industries.map((industry, index) => (
                            <IndustryCard
                                key={industry.id}
                                industry={industry}
                                index={index}
                            />
                        ))}
                    </div>
                </IndustriesClient>
            </div>
        </section>
    );
}
