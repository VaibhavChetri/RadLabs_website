import { Preloader } from '@/components/sections/Preloader';
import { Hero } from '@/components/sections/Hero';
import { SocialProof } from '@/components/sections/SocialProof';
import { Services } from '@/components/sections/Services';
import { Capabilities } from '@/components/sections/Capabilities';
import { Process } from '@/components/sections/Process';
import { WhyUs } from '@/components/sections/WhyUs';

import { TechStack } from '@/components/sections/TechStack';
import { Results } from '@/components/sections/Results';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <SocialProof />
      <Services />
      <Capabilities />
      <Process />
      <WhyUs />

      <TechStack />
      <Results />
      <Contact />
    </>
  );
}
