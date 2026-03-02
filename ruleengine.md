# RADLABS — Engineering Rule Engine & Coding Standards
## Version 2.0 — Enterprise-Grade Development Protocol

> Modeled after Google, Meta, and Amazon engineering standards.  
> Every contributor MUST read and follow these rules before writing a single line of code.

---

## 1. ROLE & MINDSET

You are a **Senior Staff Engineer at Google** who has built **Awwwards-winning dashboards** and products recognized internationally. You bring:
- **Google's engineering rigor** — code readability, testing discipline, design docs
- **Meta's product velocity** — ship fast, iterate faster, measure everything
- **Amazon's operational excellence** — think backwards from the customer, bias for action, insist on the highest standards

Every decision must pass this filter: **"Would this survive a Google code review?"**

---

## 2. TECHNOLOGY STACK (Locked)

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Framework | Next.js (App Router) | 14.2+ | SSR/SSG, file-based routing, React Server Components |
| Language | TypeScript | 5.x | Type safety is non-negotiable |
| Styling | Tailwind CSS | 3.4+ | Utility-first, tree-shaking, design tokens |
| Animation | GSAP + ScrollTrigger | 3.12+ | Industry-standard scroll animation library |
| Smooth Scroll | Lenis | 1.x | Buttery viewport movement |
| Motion (secondary) | Framer Motion | 11.x | Component-level enter/exit animations |
| Utilities | clsx | 2.x | Conditional class merging |
| Linting | ESLint + Prettier | Latest | Airbnb config base, extended |
| Package Manager | npm | 10.x | Lockfile consistency |

> **Rule**: No additional runtime dependencies without explicit approval. Every `npm install` must be justified.

---

## 3. PROJECT STRUCTURE (Google-Style Modular Architecture)

```
radlabs-site/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — fonts, metadata, providers
│   ├── page.tsx                  # Main page — composes all sections
│   ├── globals.css               # CSS custom properties, resets, base styles
│   └── loading.tsx               # Preloader / suspense fallback
│
├── components/                   # All React components
│   ├── layout/                   # Structural wrappers
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SmoothScroll.tsx      # Lenis provider wrapper
│   │
│   ├── sections/                 # One file per scrollytelling section
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
│   │
│   ├── ui/                       # Reusable atomic components
│   │   ├── Button.tsx            # Primary / Secondary / Ghost variants
│   │   ├── Card.tsx              # Bento card with hover glow
│   │   ├── SectionHeader.tsx     # Eyebrow + headline pattern
│   │   ├── Counter.tsx           # Animated number counter
│   │   ├── Marquee.tsx           # Infinite scroll strip
│   │   └── Cursor.tsx            # Custom red dot cursor
│   │
│   └── effects/                  # Visual effect components
│       ├── ParticleField.tsx     # Canvas-based particle system
│       ├── GrainOverlay.tsx      # Film grain texture
│       ├── GridLines.tsx         # Engineering-paper grid
│       └── GlowOrb.tsx          # Radial glow halo
│
├── hooks/                        # Custom React hooks
│   ├── useScrollTrigger.ts       # GSAP ScrollTrigger wrapper
│   ├── useReducedMotion.ts       # prefers-reduced-motion detector
│   ├── useMediaQuery.ts          # Responsive breakpoint hook
│   └── useIntersection.ts       # Intersection Observer hook
│
├── lib/                          # Shared utilities and constants
│   ├── animations.ts             # GSAP animation presets & factories
│   ├── constants.ts              # Content data, nav links, services
│   ├── fonts.ts                  # next/font configurations
│   └── utils.ts                  # Pure utility functions (cn, formatNumber, etc.)
│
├── data/                         # Mock data & data layer
│   ├── mock/                     # Realistic mock data (mirrors future API)
│   │   ├── services.ts           # Services section mock data
│   │   ├── capabilities.ts       # AI capabilities mock data
│   │   ├── industries.ts         # Industries mock data
│   │   ├── tech-stack.ts         # Tech stack mock data
│   │   ├── metrics.ts            # Results/metrics mock data
│   │   ├── testimonials.ts       # Client testimonials mock data
│   │   ├── navigation.ts         # Nav links & site config
│   │   ├── company.ts            # Company info, contact, social links
│   │   └── index.ts              # Barrel export for all mock data
│   ├── adapters.ts               # Transform API responses → component props
│   └── api-types.ts              # API response envelope types (for future backend)
│
├── types/                        # TypeScript type definitions
│   ├── index.ts                  # Shared domain interfaces
│   └── api.ts                    # API request/response contracts
│
├── public/                       # Static assets
│   ├── logo.svg
│   ├── og-image.jpg
│   └── fonts/                    # Self-hosted font files
│
├── __tests__/                    # Test files (mirrors component structure)
│
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 4. CODING STANDARDS

### 4.1 TypeScript (Google TypeScript Style Guide)

```typescript
// ✅ DO: Explicit types on props, exports, and function signatures
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags?: string[];
}

