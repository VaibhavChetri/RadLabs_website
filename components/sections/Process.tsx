import { getMockProcessSteps } from '@/data/adapters';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProcessGraphNode } from '@/components/ui/ProcessGraphNode';
import { ProcessClient } from './ProcessClient';
import { adaptProcessSteps } from '@/data/adapters';

export async function Process() {
    const response = await getMockProcessSteps();
    const steps = adaptProcessSteps(response);

    return (
        <section id="process" className="w-full relative">
            <ProcessClient
                header={
                    <SectionHeader
                        eyebrow="03 — APPROACH"
                        headline={"End-to-End\nEngineering"}
                        highlightWords={['Engineering']}
                        className="!mb-0"
                    />
                }
            >
                {/* The timeline items injected into the flex container in ProcessClient */}
                {steps.map((step, index) => (
                    <ProcessGraphNode key={step.id} step={step} index={index} total={steps.length} />
                ))}
            </ProcessClient>
        </section>
    );
}
