import { getMockCapabilities } from '@/data/adapters';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CoreServiceCard } from '@/components/ui/CoreServiceCard';
import { CoreServicesGrid } from '@/components/ui/CoreServicesGrid';
import { GlowOrb } from '@/components/effects/GlowOrb';
import { CapabilitiesClient } from './CapabilitiesClient';
import { MOCK_FEATURE_BADGES } from '@/data/mock/capabilities';
import { adaptCapabilities } from '@/data/adapters';

export async function Capabilities() {
    const response = await getMockCapabilities();
    const capabilities = adaptCapabilities(response);

    return (
        <section id="capabilities" className="w-full min-h-screen py-32 px-8 bg-[var(--color-brand-charcoal)] relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">

                <SectionHeader
                    eyebrow="02 — CAPABILITIES"
                    headline="Intelligent Systems,\nNot Just Models"
                    highlightWords={['Systems,', 'Models']}
                />

                <CapabilitiesClient>
                    {/* Left Column: Visualization */}
                    <div className="w-full md:w-1/2 min-h-[400px] md:min-h-0 relative flex items-center justify-center border border-[var(--color-border-subtle)] bg-black/20 rounded-sm overflow-hidden">
                        <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(circle_at_center,var(--color-fire-deep)_0%,transparent_70%)]" />
                        <GlowOrb />
                    </div>

                    {/* Right Column: Text Items */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center py-8 capability-text-column">
                        <div className="space-y-12">
                            {capabilities.map((cap, idx) => (
                                <div key={cap.id} className="capability-item relative pl-8 group">
                                    {/* Arrow prefix */}
                                    <div className="absolute left-0 top-1 text-[var(--color-fire-neon)] font-mono text-sm group-hover:translate-x-1 transition-transform">
                                        →
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif text-[var(--color-text-primary)] mb-3">
                                        {cap.title}
                                    </h3>
                                    <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed max-w-md">
                                        {cap.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CapabilitiesClient>

                {/* Bottom Row: Core Service Diagram Cards */}
                <div className="mt-24 pt-16 border-t border-[var(--color-border-subtle)]">
                    <CoreServicesGrid>
                        {MOCK_FEATURE_BADGES.map((badge, idx) => (
                            <CoreServiceCard
                                key={badge.id}
                                index={idx}
                                label={badge.label}
                                iconName={badge.icon}
                            />
                        ))}
                    </CoreServicesGrid>
                </div>

            </div>
        </section>
    );
}
