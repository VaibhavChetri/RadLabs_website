import React from 'react';
import { cn } from '@/lib/utils';
import { ProcessStep } from '@/types';
import * as Icons from 'lucide-react';

interface ProcessGraphNodeProps {
    step: ProcessStep;
    index: number;
    total: number;
}

export function ProcessGraphNode({ step, index, total }: ProcessGraphNodeProps) {
    const isLast = index === total - 1;

    // Map step to an icon (Discover -> Search, Design -> PenTool, Build -> Code, Deliver -> Rocket)
    const iconMap: Record<string, string> = {
        'discover': 'Search',
        'design': 'PenTool',
        'build': 'Code2',
        'deliver': 'Rocket'
    };

    const iconComponentName = iconMap[step.slug] || 'CircleDot';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (Icons as any)[iconComponentName] || Icons.CircleDot;

    return (
        <div className="process-graph-node relative flex-1 min-w-[280px] md:min-w-[400px] flex flex-col items-start px-4 md:px-8 group">

            {/* Top Node & Line Area */}
            <div className="relative w-full mb-4 md:mb-8">
                {/* Connecting line to next node */}
                {!isLast && (
                    <div className="absolute top-1/2 left-[30px] w-[calc(100%+32px)] h-[1px] -translate-y-1/2 bg-white/10 overflow-hidden">
                        <div className="process-line-progress w-full h-full bg-[var(--color-fire-neon)]/50 origin-left scale-x-0" />
                    </div>
                )}

                {/* Node Circle */}
                <div className="process-circle relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-[#111] flex items-center justify-center transition-all duration-500 group-hover:border-[var(--color-fire-neon)] group-hover:bg-[#1a1a1a] shadow-[0_0_0_transparent] group-hover:shadow-[0_0_20px_rgba(255,51,51,0.2)]">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-[var(--color-fire-neon)] transition-colors duration-500" />
                    {/* Pulsing ring on hover */}
                    <div className="absolute inset-[-4px] rounded-full border border-[var(--color-fire-neon)] opacity-0 scale-110 group-hover:animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                </div>
            </div>

            {/* Dashboard Card Content */}
            <div className="process-card w-full p-5 md:p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md transition-all duration-500 group-hover:bg-[#111] group-hover:border-white/10 group-hover:-translate-y-2">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="font-mono text-xs tracking-widest text-[var(--color-fire-neon)]">PHASE {step.phase}</span>
                    <div className="w-8 h-[1px] bg-white/10" />
                </div>
                <h4 className="text-lg md:text-xl font-sans font-medium text-white mb-2 md:mb-3 tracking-tight">{step.title}</h4>
                <p className="text-sm text-[#888888] leading-relaxed group-hover:text-[#aaaaaa] transition-colors">{step.description}</p>

                {/* Fake dashboard metric / UI element for visual flair */}
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/5 flex items-end gap-2 h-12 opacity-50 group-hover:opacity-100 transition-opacity">
                    {[40, 70, 45, 90, 60, 100].map((h, i) => (
                        <div
                            key={i}
                            className="w-full bg-[var(--color-fire-neon)]/20 group-hover:bg-[var(--color-fire-neon)] transition-all duration-700"
                            style={{
                                height: `${h}%`,
                                transitionDelay: `${i * 50}ms`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