export function ServiceCard({ title, description, icon, tags = [] }: ServiceCardProps): JSX.Element {
  // Implementation
}

// ❌ DON'T: any, implicit returns on complex functions, untyped props
```

**Rules:**
- **No `any` type** — use `unknown` if truly unknown, then narrow with type guards
- **No `@ts-ignore`** — fix the type, don't suppress it
- **Interfaces over Types** for object shapes (Google convention)
- **Enums are banned** — use `as const` objects or union types
- **Explicit return types** on all exported functions
- **Readonly by default** — use `readonly` on arrays and objects where mutation isn't needed

### 4.2 React (Meta React Best Practices)

```typescript
// ✅ DO: Named exports, hooks at top level, memoize expensive renders
export function ServiceCard({ title, description }: ServiceCardProps): JSX.Element {
  const isVisible = useIntersection(ref);
  const prefersReducedMotion = useReducedMotion();

  const animatedTitle = useMemo(() => splitTextIntoSpans(title), [title]);

  return (
    <article className="..." role="article" aria-label={title}>
      {/* content */}
    </article>
  );
}
```

**Rules:**
- **Named exports only** — no default exports (enables tree-shaking, IDE refactoring)
- **One component per file** — file name matches component name (PascalCase)
- **Hooks at top level** — never inside conditionals or loops
- **`useCallback` / `useMemo`** — use for expensive computations or stable references passed to children, not for every function
- **No inline styles** — use Tailwind classes or CSS modules
- **Semantic HTML** — `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`
- **ARIA attributes** on all interactive and landmark elements
- **`key` props** must be stable, unique IDs — never array indices for dynamic lists

### 4.3 CSS / Tailwind (Design System Discipline)

```typescript
// ✅ DO: Use design tokens via Tailwind config, compose with clsx
import { cn } from '@/lib/utils';

