# RADLABS TECHNOLOGIES — AWARD-WINNING WEBSITE BUILD PROMPT
## Master Production Prompt for AI Code Agents (Codex / Claude Code / Anti-Gravity)

---

## 0. ROLE & OBJECTIVE

You are an elite frontend engineer and creative director building an Awwwards-calibre corporate website for **Radlabs Technologies** — an AI-first technology studio. The site must score ≥ 8.5 across Awwwards criteria: **Design, Usability, Creativity, Content**. Every pixel, every transition, every interaction must feel intentional, premium, and cinematic.

The final deliverable is a **single-page scrollytelling experience** with distinct narrative sections, built in **Next.js 14+ (App Router) + Tailwind CSS + GSAP (with ScrollTrigger & SplitText)**, using the Lenis smooth-scroll library for buttery viewport movement.

---

## 1. BRAND IDENTITY & DESIGN DNA

### 1.1 Core Identity
- **Company**: Radlabs Technologies
- **Tagline**: "AI Partners. Limitless Vision."
- **Extended Tagline**: "Inspiring Creativity"
- **Mission**: "Blending creativity, engineering & innovation to build intelligent solutions that accelerate modern business growth"
- **Website**: radlabs.tech
- **Email**: sales@radlabs.tech
- **Phone**: +91 690-126-1005 / +91 863-870-2710
- **HQ**: Available Globally

### 1.2 Color System (Extracted from Brochure)
```css
:root {
  /* ── Core Darks ── */
  --bg-void:        #050505;      /* True black canvas — dominant background */
  --bg-surface:     #0A0A0A;      /* Elevated surface cards */
  --bg-elevated:    #111111;      /* Navbar, footer, modal backgrounds */
  --bg-card:        #1A1A1A;      /* Card interiors */

  /* ── Radlabs Fire (Primary Accent) ── */
  --fire-deep:      #6B0F0F;      /* Darkest red — subtle backgrounds */
  --fire-core:      #8B1A1A;      /* Deep crimson — card backgrounds from brochure */
  --fire-brand:     #C62828;      /* Primary brand red — the logo red */
  --fire-bright:    #E53935;      /* Hover states, active elements */
  --fire-neon:      #FF1744;      /* Glow accents, CTA pulses, highlights */

  /* ── Text Hierarchy ── */
  --text-primary:   #F5E6D3;      /* Warm cream — headlines (matches brochure headlines) */
  --text-secondary: #B0A090;      /* Muted warm gray — body copy */
  --text-muted:     #6B6B6B;      /* De-emphasized, labels */
  --text-white:     #FFFFFF;      /* Pure white for high-contrast moments */

  /* ── Functional ── */
  --glow-red:       rgba(255, 23, 68, 0.4);   /* Box-shadow / text-shadow glow */
  --glow-red-soft:  rgba(198, 40, 40, 0.15);  /* Subtle ambient glow */
  --border-subtle:  rgba(255, 255, 255, 0.06); /* Hairline borders */
  --border-red:     rgba(198, 40, 40, 0.3);   /* Red border accents (brochure cards) */
}
```

### 1.3 Typography System
```
Display / Hero:        "Instrument Serif" or "Playfair Display" — italic for hero headlines
Headlines (H1-H3):    "Space Grotesk" weight 700 — bold, geometric, techy  
                       ↳ ALTERNATIVE: "Syne" or "Clash Display" for extra edge
Body / UI:             "IBM Plex Mono" weight 400 — monospaced, technical credibility
Labels / Tags:         "JetBrains Mono" weight 500 — uppercase, letter-spaced 0.15em
CTA Buttons:           "Space Grotesk" weight 600 — uppercase, 0.1em letter-spacing
```
> **Typography Note**: Headlines use the warm cream `#F5E6D3`. Body uses `#B0A090`. Labels use `#6B6B6B` with monospace. This matches the brochure's cream-on-dark aesthetic exactly.

