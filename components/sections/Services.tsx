import { getMockServices, adaptServices } from '@/data/adapters';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ServicesClient } from './ServicesClient';

export async function Services() {
    const response = await getMockServices();
    const services = adaptServices(response);

    return (
        <section id="services" className="w-full min-h-screen py-32 px-8 bg-gradient-to-b from-[var(--color-brand-black)] to-[var(--color-brand-charcoal)]">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    eyebrow="01 — SERVICES"
                    headline="What We Build"
                    highlightWords={['Build']}
                />

                {/* 
          We split the layout into a CSS grid.
          Top row: 3 columns. Bottom row: 2 columns.
          We pass the generated cards to a Client Component wrapper 
          that handles the GSAP ScrollTrigger intersection observer logic.
        */}
                <ServicesClient>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                        {services.map((service, index) => {
                            // Create asymmetric bento grid:
                            // Index 0, 1, 2 = top row (span 1 each on lg)
                            // Index 3, 4 = bottom row (span 1.5 each on lg, simulated by grid placement)

                            let spanClass = "col-span-1";

                            // On desktop (lg), make the last two items stretch to fill the 3-column grid
                            if (index === 3) {
                                spanClass = "col-span-1 md:col-span-1 lg:col-span-2"; // 2/3 width
                            } else if (index === 4) {
                                spanClass = "col-span-1 md:col-span-2 lg:col-span-1"; // 1/3 width
                            }

                            return (
                                <Card
                                    key={service.id}
                                    index={index}
                                    title={service.title}
                                    description={service.shortDescription}
                                    iconName={service.icon}
                                    tags={service.tags}
                                    className={spanClass}
                                />
                            );
                        })}
                    </div>
                </ServicesClient>
            </div>
        </section>
    );
}