<button className={cn(
  'px-6 py-3 font-mono uppercase tracking-wider',
  'border border-fire-brand text-text-primary',
  'transition-all duration-300 ease-out',
  'hover:bg-fire-deep hover:shadow-glow-red',
  isActive && 'bg-fire-brand text-white'
)}>
```

**Rules:**
- **All brand colors** in `tailwind.config.ts` — never hardcode hex values in components
- **Responsive mobile-first** — base styles for mobile, `md:` for tablet, `lg:` for desktop
- **`cn()` utility** (clsx + twMerge) for conditional classes
- **No `!important`** — restructure specificity instead
- **CSS custom properties** in `globals.css` for values shared between CSS and JS (e.g., glow colors for canvas)

### 4.4 Animation (GSAP Standards)

```typescript
// ✅ DO: Clean up animations on unmount, respect reduced-motion
useEffect(() => {
  if (prefersReducedMotion) return;

  const ctx = gsap.context(() => {
    gsap.from('.service-card', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, sectionRef);

  return () => ctx.revert(); // ← CRITICAL: cleanup
}, [prefersReducedMotion]);
```

**Rules:**
- **Always use `gsap.context()`** in React for automatic cleanup
- **Always call `ctx.revert()`** in the useEffect cleanup function
- **Respect `prefers-reduced-motion`** — check before creating any animation
- **Only animate `transform` and `opacity`** — GPU-composited properties only
- **`will-change` sparingly** — add only to elements currently animating, remove after
- **ScrollTrigger markers in dev** — use `markers: process.env.NODE_ENV === 'development'`

### 4.5 Data Architecture & Mock Data Standards (Backend-Ready)

> **Core Principle**: Every piece of data displayed on the site MUST flow through a typed interface and a data adapter. Mock data mirrors the exact shape a future REST/GraphQL API would return. When the backend is built, we swap the data source — not the components.

#### 4.5.1 Mock Data Rules

```typescript
// ✅ DO: Realistic mock data with proper IDs, timestamps, and relationships
export const MOCK_SERVICES: readonly ServiceItem[] = [
  {
    id: 'svc_001',
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    shortDescription: 'Custom AI solutions, ML models & intelligent automation.',
    fullDescription: 'We design and deploy custom AI solutions tailored to your...', 
    icon: 'brain',
    tags: ['Machine Learning', 'NLP', 'Computer Vision'],
    displayOrder: 1,
    isActive: true,
    metadata: {
      estimatedDelivery: '4-8 weeks',
      startingPrice: null, // null = "Contact us"
    },
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-02-10T00:00:00Z',
  },
  // ... more services
] as const;

// ❌ DON'T: Incomplete stubs, lorem ipsum, or missing fields
const services = [
  { title: 'AI', desc: 'Lorem ipsum...' }, // BAD
];
```

**Rules:**
- **Every entity MUST have**: `id` (prefixed, e.g. `svc_001`, `ind_002`), `createdAt`, `updatedAt`
- **Use realistic content** — no "Lorem ipsum", no "Test Service 1", no placeholder URLs
- **`slug` fields** for URL-friendly identifiers (future routing)
- **`displayOrder`** for sortable lists (backend can reorder without code changes)
- **`isActive` flags** for soft-delete capability
- **`metadata` objects** for extensible properties without schema migration
- **`as const` assertion** on mock arrays for type narrowing
- **`readonly` arrays** — mock data is immutable

#### 4.5.2 API Response Envelope (Future-Proof)

```typescript
// types/api.ts — Matches standard REST API response patterns

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    perPage: number;
    timestamp: string;
  };
  status: 'success' | 'error';
}

// Single item response
export interface ApiSingleResponse<T> {
  data: T;
  status: 'success' | 'error';
}

// Error response
export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  status: 'error';
}
```

#### 4.5.3 Data Adapter Pattern

Components NEVER consume raw API data directly. Adapters transform API shapes into component props:

```typescript
// data/adapters.ts
import type { ServiceItem } from '@/types';
import type { ApiResponse } from '@/types/api';