### 1.4 Logo
The Radlabs logo is a **circular badge** with:
- White/cream outer ring with "RAD LABS" text curved around top
- Inner gold/ochre band with "INSPIRING CREATIVITY" curved around bottom
- Center: white flame icon on deep red background
- Use the uploaded logo file. Render at 40px height in navbar, 80px in footer.

---

## 2. GLOBAL DESIGN SYSTEM

### 2.1 Layout Architecture
- **Max content width**: 1440px, centered
- **Grid**: CSS Grid with 12-column layout, 24px gutter
- **Section padding**: 160px vertical (desktop), 80px (mobile)
- **Bento Grid**: Used for Services, Tech Stack, and Industries sections — asymmetric card grids with varied span sizes (2-col, 3-col mixed)
- **Card system**: `border: 1px solid var(--border-red)` on dark `var(--bg-card)` backgrounds — directly from the brochure's card style

### 2.2 Recurring Visual Motifs
1. **Red glow halos**: Soft radial gradients behind key elements (`background: radial-gradient(ellipse, var(--glow-red-soft) 0%, transparent 70%)`)
2. **Grain overlay**: Full-viewport `<canvas>` or CSS noise texture at 3-5% opacity for film-like depth
3. **Grid lines**: Faint vertical and horizontal ruled lines at ~4% opacity across the background (like engineering paper)
4. **Particle field**: Subtle floating red particles (use canvas or CSS animations, ~20 particles) that drift slowly across the hero
5. **Red scan line**: A thin horizontal neon red line that occasionally sweeps vertically on scroll
6. **Card hover states**: On hover, cards gain `box-shadow: 0 0 30px var(--glow-red-soft)` and `border-color: var(--fire-bright)` with 0.3s ease transition

### 2.3 Micro-interactions
- **Buttons**: Neon red glow pulse on hover (`@keyframes pulse-glow`). On click, glow compresses then expands.
- **Links**: Underline draws left-to-right on hover using `::after` pseudo-element with `scaleX` transition.
- **Cards**: Subtle 2-4px `translateY` lift + glow intensification on hover.
- **Cursor**: Custom cursor — small red dot with trailing glow (CSS `mix-blend-mode: difference` or canvas implementation).
- **Magnetic effect**: CTAs and nav links should have a subtle magnetic pull when cursor is within 100px radius (GSAP).

---

## 3. SECTION-BY-SECTION SPECIFICATION

### SECTION 0: PRELOADER
**Duration**: 1.5–2s on first load
**Behavior**:
- Black screen with Radlabs flame logo centered, pulsing red glow
- Text: "RADLABS" splits letter by letter (SplitText animation)
- Progress bar: thin neon red line grows from left to right
- On complete: screen wipes up or dissolves into hero section
- Preloader should only appear on initial visit (use sessionStorage flag)

---

### SECTION 1: NAVIGATION (Fixed/Sticky)
**Layout**: Full-width, fixed top, `backdrop-filter: blur(12px)` with `background: rgba(5,5,5,0.7)`
**Left**: Radlabs logo (flame badge, 40px)
**Center**: Nav links — `Services` | `Capabilities` | `Industries` | `Stack` | `Results` | `Contact`
**Right**: Primary CTA button — "Let's Build" with neon red glow border

**Behavior**:
- On scroll down > 100px: navbar compresses (py reduces from 24px to 12px), background opacity increases
- On scroll up: navbar reappears with slide-down animation
- Nav links: monospaced `JetBrains Mono`, uppercase, 0.1em letter-spacing, `--text-muted` → `--text-primary` on hover
- Active section indicator: thin red underline follows the current viewport section
- Mobile: hamburger icon → full-screen overlay menu with staggered link reveals

---

### SECTION 2: HERO
**Layout**: Full viewport height (100vh), flexbox centered

