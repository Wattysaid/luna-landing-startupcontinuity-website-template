# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Luna Landing is a **YAML-driven landing page system** built with Astro 4, TypeScript, and Tailwind CSS. The entire website content, component ordering, and layout configuration is controlled through YAML files in `src/data/pages/`. Each page has its own YAML file that defines which components to display, their configuration, and all copy/content. This is the key architectural principle of the project.

**Key Advantage:** You can completely customize pages, add/remove/reorder components, and change all content by editing YAML files - no code changes required.

## Development Commands

### Development Server
```bash
pnpm dev        # Start dev server (alias: pnpm start)
```

### Build and Type Checking
```bash
pnpm build      # Run type checking + build
pnpm preview    # Preview production build
```

### Linting
```bash
pnpm lint       # Run ESLint on .astro, .ts, .js, .tsx files
```

**Note:** This project uses `pnpm` as the package manager, not `npm`.

## Core Architecture

### YAML-Driven Page Composition System

The entire website is powered by YAML files in `src/data/pages/` - one file per page. This is the **primary interface** for content editing, component ordering, and layout configuration.

**Architecture Components:**

1. **YAML Configuration Files** (`src/data/pages/*.yaml`)
   - Define page metadata, layout, and component composition
   - Each page has its own YAML file (e.g., `home.yaml`, `about.yaml`)
   - Components can be added, removed, reordered, enabled/disabled

2. **TypeScript Interfaces** (`src/config/page.interface.ts`)
   - Strictly typed component configurations
   - Interfaces for each component type (HeroConfig, ServicesConfig, etc.)
   - PageData structure defining the overall page schema

3. **Component Registry** (`src/config/component-registry.ts`)
   - Maps component type strings to Astro components
   - Enables dynamic component loading
   - Provides validation for component types

4. **Page Service** (`src/services/page.service.ts`)
   - Loads and parses YAML files
   - Validates page data structure
   - Throws helpful errors for invalid configurations

5. **Page Renderer** (`src/components/PageRenderer.astro`)
   - Dynamically renders components based on YAML configuration
   - Handles layout options (spacing, container width)
   - Manages header/footer rendering

### Data Flow

1. `src/data/pages/home.yaml` - YAML configuration file
2. `src/services/page.service.ts` - Loads and parses YAML via `getPageData()`
3. `src/pages/index.astro` - Fetches page data and passes to PageRenderer
4. `src/components/PageRenderer.astro` - Reads component list and dynamically renders
5. `src/config/component-registry.ts` - Maps component types to actual components
6. `src/sections/*.astro` - Individual components render with their config

### YAML Structure

Each page YAML file has the following structure:

```yaml
meta:                    # SEO and page metadata
  title: "..."
  description: "..."
  ldJson: {...}         # Structured data

layout:                  # Page-level layout options
  containerWidth: "3/4"  # "full", "3/4", "2/3", "1/2"

header:                  # Optional header component
  type: "Header"
  enabled: true
  config: {...}

components:              # Main content (ordered list)
  - type: "Hero"        # Component type from registry
    id: "hero-section"  # Optional ID
    enabled: true       # Can disable without deleting
    config:
      layout:           # Layout options for this component
        spacing: "large"
      content:          # Component-specific content
        title: "..."

footer:                  # Optional footer component
  type: "Footer"
  enabled: true
  config: {...}
```

### Icon System

Icons are typed via the `Icon` union type in `landing.interface.ts`. Available icons:
- **Common:** DevIcon, FileIcon, PlanetIcon, ConfigIcon, CheckIcon
- **Social:** InstagramIcon, GithubIcon, TwitterIcon, FacebookIcon
- **Tech:** ReactIcon, SvelteIcon, SolidIcon, VueIcon, VercelIcon, NetlifyIcon

Icon components live in `src/icons/` organized by category (commons, socials, techs).

### Component Organization

**Sections** (`src/sections/`):
- `Header.astro` - Navigation bar
- `Hero.astro` - Hero section with animated background
- `Services.astro` - Services grid
- `Adventajes.astro` - Side-by-side feature showcases (note: "adventajes" is intentional spelling)
- `Brands.astro` - Technology brand logos
- `Pricing.astro` - Pricing cards
- `Footer.astro` - Footer with links and socials

