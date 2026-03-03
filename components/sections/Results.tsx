import { getMockMetrics } from '@/data/adapters';
import { MOCK_COMMITMENT_TEXT } from '@/data/mock/metrics';
import { Counter } from '@/components/ui/Counter';
import { adaptMetrics } from '@/data/adapters';

export async function Results() {
    const response = await getMockMetrics();
    const metrics = adaptMetrics(response);

    return (
        <section id="results" className="w-full bg-[var(--color-brand-black)] border-t border-[var(--color-border-subtle)]">
            <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row min-h-screen">

                {/* Left Side: Sticky Image / Atmosphere (40%) */}
                <div className="w-full lg:w-5/12 relative border-b lg:border-b-0 lg:border-r border-[var(--color-border-subtle)]">
                    <div className="sticky top-0 h-[50svh] lg:h-screen w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-black)] via-transparent to-[var(--color-brand-black)] z-10" />
                        <div className="absolute inset-0 bg-[var(--color-fire-deep)] mix-blend-multiply opacity-60 z-10" />

                        {/* The background visual */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-fire-neon)_0%,transparent_70%)] opacity-20" />

                        <div className="absolute top-1/2 -translate-y-1/2 left-8 lg:left-16 z-20 max-w-sm">
                            <h2 className="text-3xl md:text-4xl font-serif text-white">What Our Clients<br />Experience</h2>
                        </div>
                    </div>
                </div>

                {/* Right Side: Scrollable Metrics Content (60%) */}
                <div className="w-full lg:w-7/12 py-32 px-8 lg:px-24 flex flex-col justify-center">

                    <div className="space-y-32">
                        {metrics.map((metric) => (
                            <div key={metric.id} className="relative group">
                                {/* Visual Line Anchor */}
                                <div className="absolute -left-8 md:-left-16 top-8 w-4 h-[1px] bg-[var(--color-fire-neon)] opacity-30 group-hover:opacity-100 group-hover:w-8 md:group-hover:w-12 transition-all duration-300" />

                                <Counter
                                    target={metric.numericValue}
                                    suffix={metric.suffix}
                                    className="mb-6 block"
                                />
                                <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-text-primary)] mb-4">{metric.label}</h3>
                                <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-xl">
                                    {metric.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Commitment Banner */}
                    <div className="mt-32 p-8 md:p-12 border border-[var(--color-border-red)] bg-[#0A0A0A] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[var(--color-fire-core)]/5 opacity-50" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full border border-[var(--color-border-red)] flex items-center justify-center mb-6 bg-black/50">
                                <span className="text-[var(--color-fire-neon)] text-xl font-serif">"</span>
                            </div>
                            <blockquote className="font-sans text-xl md:text-2xl text-white leading-relaxed mb-6 font-medium">
                                {MOCK_COMMITMENT_TEXT}
                            </blockquote>
                            <div className="font-mono text-sm text-[var(--color-text-muted)] tracking-wider">
                                — RADLABS ENGINEERING STANDARDS
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