**Background layers** (bottom to top):
1. Solid `var(--bg-void)`
2. Animated mesh gradient — deep reds and blacks morphing slowly (CSS `@keyframes gradient-morph` or WebGL)
3. Particle field — red/white dots drifting slowly, connecting with faint lines when proximate (like the brochure cover's neural network visual)
4. Grain overlay at 4% opacity

**Content**:
- **Pre-headline label**: `[ AI PARTNERS. LIMITLESS VISION. ]` — monospace, `--fire-neon`, letter-spaced, fades in first
- **Main headline** (H1): 
  ```
  Blending creativity,
  engineering & innovation
  to build intelligent solutions.
  ```
  - Font: "Instrument Serif" italic, 72px desktop / 36px mobile
  - Color: `var(--text-primary)` warm cream
  - **Animation**: SplitText — each word fades up + slight blur-to-sharp with 0.04s stagger per word. The words "creativity", "engineering", and "innovation" briefly flash `var(--fire-neon)` as they appear.

- **Sub-text** (below headline):
  ```
  Evolve Faster · Operate Smarter · Stay Competitive · Built for Tomorrow
  ```
  - Four items as horizontal pills/tags with `border: 1px solid var(--border-red)`, each fades in staggered 0.1s
  - On hover, each pill fills with `var(--fire-deep)` background

- **CTAs**: Two buttons side by side
  1. **Primary**: "Let's Build Something Remarkable" → neon red glow, white text, filled red on hover
  2. **Secondary**: "See Our Work ↓" → ghost button, red border, scroll-triggers to Services

- **Bottom of hero**: Scroll indicator — animated chevron or thin line bouncing gently, labeled "SCROLL" in monospace

---

### SECTION 3: SOCIAL PROOF BAR (Thin strip)
**Layout**: Horizontal scroll marquee, `var(--bg-surface)` background
**Content**: Metric badges in a continuous loop:
- `98% Client Retention` | `3x Faster to Market` | `Zero Vendor Lock-in` | `24/7 System Monitoring`
- Styled as monospace, `--text-muted`, with a small red diamond `◆` separator
- Marquee speed: ~30px/s, pauses on hover

---

### SECTION 4: SERVICES — "What We Build"
**Layout**: Bento grid — 3 columns top row, 2 columns bottom row (matching brochure layout exactly)

**Section header**:
- Eyebrow: `[ 01 — SERVICES ]` monospace red
- Headline: "What We Build" — large, cream, SplitText reveal on scroll

**The 5 service cards** (each card = dark red `var(--fire-core)` background, matching brochure):

| # | Title | Icon | Description |
|---|-------|------|-------------|
| 1 | Artificial Intelligence | Brain/neural icon | Custom AI solutions, ML models & intelligent automation — built for your business. |
| 2 | Software Development | Code brackets icon | AI-augmented, scalable software engineered for performance, clarity & growth. |
| 3 | Website Development | Globe/browser icon | AI-powered, visually compelling websites — delivered in 24 Hours. |
| 4 | Branding | Heart/identity icon | AI-driven brand identities that resonate, differentiate & leave a lasting impression. |
| 5 | AI Consulting | Strategy/compass icon | Strategic AI guidance to align your digital investments with real business outcomes. |

**Card behavior**:
- Each card has a red circular icon badge (matching brochure style)
- Cards stagger-reveal on scroll entry (GSAP ScrollTrigger, 0.1s per card)
- On hover: card lifts 4px, border glows `var(--fire-bright)`, icon rotates 10deg
- Bottom of each card: relevant tech tags as small pills

---

### SECTION 5: AI CAPABILITIES — "Our AI Capabilities"
**Layout**: Split — left side has an animated visualization, right side has text content

**Left visual** (50% width):
- Animated data-flow visualization — concentric rings or flowing particle streams representing AI pipelines
- Use `<canvas>` or CSS animations to create an abstract neural network visual (reference: brochure page 4 visual)
- Red/white particles flowing through nodes

**Right content**:
- Eyebrow: `[ 02 — CAPABILITIES ]` monospace red
- Headline: "Intelligent Systems, Not Just Models"
- **Four capability items** (each reveals on scroll):
  1. **Data Pipelines** — Seamless flow of the right data, at the right time
  2. **Logic Layers** — Intelligent decision-making at every step
  3. **Execution Mechanisms** — Automated actions that drive real outcomes
  4. **Governance Controls** — Responsible AI with full oversight & control

- Each item has: `→` arrow prefix (animated slide-in), bold title, description underneath
- Items appear sequentially as user scrolls (scrubbed to scroll position)

**Bottom row**: Four feature badges (horizontal):
`Custom AI Architecture` | `LLM Integration & RAG Systems` | `Agentic Workflow Automation` | `AI Governance & Observability`
- Each badge: `border: 1px solid var(--border-red)`, red arrow prefix, bold monospace text

---

### SECTION 6: PROCESS — "Our Approach"
**Layout**: Centered, timeline/stepper style

**Eyebrow**: `[ 03 — PROCESS ]`
**Headline**: "Our Approach"
**Subtext**: "Every engagement follows a disciplined, outcome-oriented process — from discovery to delivery."

**Four diamond steps** (visual reference: brochure page 5 — overlapping red diamonds):

Create a visual where 4 diamond shapes (rotated squares) overlap in sequence, each representing a phase:

| Phase | Title | Description |
|-------|-------|-------------|
| 01 | Discover | Understand business context and goals. |
| 02 | Design | Architect the right, scalable solution. |
| 03 | Build | Engineer to production standards and scale. |
| 04 | Deliver | Deploy, measure outcomes, and iterate. |

**Animation**: As user scrolls through this section, each diamond lights up sequentially from left to right. The active diamond has `var(--fire-brand)` fill, inactive are `var(--fire-deep)` with 30% opacity. Text for each phase fades in/out as diamonds activate.

---

### SECTION 7: WHY RADLABS — "Why Radlabs Technologies?"
**Layout**: Split — left text (60%), right atmospheric image (40%)

**Right image**: Dark scene of team working under red lighting (from brochure page 6). Use `mix-blend-mode: lighten` or overlay effect to blend into the dark background.

**Left content**:
- Eyebrow: `[ 04 — WHY US ]`
- Headline: "Why Radlabs Technologies?"

**Three value cards** (stacked vertically, each with `border: 1px solid var(--border-red)`):

1. **Creativity Meets Engineering**
   "We balance aesthetic design thinking with rigorous technical execution so solutions are both beautiful and robust."

2. **Business-First Mindset**
   "Technology decisions are always grounded in your business goals. We measure success in outcomes, not outputs."

3. **End-to-End Ownership**
   "From strategy to deployment, we own the full delivery lifecycle giving you a single accountable partner."

**Animation**: Cards slide in from left with stagger, borders light up red on scroll entry.

---

### SECTION 8: INDUSTRIES — "Industries We Serve"
**Layout**: Four equal columns

**Eyebrow**: `[ 05 — INDUSTRIES ]`
**Headline**: "Industries We Serve"

| Industry | Icon/Image | Description |
|----------|-----------|-------------|
| Finance | Dollar/chart icon | AI-driven analytics, compliance automation, and intelligent customer experiences. |
| Healthcare & Life Sciences | Medical icon | Intelligent diagnostics support, workflow automation, and secure data platforms. |
| Retail & E-Commerce | Shopping icon | Personalization engines, inventory intelligence, and seamless digital storefronts. |
| Startups & Scale-ups | Rocket icon | Rapid MVP development, technical architecture, and growth-ready infrastructure. |

**Each card**:
- Small square image thumbnail at top (dark, red-tinted, atmospheric — matching brochure style)
- Bold title below
- Description text
- On hover: image scales 1.05, red overlay fades in

**Animation**: Cards stagger-reveal from bottom on scroll.

---

### SECTION 9: TECH STACK — "Our Technology Stack"
**Layout**: Bento grid — 1 large intro card + 6 smaller category cards (matching brochure page 8)

**Eyebrow**: `[ 06 — TECHNOLOGY ]`
**Headline**: "Our Technology Stack"

**Intro card** (large, left):
- Title: "Built on Modern Foundations"
- Sub: "Top-tier technologies, handpicked for every engagement."
- Background: `var(--fire-deep)` with subtle gradient

**Six tech category cards** (all `var(--fire-core)` background):

| Category | Technologies |
|----------|-------------|
| AI & ML | Claude API, GPT-4, Anthropic, LangChain, LlamaIndex, Hugging Face Transformers, PyTorch, TensorFlow, JAX, MLflow |
| Cloud & Infrastructure | AWS (SageMaker, Lambda, EC2), Azure ML, GCP Vertex AI, Kubernetes, Docker, Terraform |
| Data & Analytics | PostgreSQL, MongoDB, Snowflake, Apache Spark, Airflow, dbt, Kafka, Redis |
| Advanced ML Ops | Ray, Weights & Biases, Kubeflow, Feature Store, Model Registry, A/B Testing Frameworks |
| Web & Backend | FastAPI, Django, Node.js, Go, Rust, gRPC, GraphQL |
| Observability & Governance | Datadog, New Relic, OpenTelemetry, Prometheus, ELK Stack, Model Governance Frameworks |

**Card behavior**: Tech names appear as small pills/tags within each card. On hover, card border glows. Technologies can use a subtle typewriter reveal effect on scroll entry.

---

### SECTION 10: RESULTS — "What Our Clients Experience"
**Layout**: Full-width, split — left atmospheric image (handshake from brochure page 9), right metrics

**Left**: Dark handshake image with red lighting overlay, `position: sticky` for scroll parallax

**Right content**:
- Eyebrow: `[ 07 — RESULTS ]`
- Headline: "What Our Clients Experience"

**Three metrics** (large animated counters):

| Metric | Label | Description |
|--------|-------|-------------|
| 40% | Faster Time-to-Market | Accelerated delivery through modern engineering practices and reusable architectures. |
| 3x | Operational Efficiency | Intelligent automation reduces manual effort and unlocks team capacity for high-value work. |
| 100% | Production-Ready Delivery | Every system we ship is built to enterprise standards — secure, governed, and maintainable. |

**Counter animation**: Numbers count up from 0 to target on scroll entry using GSAP. `40%` → fire-neon color, `3x` → fire-neon, `100%` → fire-neon. Numbers use "Space Grotesk" at 96px+ font size.

**Commitment banner** (below metrics):
Dark card with red-tinted background:
"Our commitment: We don't consider an engagement complete until your team can operate, extend, and defend what we built together."

---

### SECTION 11: CTA / CONTACT — "Let's Build Something Remarkable"
**Layout**: Full viewport height, centered

**Background**:
- Atmospheric image (futuristic pathway from brochure page 10) with blue/purple tint, parallax scroll
- Dark overlay gradient from bottom

**Content** (centered):
- Headline: "Let's Build Something Remarkable" — large serif italic, SplitText reveal
- Primary CTA: "Start a Conversation" → large neon red glow button, opens mailto: or booking link
- Secondary CTA: "sales@radlabs.tech" → underlined, copy-to-clipboard on click

**Contact info grid** (3 columns at bottom, `var(--fire-core)` card background):

| Website | Contact | Headquarters |
|---------|---------|-------------|
| radlabs.tech | sales@radlabs.tech, +91 690-126-1005, +91 863-870-2710 | Available Globally |

---

### SECTION 12: FOOTER
**Layout**: Dark, minimal, `var(--bg-elevated)`
**Content**:
- Left: Radlabs logo (80px) + tagline
- Center: Quick links — Services, About, Case Studies, Contact
- Right: "Start a Project" button + email
- Bottom bar: `© 2026 Radlabs Technologies. All rights reserved.` | Privacy | Terms

---

## 4. ANIMATION SYSTEM (GSAP + Lenis)

### 4.1 Global Setup
```javascript
// Lenis smooth scroll initialization
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// GSAP ScrollTrigger integration with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### 4.2 Animation Patterns
| Pattern | Trigger | Properties | Duration | Ease |
|---------|---------|-----------|----------|------|
| **Fade Up** | Scroll into viewport | `opacity: 0→1, y: 40→0` | 0.8s | `power3.out` |
| **SplitText Reveal** | Scroll into viewport | Per-word `opacity: 0→1, y: 20→0, filter: blur(4px)→blur(0)` | 0.6s, stagger 0.04s | `power2.out` |
| **Counter** | Scroll into viewport | Number counts from 0 to target | 2s | `power1.inOut` |
| **Card Stagger** | Scroll into viewport | Cards reveal with `opacity: 0→1, y: 30→0`, 0.1s stagger | 0.6s per card | `power3.out` |
| **Parallax** | Scroll position | `y` offset at 0.3-0.5x scroll speed | Continuous | Linear |
| **Diamond Light-up** | Scrub (scroll %) | `fill` color transitions, text `opacity` | Scrubbed | `none` |
| **Glow Pulse** | Hover | `box-shadow` intensity oscillates | 1.5s loop | `sine.inOut` |
| **Navbar Compress** | Scroll > 100px | `padding` reduces, `background-opacity` increases | 0.3s | `power2.out` |
| **Preloader Exit** | Load complete | Screen wipes up, content fades in | 1s | `power4.inOut` |

### 4.3 Scroll-driven Narrative (Scrollytelling)
The entire page tells a story arc:
```
"Who are we?" (Hero) →
"What do we build?" (Services) →
"How is our AI special?" (Capabilities) →
"How do we work?" (Process) →
"Why choose us?" (Why Us) →
"Who do we serve?" (Industries) →
"What do we use?" (Tech Stack) →
"What are the results?" (Results) →
"Let's work together" (CTA)
```
Each section transition should feel like a chapter. Use `ScrollTrigger.create()` with `pin` and `scrub` selectively (especially for Process diamonds and Capabilities pipeline) to create moments where the scroll controls the animation playback.

---

## 5. PERFORMANCE & TECHNICAL REQUIREMENTS

### 5.1 Performance Targets
- **LCP** < 2.5s (hero text + first meaningful paint)
- **FID** < 100ms
- **CLS** < 0.1
- **Total page weight** < 2MB (excluding fonts)
- Lazy load all images below the fold
- Use `next/image` with WebP/AVIF format
- Preload hero fonts and critical CSS

### 5.2 Responsive Breakpoints
```
Desktop:  1440px+ (full experience)
Laptop:   1024px  (slight layout compression)
Tablet:   768px   (2-column grids → single, smaller type scale)
Mobile:   375px   (single column, reduced animations, no particle field)
```

### 5.3 Accessibility
- `prefers-reduced-motion`: Disable all GSAP animations, show content statically
- `prefers-color-scheme`: Not applicable (dark-only design)
- All images have descriptive `alt` text
- Focus states visible on all interactive elements (red outline)
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, proper heading hierarchy
- Minimum contrast ratio 4.5:1 for body text

### 5.4 SEO
- Semantic markup with Schema.org `Organization` and `Service` structured data
- `<title>`: "Radlabs Technologies | AI Solutions, Software & Consulting"
- `<meta description>`: "Radlabs Technologies blends creativity, engineering & innovation to build intelligent AI solutions. Custom ML models, AI-augmented software, 24-hour websites, and strategic AI consulting."
- Open Graph and Twitter Card meta tags
- Canonical URL: `https://radlabs.tech`

---

## 6. FILE STRUCTURE

```
radlabs-site/
├── app/
│   ├── layout.tsx           # Root layout with fonts, metadata
│   ├── page.tsx             # Main page composing all sections
│   ├── globals.css          # CSS variables, grain overlay, base styles
│   └── loading.tsx          # Preloader component
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SmoothScroll.tsx # Lenis wrapper
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── SocialProof.tsx
│   │   ├── Services.tsx
│   │   ├── Capabilities.tsx
│   │   ├── Process.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Industries.tsx
│   │   ├── TechStack.tsx
│   │   ├── Results.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Button.tsx       # Primary/Secondary/Ghost variants
│   │   ├── Card.tsx         # Reusable bento card
│   │   ├── SectionHeader.tsx # Eyebrow + headline pattern
│   │   ├── Counter.tsx      # Animated number counter
│   │   ├── Marquee.tsx      # Infinite scroll marquee
│   │   └── Cursor.tsx       # Custom cursor component
│   └── effects/
│       ├── ParticleField.tsx
│       ├── GrainOverlay.tsx
│       ├── GridLines.tsx
│       └── GlowOrb.tsx
├── lib/
│   ├── animations.ts        # GSAP animation presets
│   └── constants.ts         # Content data, nav links, services array
├── public/
│   ├── logo.svg
│   ├── og-image.jpg
│   └── fonts/
├── tailwind.config.ts       # Extended theme with brand colors
├── next.config.js
└── package.json
```

---

## 7. KEY DEPENDENCIES

```json
{
  "dependencies": {
    "next": "^14.2",
    "react": "^18.3",
    "react-dom": "^18.3",
    "gsap": "^3.12",
    "@studio-freight/lenis": "^1.0",
    "tailwindcss": "^3.4",
    "clsx": "^2.1",
    "framer-motion": "^11.0"
  }
}
```
> Note: GSAP Club plugins (SplitText, ScrollSmoother) require a GreenSock license. Use `@gsap/react` for React integration. If SplitText is unavailable, implement a custom text-splitting utility.

---

## 8. QUALITY CHECKLIST (Awwwards Scoring)

### Design (target ≥ 9/10)
- [ ] Cohesive dark theme with intentional red accent system
- [ ] Premium typography with clear hierarchy (serif display + mono UI)
- [ ] Bento grid layouts with asymmetric tension
- [ ] Micro-interactions on every interactive element
- [ ] Custom cursor
- [ ] Film grain and atmospheric effects

### Usability (target ≥ 8/10)
- [ ] Smooth Lenis scrolling
- [ ] Responsive across all breakpoints
- [ ] Accessible with `prefers-reduced-motion` support
- [ ] Fast load times (LCP < 2.5s)
- [ ] Clear navigation with active section tracking
- [ ] All CTAs clearly visible and functional

### Creativity (target ≥ 9/10)
- [ ] Scrollytelling narrative structure
- [ ] Animated data visualization (capabilities section)
- [ ] Diamond process animation (scrubbed to scroll)
- [ ] Particle field in hero
- [ ] Counter animations for metrics
- [ ] Preloader with brand animation
- [ ] Magnetic cursor effects on CTAs

### Content (target ≥ 8/10)
- [ ] Clear value proposition in hero
- [ ] All 5 services clearly presented
- [ ] Full tech stack visible
- [ ] Trust metrics prominent
- [ ] Contact info accessible
- [ ] Professional, concise copy throughout

---

## 9. CRITICAL IMPLEMENTATION NOTES

1. **Start with structure**: Build all sections as static HTML/Tailwind first. Get the layout, typography, colors, and spacing right BEFORE adding any animations.

2. **Layer animations last**: Add GSAP ScrollTrigger animations after the layout is complete. Start with fade-ups, then add the more complex scrubbed animations.

3. **Performance first**: Use `will-change` sparingly. Prefer `transform` and `opacity` for GPU-accelerated animations. Avoid animating `width`, `height`, `top`, `left`.

4. **Mobile reduction**: On screens < 768px, disable particle fields, reduce animation complexity, use simpler fade-ins instead of scrubbed scrollytelling.

5. **Content is sacred**: Never compromise readability for animation. If an animation makes text harder to read, remove it.

6. **The brochure is the source of truth** for content and color. The dummy site (radlab-site.vercel.app) provides structural reference. The inspiration sites (glow.team, subduxion.com) inform the animation quality and interaction sophistication.

7. **backend and auth we will skip..** we will have dummy login and login page created.
 
---

*This prompt is designed to be fed directly to an AI code agent. Execute section by section, test frequently, and prioritize the hero + services + results sections first as they carry the highest visual impact.*