**Reusable Components** (`src/components/`):
- `Action.astro` - CTA button component
- `Background.astro` - Animated background with parallax effect
- `Card.astro` - Generic card component for pricing/services
- `Icon.astro` - Dynamic icon renderer based on Icon type
- `IconWrapper.astro` - Icon container with styling
- `SectionTitle.astro` - Consistent section title styling
- `SideBySide.astro` - Two-column layout for features

### Styling System

Tailwind configuration is minimal (`tailwind.config.mjs`):
- Custom colors: white (#FFFFFF), black (#161925), primary (#1D4ED8), secondary (#0C8346)
- Plugin: `tailwind-scrollbar` for custom scrollbar styling
- Content scan includes all Astro, HTML, JS, JSX, MD, MDX, Svelte, TS, TSX, Vue files

### TypeScript Configuration

The codebase uses path aliases configured in `tsconfig.json`:
- `@/*` maps to `src/*`

Example: `import { getLandingData } from "@/services/data.service"`

## Making Content Changes

**To modify website content:**

1. Edit the YAML file in `src/data/pages/` (e.g., `home.yaml`)
2. Change component content in the `config.content` section
3. Reorder components by moving them up/down in the `components` array
4. Enable/disable components using the `enabled: true/false` flag
5. Adjust layout options like `spacing` and `containerWidth`
6. Icon names must match the `Icon` union type exactly
7. Images referenced in YAML (e.g., `template.webp`, `seo.webp`) should be in `public/` directory

**Example - Reordering components:**
```yaml
components:
  - type: "Hero"       # This renders first
  - type: "Pricing"    # Move this up to show pricing earlier
  - type: "Services"   # This now renders after pricing
```

**Example - Disabling a component:**
```yaml
components:
  - type: "Brands"
    enabled: false     # Component won't render but config is preserved
```

**Example - Changing layout:**
```yaml
components:
  - type: "Services"
    config:
      layout:
        columns: 3           # Change from 2 to 3 columns
        spacing: "xl"        # Increase spacing
```

## Creating New Pages

To create a new page:

1. Create a new YAML file in `src/data/pages/` (e.g., `about.yaml`)
2. Follow the structure in `home.yaml` as a template
3. Create a new page file in `src/pages/` (e.g., `about.astro`)
4. Import and use PageRenderer:
   ```astro
   ---
   import Layout from "@/layouts/Layout.astro";
   import PageRenderer from "@/components/PageRenderer.astro";
   import { getPageData } from "@/services/page.service";

   const pageData = await getPageData("about");
   ---

   <Layout meta={pageData.meta}>
     <PageRenderer pageData={pageData} />
   </Layout>
   ```

## Adding New Component Types

To add a new component type to the system:

1. **Create the component** in `src/sections/` (e.g., `Testimonials.astro`)
   - Accept a `data` prop with your component's content structure

2. **Add to component registry** (`src/config/component-registry.ts`):
   ```typescript
   import Testimonials from "@/sections/Testimonials.astro";

   export const ComponentRegistry = {
     // ... existing components
     Testimonials,
   } as const;
   ```

3. **Define TypeScript interfaces** (`src/config/page.interface.ts`):
   ```typescript
   export interface TestimonialsConfig {
     layout?: LayoutConfig;
     content: {
       title: string;
       testimonials: Array<{
         quote: string;
         author: string;
         // ... other fields
       }>;
     };
   }

   // Add to ComponentType union
   export type ComponentType =
     | "Hero"
     | "Services"
     // ... existing types
     | "Testimonials";

   // Add to ComponentConfig union
   export type ComponentConfig =
     | HeroConfig
     | ServicesConfig
     // ... existing configs
     | TestimonialsConfig;
   ```

4. **Use in YAML files**:
   ```yaml
   components:
     - type: "Testimonials"
       enabled: true
       config:
         content:
           title: "What Our Clients Say"
           testimonials:
             - quote: "Amazing service!"
               author: "John Doe"
   ```

## Creating YAML-Compatible Components (Best Practices)

When creating new components or migrating components from other projects, follow these guidelines to ensure they work seamlessly with the YAML system:

### Component Structure Requirements

**1. Props Interface Pattern**
Every component should accept a single `data` prop containing all its content:

```astro
---
// ✅ CORRECT - Single data prop
interface Props {
  data: {
    title: string;
    description: string;
    items: Array<{
      name: string;
      value: string;
    }>;
  };
}

const { data } = Astro.props;
---

<section>
  <h2>{data.title}</h2>
  <p>{data.description}</p>
  {data.items.map(item => (
    <div>{item.name}: {item.value}</div>
  ))}
</section>
```

```astro
---
// ❌ INCORRECT - Multiple props
interface Props {
  title: string;
  description: string;
  items: Array<any>;
}
---
```

**2. Avoid Hardcoded Content**
All text, links, images, and configuration should come from the `data` prop:

```astro
---
// ✅ CORRECT - All content from data
interface Props {
  data: {
    title: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
  };
}
---

<section style={`background-image: url(${data.backgroundImage})`}>
  <h1>{data.title}</h1>
  <a href={data.ctaLink}>{data.ctaText}</a>
</section>
```

```astro
---
// ❌ INCORRECT - Hardcoded values
---
<section style="background-image: url('/hero-bg.jpg')">
  <h1>{data.title}</h1>
  <a href="/contact">Get Started</a> <!-- Hardcoded link -->
</section>
```

**3. Optional Layout Configuration**
Support layout options when applicable:

```typescript
interface Props {
  data: {
    // Layout options (optional)
    layout?: {
      columns?: number;
      spacing?: "small" | "medium" | "large";
      alignment?: "left" | "center" | "right";
    };
    // Content (required)
    content: {
      title: string;
      // ... other content fields
    };
  };
}
```

**Note:** When using the YAML system, the `layout` configuration is typically handled by `LayoutConfig` in `page.interface.ts` and doesn't need to be in the component's data prop. The component receives `data` with only the `content` portion.

### Migration Checklist for Existing Components

When importing components from other projects, follow this checklist:

**Step 1: Analyze the Component**
- [ ] Identify all props the component currently accepts
- [ ] Find all hardcoded text, links, images, or configuration
- [ ] Note any layout/styling options (columns, spacing, etc.)

**Step 2: Restructure Props**
- [ ] Consolidate all props into a single `data` object
- [ ] Move all hardcoded content into the `data` interface
- [ ] Define optional layout configurations if needed

**Step 3: Create Type Definitions**
- [ ] Create a data interface in `src/config/landing.interface.ts` (if reusable across components)
- [ ] Create a config interface in `src/config/page.interface.ts` with this structure:
  ```typescript
  export interface YourComponentConfig {
    layout?: LayoutConfig;
    content: YourDataInterface; // The actual content
  }
  ```
- [ ] Add component type to `ComponentType` union
- [ ] Add config to `ComponentConfig` union

**Step 4: Register Component**
- [ ] Add import to `src/config/component-registry.ts`
- [ ] Add to `ComponentRegistry` object

**Step 5: Test with YAML**
- [ ] Create test entry in a YAML file
- [ ] Verify component renders correctly
- [ ] Test enabling/disabling the component
- [ ] Test layout options if applicable

### Example: Converting an Existing Component

**Before (Original Component):**
```astro
---
// Old component with multiple props and hardcoded values
interface Props {
  heading: string;
  subheading: string;
  showCta?: boolean;
}

const { heading, subheading, showCta = true } = Astro.props;
---

<section class="hero">
  <h1>{heading}</h1>
  <p>{subheading}</p>
  {showCta && <a href="/contact">Contact Us</a>} <!-- Hardcoded -->
</section>
```

**After (YAML-Compatible):**
```astro
---
// New component with single data prop, no hardcoding
interface Props {
  data: {
    heading: string;
    subheading: string;
    cta?: {
      text: string;
      href: string;
      target?: string;
    };
  };
}

const { data } = Astro.props;
---

<section class="hero">
  <h1>{data.heading}</h1>
  <p>{data.subheading}</p>
  {data.cta && (
    <a href={data.cta.href} target={data.cta.target}>
      {data.cta.text}
    </a>
  )}
</section>
```

**Type Definition (`page.interface.ts`):**
```typescript
export interface HeroSectionConfig {
  layout?: LayoutConfig;
  content: {
    heading: string;
    subheading: string;
    cta?: {
      text: string;
      href: string;
      target?: string;
    };
  };
}

// Add to unions
export type ComponentType = "Hero" | "Services" | /* ... */ | "HeroSection";
export type ComponentConfig = HeroConfig | ServicesConfig | /* ... */ | HeroSectionConfig;
```

**YAML Usage:**
```yaml
components:
  - type: "HeroSection"
    id: "main-hero"
    enabled: true
    config:
      layout:
        spacing: "large"
      content:
        heading: "Welcome to Our Site"
        subheading: "We provide amazing services"
        cta:
          text: "Contact Us"
          href: "/contact"
          target: "_self"
```

### Common Patterns for YAML Components

**Pattern 1: List-Based Components (Cards, Features, etc.)**
```typescript
interface Props {
  data: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon?: Icon;
      link?: string;
    }>;
  };
}
```

**Pattern 2: Media + Content Components**
```typescript
interface Props {
  data: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    reversed?: boolean; // Controls layout
  };
}
```

**Pattern 3: Form Components**
```typescript
interface Props {
  data: {
    title: string;
    description?: string;
    fields: Array<{
      name: string;
      label: string;
      type: "text" | "email" | "textarea";
      required?: boolean;
      placeholder?: string;
    }>;
    submitText: string;
    submitAction: string; // API endpoint
  };
}
```

### Tips for Component Migration

1. **Keep Components Pure**: Components should only render what they're given via `data`. No fetching, no business logic.

2. **Use TypeScript Strictly**: Define all interfaces completely. This catches YAML configuration errors at build time.

3. **Default Values**: Use optional fields with sensible defaults for non-critical props:
   ```typescript
   const showHeader = data.showHeader ?? true;
   const columns = data.layout?.columns ?? 3;
   ```

4. **Icon Integration**: Use the existing `Icon` type from `landing.interface.ts`:
   ```typescript
   import type { Icon as IconType } from "@/config/landing.interface";

   interface Props {
     data: {
       items: Array<{
         icon: IconType;
         // ...
       }>;
     };
   }
   ```

5. **Responsive Design**: Let Tailwind handle responsiveness, but expose configuration when needed:
   ```yaml
   content:
     desktopColumns: 4
     tabletColumns: 2
     mobileColumns: 1
   ```

6. **Test Incrementally**: Convert and test one component at a time, rather than batch migrations.

## Adding New Icons

To add a new icon:

1. Create an Astro component in `src/icons/` (choose appropriate subfolder)
2. Add the icon name to the `Icon` union type in `src/config/landing.interface.ts`
3. Update `src/components/Icon.astro` to handle the new icon case
4. Use the icon name in your YAML files where applicable

## Available Components

Current component types registered in the system:
- **Hero** - Hero section with title, CTAs, and scroll button
- **Services** - Grid of service cards with icons
- **Adventajes** - Side-by-side feature showcases with images
- **Brands** - Technology/partner logo grid
- **Pricing** - Pricing tiers with features
- **Header** - Navigation header with logo and links
- **Footer** - Footer with links and social icons

## Layout Options

### Page-Level Layout
```yaml
layout:
  containerWidth: "3/4"  # "full", "3/4", "2/3", "1/2"
```

### Component-Level Layout
```yaml
config:
  layout:
    columns: 2              # Number of columns (component-specific)
    spacing: "large"        # "none", "small", "medium", "large", "xl"
    alignment: "center"     # "left", "center", "right"
```

## SEO and Analytics

Structured data (JSON-LD) is configured in `meta.ldJson` of each page's YAML file. The current schema is for an Organization type. This data is used in the Layout for search engine optimization.

## Deployment

The site is configured for static deployment (default for Astro). The `site` field in `astro.config.mjs` switches between localhost (dev) and production URL automatically. Integrations include sitemap generation and robots.txt.

## Project History & Architecture

**Current System:** YAML-driven page composition
- Page configurations: `src/data/pages/*.yaml`
- Page service: `src/services/page.service.ts`
- Component registry: `src/config/component-registry.ts`
- Type definitions: `src/config/page.interface.ts`

**Legacy Code (Still Present):**
- `src/config/landing.interface.ts` - Contains component data interfaces still used by section components (HeaderData, ServicesData, etc.) and the Icon type. This file is required for the system to work.

**Removed/Deprecated:**
- ~~`src/data/landing.json`~~ - Removed (replaced by YAML files)
- ~~`src/services/data.service.ts`~~ - Removed (replaced by page.service.ts)
- ~~`LandingPageData` interface~~ - Removed (replaced by PageData)

The codebase has been cleaned of all old JSON-based architecture. All content management is now done exclusively through YAML files.
