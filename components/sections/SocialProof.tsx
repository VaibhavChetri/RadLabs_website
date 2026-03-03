import { Marquee } from '@/components/ui/Marquee';
import { getMockSocialProof, adaptSocialProof } from '@/data/adapters';
import { SocialProofClient } from './SocialProofClient';
import { use } from 'react';

export function SocialProof() {
    // Using React 19's `use` or async component pattern. Since it's a Server Component by default, 
    // we can just await the fetcher. But Next.js app router server components allow direct async.

    // Actually, Server Components need to be marked async natively if we await:
    return <SocialProofAsync />;
}

async function SocialProofAsync() {
    const response = await getMockSocialProof();
    const items = adaptSocialProof(response);

    return (
        <section
            id="social-proof"
            className="w-full py-6 relative z-50 overflow-hidden mix-blend-difference"
        >
            <SocialProofClient>
                {/* Extremely subtle hairline top/bottom borders that won't ruin the inversion */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/10" />
                <Marquee speed={40} pauseOnHover>
                    {items.map((item, index) => (
                        <div key={item.id} className="flex items-center space-x-12">
                            <span className="font-mono text-sm tracking-widest text-white uppercase">
                                {item.text}
                            </span>
                            <span className="text-[var(--color-fire-neon)] text-xs">◆</span>
                        </div>
                    ))}
                </Marquee>
            </SocialProofClient>
        </section>
    );
}