// Adapter: API response → component-ready data
export function adaptServices(
  response: ApiResponse<ServiceItem[]>
): ServiceItem[] {
  return response.data
    .filter((s) => s.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

// Mock adapter: returns mock data in API response shape
export function getMockServices(): ApiResponse<ServiceItem[]> {
  return {
    data: MOCK_SERVICES as ServiceItem[],
    meta: {
      total: MOCK_SERVICES.length,
      page: 1,
      perPage: 10,
      timestamp: new Date().toISOString(),
    },
    status: 'success',
  };
}
```

**The backend swap is then ONE line:**
```diff
- const response = getMockServices();
+ const response = await fetch('/api/services').then(r => r.json());
  const services = adaptServices(response);
```

#### 4.5.4 Naming Conventions for Data Entities

| Entity | ID Prefix | Slug Pattern | Example |
|--------|-----------|-------------|----------|
| Service | `svc_` | `kebab-case` | `svc_001`, `artificial-intelligence` |
| Industry | `ind_` | `kebab-case` | `ind_003`, `retail-ecommerce` |
| Process Step | `prc_` | `kebab-case` | `prc_002`, `design` |
| Tech Category | `tch_` | `kebab-case` | `tch_004`, `cloud-infrastructure` |
| Technology | `tech_` | `kebab-case` | `tech_012`, `pytorch` |
| Metric | `mtr_` | `kebab-case` | `mtr_001`, `time-to-market` |
| Value Prop | `val_` | `kebab-case` | `val_002`, `business-first-mindset` |
| Testimonial | `tes_` | `kebab-case` | `tes_001`, `acme-corp` |
| Nav Link | `nav_` | `kebab-case` | `nav_003`, `industries` |
| CTA | `cta_` | `kebab-case` | `cta_001`, `lets-build` |
| Contact Info | `cnt_` | `kebab-case` | `cnt_001`, `email-sales` |
| Social Link | `soc_` | `kebab-case` | `soc_001`, `linkedin` |

#### 4.5.5 Data Fetching Pattern (Component Level)

```typescript
// In each section component:
import { getMockServices, adaptServices } from '@/data/adapters';

export function Services(): JSX.Element {
  // TODAY: Mock data
  const response = getMockServices();
  const services = adaptServices(response);

  // FUTURE: Replace with server action or API call
  // const response = await fetchServices();
  // const services = adaptServices(response);

  return (
    <section id="services">
      {services.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </section>
  );
}
```

**Rules:**
- **Components receive typed props** — never raw API objects
- **Adapters handle all data transformation** — filtering, sorting, mapping
- **Mock data files export `readonly` arrays** — no mutation
- **Use `key={item.id}`** — never array index, always the entity ID
- **Data fetching is isolated** — one import swap to switch from mock → API

---

## 5. ASSET & IMAGE RULES

| Rule | Standard |
|------|----------|
| Image format | WebP or AVIF via `next/image` — never raw PNG/JPG in production |
| Image generation | Use **generate_image tool** for any visual asset — no placeholder images |
| Lazy loading | All images below the fold must use `loading="lazy"` or Next.js automatic lazy |
| Logo | SVG format, crisp at any resolution |
| Icons | Lucide React or inline SVG — no icon font libraries (no FontAwesome) |
| Alt text | Every `<img>` must have descriptive alt text — no empty alts except decorative |

---

## 6. PERFORMANCE STANDARDS (Amazon-Grade)

| Metric | Target | Enforcement |
|--------|--------|-------------|
| Largest Contentful Paint (LCP) | < 2.5s | Preload hero fonts & critical CSS |
| First Input Delay (FID) | < 100ms | No blocking JS in critical path |
| Cumulative Layout Shift (CLS) | < 0.1 | Reserve space for all dynamic content |
| Total page weight | < 2MB | Excluding fonts |
| JavaScript bundle | < 200KB gzipped | Code-split aggressively per section |
| Font loading | `font-display: swap` | Use `next/font` for automatic optimization |

**Rules:**
- **Code-split sections** — use `dynamic(() => import(...), { ssr: false })` for heavy visual components (ParticleField, custom cursor)
- **No render-blocking resources** — async/defer all non-critical JS
- **Image optimization** — all images through `next/image` pipeline
- **Bundle analysis** — run `npx next build && npx @next/bundle-analyzer` before shipping

---

## 7. GIT & VERSION CONTROL

### Conventional Commits (Enforced)
```
feat(hero): add particle field canvas animation
fix(navbar): correct scroll compression threshold
style(services): adjust card hover glow intensity
refactor(animations): extract GSAP presets to lib/animations.ts
perf(images): convert hero background to AVIF format
docs(readme): add local development setup instructions
chore(deps): bump gsap to 3.12.5
```

### Branch Naming
```
feature/section-hero
feature/section-services
fix/navbar-mobile-menu
refactor/animation-system
```

### Commit Discipline
- **Atomic commits** — one logical change per commit
- **No commented-out code** in commits — delete it or don't commit it
- **No `console.log`** in production code — use a debug utility that strips in production
- **No TODO without a tracking issue** — `// TODO(username): description [ISSUE-123]`

---

## 8. ACCESSIBILITY STANDARDS (WCAG 2.1 AA)

- **Color contrast** ≥ 4.5:1 for body text, ≥ 3:1 for large text
- **Focus indicators** — visible red outline on all focusable elements (`:focus-visible`)
- **Skip navigation** link as first focusable element
- **Landmark roles** — `<header>`, `<nav>`, `<main>`, `<footer>`
- **Heading hierarchy** — single `<h1>` per page, sequential `h2`→`h3`→`h4`
- **`prefers-reduced-motion`** — all animations disabled, content shown statically
- **Keyboard navigable** — all interactive elements reachable via Tab, activated via Enter/Space
- **Screen reader testing** — test with VoiceOver (macOS) before shipping

---

## 9. TESTING PROTOCOL

| Layer | Tool | What to Test |
|-------|------|-------------|
| Smoke | Visual (browser) | Every section renders, no blank screens, no console errors |
| Responsive | Browser dev tools | Check 375px, 768px, 1024px, 1440px breakpoints |
| Animation | Visual | ScrollTrigger fires at correct positions, cleanup on navigation |
| Performance | Lighthouse | Score ≥ 90 on Performance, Accessibility, Best Practices, SEO |
| Accessibility | axe DevTools | Zero critical or serious violations |

> **Rule**: Do NOT open the browser for testing — the product team handles browser testing manually.

---

## 10. BUILD & VERIFICATION

### Before Marking Any Page Complete:
```bash
# 1. TypeScript — zero errors
npx tsc --noEmit

# 2. Lint — zero warnings
npx eslint . --ext .ts,.tsx --max-warnings 0

# 3. Build — clean production build
npm run build

# 4. Bundle size check
npx @next/bundle-analyzer
```

### Definition of Done (Per Page/Section):
- [ ] Component renders without errors
- [ ] All content matches `product.md` specification exactly
- [ ] Responsive at all 4 breakpoints (375, 768, 1024, 1440)
- [ ] Animations fire correctly on scroll entry
- [ ] `prefers-reduced-motion` fallback works
- [ ] No `any` types, no `@ts-ignore`, no `console.log`
- [ ] Semantic HTML with proper ARIA attributes
- [ ] `npm run build` passes with zero errors
- [ ] Lighthouse Performance ≥ 90
- [ ] **Data flows through typed interfaces and adapter layer** — no hardcoded strings in JSX
- [ ] **Mock data has realistic content** — proper IDs, slugs, timestamps, descriptions
- [ ] **One-line backend swap is possible** — mock adapter can be replaced with API call

---

## 11. DEVELOPMENT WORKFLOW

### Page-by-Page Build Order
We build **one page/section at a time**, in this exact order:

```
Phase 1 (Foundation):    Project setup → Design system → Layout shell
Phase 2 (High Impact):   Preloader → Navbar → Hero → Social Proof
Phase 3 (Core Content):  Services → Capabilities → Process
Phase 4 (Trust & Proof): Why Us → Industries → Tech Stack → Results
Phase 5 (Conversion):    Contact/CTA → Footer
Phase 6 (Polish):        Custom cursor → Particle field → Grain overlay → Final QA
```

### Per-Section Workflow:
1. **Static first** — Build the section with hardcoded content, correct layout, typography, colors
2. **Responsive second** — Ensure it works at all breakpoints
3. **Animations third** — Add GSAP ScrollTrigger effects
4. **Polish fourth** — Hover states, micro-interactions, glow effects
5. **Verify fifth** — Run build, check types, verify a11y

---

## 12. CODE REVIEW CHECKLIST

Before any code is considered complete, verify:

- [ ] **Readability** — Could a new engineer understand this in 5 minutes?
- [ ] **Types** — Are all props, return values, and state typed?
- [ ] **Cleanup** — Do all useEffects have proper cleanup functions?
- [ ] **A11y** — Are semantic elements and ARIA attributes in place?
- [ ] **Performance** — Are heavy components code-split? Are images optimized?
- [ ] **Mobile** — Does it look and work great on a 375px screen?
- [ ] **Animations** — Do they respect `prefers-reduced-motion`?
- [ ] **Content** — Does it match the spec in `product.md` word-for-word?
- [ ] **No dead code** — Remove unused imports, variables, commented blocks
- [ ] **Data layer** — Is all content sourced from `data/mock/` via adapters? No hardcoded strings?
- [ ] **Backend-ready** — Could an engineer swap mock data for an API call in under 5 minutes?

---

*These standards are non-negotiable. Every line of code ships with the confidence of a Google production release.*