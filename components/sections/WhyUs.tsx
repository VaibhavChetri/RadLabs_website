import { getMockValueProps } from '@/data/adapters';
import { WhyUsClient } from './WhyUsClient';
import { adaptValueProps } from '@/data/adapters';
import * as Icons from 'lucide-react';

export async function WhyUs() {
    const response = await getMockValueProps();
    const values = adaptValueProps(response);

    return (
        <section id="why-us" className="w-full min-h-screen py-16 md:py-32 bg-[#050505] relative overflow-hidden z-10">
            {/* Background animated noise/gradients */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-fire-core)] rounded-full mix-blend-screen filter blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[var(--color-fire-neon)] rounded-full mix-blend-screen filter blur-[150px] opacity-30" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-900 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center relative z-10">

                <div className="text-center mb-12 md:mb-24 relative">
                    <div className="font-mono text-xs md:text-sm tracking-[0.3em] text-[var(--color-fire-neon)] font-bold mb-4 md:mb-8 uppercase">
                        [ The Radlabs Difference ]
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-[110px] leading-[0.9] font-sans font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#666] tracking-tighter mix-blend-difference mb-4 relative inline-block">
                        WHY CHOOSE <br />
                        <span className="font-serif italic text-white font-normal tracking-normal relative inline-block mt-2 md:mt-4">
                            US?
                            {/* Decorative hand-drawn looking circle */}
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] text-[var(--color-fire-neon)] opacity-60 pointer-events-none -rotate-6" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <ellipse cx="50" cy="50" rx="48" ry="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                        </span>
                    </h2>
                </div>

                <WhyUsClient>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1440px]">
                        {values.map((val, i) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const iconComponentName = val.icon.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const Icon = (Icons as any)[iconComponentName] || Icons.Zap;

                            return (
                                <div
                                    key={val.id}
                                    className="why-card relative group z-10 w-full"
                                    style={{ perspective: '1200px' }}
                                >
                                    {/* The interactive card inner */}
                                    <div className="why-card-inner h-full w-full bg-[#111111]/40 backdrop-blur-2xl border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:bg-[#1a1a1a]/60 group-hover:border-[var(--color-fire-neon)]/30 group-hover:shadow-[0_20px_50px_rgba(255,51,51,0.1)] relative">

                                        {/* Glow effect that tracks mouse (handled in client) */}
                                        <div className="glow-follower absolute w-64 h-64 bg-[var(--color-fire-neon)] rounded-full filter blur-[100px] opacity-0 mix-blend-screen pointer-events-none transition-opacity duration-300 group-hover:opacity-30 -translate-x-1/2 -translate-y-1/2 left-0 top-0" />

                                        <div className="absolute top-6 right-6 md:top-8 md:right-8 text-[var(--color-fire-neon)] font-mono text-4xl md:text-6xl opacity-10 group-hover:opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 select-none pointer-events-none">
                                            0{i + 1}
                                        </div>

                                        <div className="relative z-10 mt-10 md:mt-24 pointer-events-none">
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[var(--color-fire-core)] to-black border border-[var(--color-fire-neon)]/50 flex items-center justify-center mb-5 md:mb-8 shadow-[0_0_30px_rgba(255,51,51,0.2)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                                <Icon className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-[var(--color-fire-neon)] transition-colors duration-500" />
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 md:mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--color-fire-neon)] transition-all duration-500">
                                                {val.title}
                                            </h3>
                                            <p className="text-[#888888] text-base md:text-lg leading-relaxed group-hover:text-white/80 transition-colors duration-500 font-sans">
                                                {val.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </WhyUsClient>
            </div>
        </section>
    );
}
