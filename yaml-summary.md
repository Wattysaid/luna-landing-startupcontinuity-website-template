# YAML-Driven Page Composition System - Implementation Summary

**Project**: Luna Landing (Astro + TypeScript + Tailwind CSS)
**Implementation Date**: 2025-10-20
**Purpose**: This document explains the complete transformation from a JSON-based content system to a YAML-driven page composition architecture.

---

## Table of Contents

1. [Overview & Motivation](#overview--motivation)
2. [Architecture Before & After](#architecture-before--after)
3. [Implementation Details](#implementation-details)
4. [Complete Code Examples](#complete-code-examples)
5. [Migration Guide](#migration-guide)
6. [Benefits & Trade-offs](#benefits--trade-offs)
7. [Files Created & Modified](#files-created--modified)

---

## Overview & Motivation

### The Problem

The original system used a single `landing.json` file to store all page content. While simple, this approach had limitations:

1. **Inflexible Structure**: All pages shared the same rigid component order
2. **No Component Reordering**: Couldn't change which components appear or their order without code changes
3. **Limited Scalability**: Adding new pages meant duplicating the entire structure
4. **No Dynamic Composition**: Couldn't enable/disable components per page
5. **Poor Content Management**: One massive JSON file for all content

### The Solution

A **YAML-driven page composition system** where:

- Each page has its own YAML configuration file
- Components can be added, removed, reordered, enabled/disabled via YAML
- Layout options (spacing, columns, container width) are configurable
- All content/copy is managed through YAML
- Core component code remains isolated and reusable
- Type-safe with TypeScript interfaces

### Key Design Principle

> **Separation of Concerns**: Component code (logic/presentation) is separated from component configuration (content/ordering). YAML controls WHAT is displayed and WHERE, while Astro components control HOW it's rendered.

---

## Architecture Before & After

### Before: JSON-Based System

**File Structure:**
```
src/
├── data/
│   └── landing.json          # Single JSON file with all content
├── services/
│   └── data.service.ts       # Loads the JSON file
└── pages/
    └── index.astro           # Hardcoded component imports and order
```

**Data Flow:**
```
landing.json → data.service.ts → index.astro → Individual Components
```

**Example (index.astro):**
```astro
---
import { getLandingData } from "@/services/data.service";
const data = await getLandingData();
---

<Layout meta={data.meta}>
  <Header data={data.headerData} />
  <main>
    <Hero data={data.heroData} />
    <Services data={data.servicesData} />
    <Brands data={data.brandsData} />
    <Pricing data={data.pricingData} />
  </main>
  <Footer data={data.footerData} />
</Layout>
```

**Problems:**
- ❌ Component order hardcoded in index.astro
- ❌ Can't disable components without code changes
- ❌ All pages must follow same structure
- ❌ No layout configuration per component

### After: YAML-Based System

**File Structure:**
```
src/
├── data/
│   └── pages/
│       ├── home.yaml         # Home page configuration
│       ├── about.yaml        # About page configuration
│       └── contact.yaml      # Contact page configuration
├── services/
│   └── page.service.ts       # Loads YAML files
├── config/
│   ├── page.interface.ts     # TypeScript interfaces for configs
│   └── component-registry.ts # Maps component names to imports
├── components/
│   └── PageRenderer.astro    # Dynamically renders components
└── pages/
    └── index.astro           # Minimal - just loads YAML and renders
```

**Data Flow:**
```
home.yaml → page.service.ts → PageRenderer.astro → Component Registry → Individual Components
```

**Example (index.astro - New):**
```astro
---
import Layout from "@/layouts/Layout.astro";
import PageRenderer from "@/components/PageRenderer.astro";
import { getPageData } from "@/services/page.service";

const pageData = await getPageData("home");
---

<Layout meta={pageData.meta}>
  <PageRenderer pageData={pageData} />
</Layout>
```

**Benefits:**
- ✅ Component order defined in YAML
- ✅ Enable/disable components via `enabled: true/false`
- ✅ Each page has independent configuration
- ✅ Layout options per component and page
- ✅ Reorder components by moving YAML blocks

---

## Implementation Details

### 1. Core Architecture Components

#### A. TypeScript Interface System

**Purpose**: Define strict types for component configurations

**File**: `src/config/page.interface.ts`

```typescript
// Base types used across all components
export interface LayoutConfig {
  columns?: number | "auto";
  spacing?: "none" | "small" | "medium" | "large" | "xl";
  alignment?: "left" | "center" | "right";
  containerWidth?: "full" | "3/4" | "2/3" | "1/2";
}

// Example: Hero component configuration
export interface HeroConfig {
  layout?: LayoutConfig;  // Optional layout settings
  content: {              // Required content
    title: string;
    subTitle: string;
    primaryCta: {
      text: string;
      href: string;
      target?: string;
    };
    secondaryCta: {
      text: string;
      href: string;
      target?: string;
    };
    highlightedTitle?: string;
    showScrollButton?: boolean;
    scrollTarget?: string;
  };
}

// Union type of all component types
export type ComponentType =
  | "Hero"
  | "Services"
  | "Adventajes"
  | "Brands"
  | "Pricing"
  | "Header"
  | "Footer";

// Union type of all component configs
export type ComponentConfig =
  | HeroConfig
  | ServicesConfig
  | AdventajesConfig
  | BrandsConfig
  | PricingConfig
  | HeaderConfig
  | FooterConfig;

// Structure of a component in YAML
export interface PageComponent {
  type: ComponentType;
  id?: string;           // Optional unique identifier
  enabled?: boolean;     // Can disable without removing
  config: ComponentConfig;
}

// Complete page structure
export interface PageData {
  meta: MetaConfig;      // SEO metadata
  layout?: {             // Page-level layout
    containerWidth?: "full" | "3/4" | "2/3" | "1/2";
    backgroundColor?: string;
  };
  header?: PageComponent;    // Optional header
  components: PageComponent[]; // Main content (ordered)
  footer?: PageComponent;    // Optional footer
}
```

**Why This Matters:**
- Provides autocomplete in IDEs
- Catches configuration errors at build time
- Documents expected structure
- Enables refactoring with confidence

#### B. Component Registry

**Purpose**: Map component type strings to actual Astro components for dynamic rendering

**File**: `src/config/component-registry.ts`

```typescript
import Hero from "@/sections/Hero.astro";
import Services from "@/sections/Services.astro";
import Adventajes from "@/sections/Adventajes.astro";
import Brands from "@/sections/Brands.astro";
import Pricing from "@/sections/Pricing.astro";
import Header from "@/sections/Header.astro";
import Footer from "@/sections/Footer.astro";

import type { ComponentType } from "./page.interface";

// Registry object mapping type strings to components
export const ComponentRegistry = {
  Hero,
  Services,
  Adventajes,
  Brands,
  Pricing,
  Header,
  Footer,
} as const;

// Get component by type (with error handling)
export function getComponent(type: ComponentType) {
  const component = ComponentRegistry[type];

  if (!component) {
    throw new Error(
      `Component type "${type}" not found in registry. ` +
      `Available types: ${Object.keys(ComponentRegistry).join(", ")}`
    );
  }

  return component;
}

// Type guard to check valid component types
export function isValidComponentType(type: string): type is ComponentType {
  return type in ComponentRegistry;
}
```

**Why This Design:**
- **Centralized**: All component imports in one place
- **Type-safe**: TypeScript ensures only valid components exist
- **Easy to extend**: Add new components by importing and adding to registry
- **Runtime validation**: Throws helpful errors for invalid types

#### C. YAML Service

**Purpose**: Load and validate YAML page configuration files

**File**: `src/services/page.service.ts`

```typescript
import { readFileSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";
import type { PageData } from "@/config/page.interface";
import { isValidComponentType } from "@/config/component-registry";

export async function getPageData(pageName: string): Promise<PageData> {
  try {
    // Construct path to YAML file
    const filePath = join(
      process.cwd(),
      "src",
      "data",
      "pages",
      `${pageName}.yaml`
    );

    // Read and parse YAML
    const fileContents = readFileSync(filePath, "utf8");
    const data = yaml.load(fileContents) as PageData;

    // Validate structure
    validatePageData(data, pageName);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to load page data for "${pageName}": ${error.message}`
      );
    }
    throw error;
  }
}

function validatePageData(data: PageData, pageName: string): void {
  // Check required fields
  if (!data.meta) {
    throw new Error(`Page "${pageName}" is missing required "meta" field`);
  }

  if (!data.meta.title) {
    throw new Error(`Page "${pageName}" is missing required "meta.title" field`);
  }

  if (!data.components || !Array.isArray(data.components)) {
    throw new Error(
      `Page "${pageName}" is missing required "components" array`
    );
  }

  // Validate each component
  data.components.forEach((component, index) => {
    if (!component.type) {
      throw new Error(
        `Page "${pageName}": Component at index ${index} is missing "type"`
      );
    }

    if (!isValidComponentType(component.type)) {
      throw new Error(
        `Page "${pageName}": Invalid component type "${component.type}" at index ${index}`
      );
    }

    if (!component.config) {
      throw new Error(
        `Page "${pageName}": Component "${component.type}" at index ${index} is missing "config"`
      );
    }
  });
}
```

**Why Validation Matters:**
- Catches YAML typos early
- Provides helpful error messages
- Prevents runtime errors
- Validates component types exist in registry

#### D. Dynamic Page Renderer

**Purpose**: Dynamically render components based on YAML configuration

**File**: `src/components/PageRenderer.astro`

```astro
---
import type { PageData, PageComponent } from "@/config/page.interface";
import { getComponent } from "@/config/component-registry";

interface Props {
  pageData: PageData;
}

const { pageData } = Astro.props;

// Helper: Get container width CSS class
function getContainerWidthClass(width?: string): string {
  const widthMap: Record<string, string> = {
    full: "w-full",
    "3/4": "w-3/4",
    "2/3": "w-2/3",
    "1/2": "w-1/2",
  };
  return widthMap[width || "3/4"] || "w-3/4";
}

// Helper: Get spacing CSS class
function getSpacingClass(spacing?: string): string {
  const spacingMap: Record<string, string> = {
    none: "",
    small: "gap-y-10",
    medium: "gap-y-20",
    large: "gap-y-28",
    xl: "gap-y-48",
  };
  return spacingMap[spacing || "medium"] || "gap-y-20";
}

// Filter enabled components
const enabledComponents = pageData.components.filter(
  (comp) => comp.enabled !== false
);

const containerClass = getContainerWidthClass(pageData.layout?.containerWidth);
---

<div class="flex flex-col justify-center items-center">
  <!-- Render Header if present -->
  {pageData.header && pageData.header.enabled !== false && (
    <div class="w-full">
      {(() => {
        const HeaderComponent = getComponent(pageData.header.type);
        return <HeaderComponent data={pageData.header.config.content as any} />;
      })()}
    </div>
  )}

  <!-- Main Content Container -->
  <main class={`flex flex-col ${containerClass}`}>
    {enabledComponents.map((component: PageComponent, index: number) => {
      // Get component from registry
      const Component = getComponent(component.type);

      // Apply layout spacing if configured
      const layoutClass = component.config.layout?.spacing
        ? getSpacingClass(component.config.layout.spacing)
        : "";

      return (
        <div
          class={layoutClass}
          id={component.id || `component-${index}`}
          data-component-type={component.type}
        >
          <Component data={component.config.content as any} />
        </div>
      );
    })}
  </main>

  <!-- Render Footer if present -->
  {pageData.footer && pageData.footer.enabled !== false && (
    <div class="w-full">
      {(() => {
        const FooterComponent = getComponent(pageData.footer.type);
        return <FooterComponent data={pageData.footer.config.content as any} />;
      })()}
    </div>
  )}
</div>
```

**Key Features:**
- **Dynamic rendering**: Uses component registry to load components at runtime
- **Layout support**: Applies spacing, container width from config
- **Enable/disable**: Respects `enabled` flag on components
- **Type-safe**: TypeScript ensures correct data structure
- **Flexible IDs**: Auto-generates IDs or uses custom ones

---

## Complete Code Examples

### Example 1: YAML Page Configuration

**File**: `src/data/pages/home.yaml`

```yaml
# Meta Information (SEO)
meta:
  title: "Luna Landing - Your Perfect Landing Page"
  description: "Landing page template built with Astro"
  lang: "en"
  charset: "UTF-8"
  ldJson:
    "@context": "http://schema.org"
    "@type": "Organization"
    name: "Luna Landing"
    url: "https://luna-landing.com"

# Page-level Layout
layout:
  containerWidth: "3/4"  # Options: "full", "3/4", "2/3", "1/2"

# Header Component (Optional)
header:
  type: "Header"
  enabled: true
  config:
    content:
      logo: "Luna Landing"
      links:
        - label: "About"
          href: "#about"
        - label: "Services"
          href: "#services"
        - label: "Pricing"
          href: "#pricing"

# Main Content Components (Ordered Array)
components:
  # 1. Hero Section
  - type: "Hero"
    id: "hero-section"
    enabled: true
    config:
      layout:
        spacing: "large"
      content:
        title: "Open Your Mind to the Universe"
        highlightedTitle: "Luna Landing"
        subTitle: "Discover the Beauty of the Cosmos"
        primaryCta:
          text: "Github Repo"
          href: "https://github.com/example/luna"
          target: "_blank"
        secondaryCta:
          text: "See Pricing"
          href: "#pricing"
        showScrollButton: true
        scrollTarget: "#services"

  # 2. Services Section
  - type: "Services"
    id: "services"
    enabled: true
    config:
      layout:
        columns: 2
        spacing: "large"
      content:
        title: "Everything you need"
        services:
          - title: "Professional Templates"
            icon: "DevIcon"
            description: "Crafted by experienced designers"
          - title: "SEO-Optimized"
            icon: "FileIcon"
            description: "Built for search engines"

  # 3. Pricing Section
  - type: "Pricing"
    id: "pricing"
    enabled: true
    config:
      layout:
        columns: 3
        spacing: "xl"
      content:
        title: "Our Pricing"
        tiers:
          - title: "Starter"
            description: "Best for personal use"
            price:
              amount: "Free"
            features:
              - "5 pages"
              - "Basic support"
            cta: "Get started"
            ctaHref: "#"
          - title: "Pro"
            description: "For professionals"
            price:
              amount: "$29"
              period: "/month"
            features:
              - "Unlimited pages"
              - "Priority support"
            cta: "Get started"
            ctaHref: "#"

# Footer Component (Optional)
footer:
  type: "Footer"
  enabled: true
  config:
    content:
      logo: "Luna Landing"
      description: "Discover the Beauty of the Cosmos"
      links:
        - label: "About"
          href: "/"
        - label: "Contact"
          href: "/contact"
      socials:
        - icon: "GithubIcon"
          href: "https://github.com/example"
        - icon: "TwitterIcon"
          href: "https://twitter.com/example"
```

**How to Use This YAML:**

```astro
---
// src/pages/index.astro
import Layout from "@/layouts/Layout.astro";
import PageRenderer from "@/components/PageRenderer.astro";
import { getPageData } from "@/services/page.service";

const pageData = await getPageData("home"); // Loads home.yaml
---

<Layout meta={pageData.meta}>
  <PageRenderer pageData={pageData} />
</Layout>
```

### Example 2: Creating a YAML-Compatible Component

**Scenario**: You have an existing "Testimonials" component from another project and want to make it work with the YAML system.

**Step 1: Original Component (Before)**

```astro
---
// Old component - doesn't work with YAML system
interface Props {
  heading: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
  }>;
  columns?: number;
}

const { heading, testimonials, columns = 3 } = Astro.props;
---

<section class="testimonials">
  <h2>{heading}</h2>
  <div class={`grid grid-cols-${columns}`}>
    {testimonials.map(t => (
      <div class="testimonial-card">
        <p>"{t.quote}"</p>
        <p><strong>{t.author}</strong> - {t.role}</p>
      </div>
    ))}
  </div>
</section>
```

**Step 2: Convert to YAML-Compatible (After)**

```astro
---
// New component - YAML-compatible
interface Props {
  data: {
    heading: string;
    testimonials: Array<{
      quote: string;
      author: string;
      role: string;
      avatar?: string;
    }>;
    columns?: number;
  };
}

const { data } = Astro.props;
const columns = data.columns ?? 3;
---

<section class="testimonials">
  <h2>{data.heading}</h2>
  <div class={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
    {data.testimonials.map(t => (
      <div class="testimonial-card">
        {t.avatar && <img src={t.avatar} alt={t.author} />}
        <p class="quote">"{t.quote}"</p>
        <p class="author">
          <strong>{t.author}</strong> - {t.role}
        </p>
      </div>
    ))}
  </div>
</section>
```

**Step 3: Define TypeScript Interfaces**

```typescript
// src/config/landing.interface.ts
export interface TestimonialsData {
  heading: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  }>;
  columns?: number;
}

// src/config/page.interface.ts
export interface TestimonialsConfig {
  layout?: LayoutConfig;
  content: TestimonialsData;
}

// Add to ComponentType union
export type ComponentType =
  | "Hero"
  | "Services"
  // ... existing
  | "Testimonials";  // Add this

// Add to ComponentConfig union
export type ComponentConfig =
  | HeroConfig
  | ServicesConfig
  // ... existing
  | TestimonialsConfig;  // Add this
```

**Step 4: Register Component**

```typescript
// src/config/component-registry.ts
import Testimonials from "@/sections/Testimonials.astro";

export const ComponentRegistry = {
  Hero,
  Services,
  // ... existing
  Testimonials,  // Add this
} as const;
```

**Step 5: Use in YAML**

```yaml
components:
  - type: "Testimonials"
    id: "client-testimonials"
    enabled: true
    config:
      layout:
        spacing: "large"
      content:
        heading: "What Our Clients Say"
        columns: 3
        testimonials:
          - quote: "Amazing service! Highly recommend."
            author: "John Doe"
            role: "CEO, TechCorp"
            avatar: "/images/john.jpg"
          - quote: "Transformed our business completely."
            author: "Jane Smith"
            role: "Founder, StartupXYZ"
            avatar: "/images/jane.jpg"
          - quote: "Best decision we ever made."
            author: "Mike Johnson"
            role: "CTO, InnovateCo"
            avatar: "/images/mike.jpg"
```

---

## Migration Guide

### For Existing Projects

#### Phase 1: Setup (1-2 hours)

1. **Install Dependencies**
   ```bash
   pnpm add js-yaml
   pnpm add -D @types/js-yaml
   ```

2. **Create Directory Structure**
   ```bash
   mkdir -p src/data/pages
   mkdir -p src/config
   ```

3. **Copy Core Files**
   - `src/config/page.interface.ts`
   - `src/config/component-registry.ts`
   - `src/services/page.service.ts`
   - `src/components/PageRenderer.astro`

#### Phase 2: Component Conversion (Ongoing)

For each component:

1. **Analyze current props**
   ```astro
   // Before
   interface Props {
     title: string;
     items: Item[];
     showHeader?: boolean;
   }
   ```

2. **Restructure to single data prop**
   ```astro
   // After
   interface Props {
     data: {
       title: string;
       items: Item[];
       showHeader?: boolean;
     };
   }
   ```

3. **Update component usage**
   ```astro
   // Before
   const { title, items, showHeader } = Astro.props;
   <h1>{title}</h1>

   // After
   const { data } = Astro.props;
   <h1>{data.title}</h1>
   ```

4. **Add type definitions**
5. **Register in component registry**
6. **Test with YAML**

#### Phase 3: Page Migration (Per Page)

1. **Create YAML file** for the page
2. **Copy content** from old system
3. **Update page file** to use PageRenderer
4. **Test thoroughly**
5. **Remove old data files** when all pages migrated

---

## Benefits & Trade-offs

### Benefits ✅

1. **Content Management**
   - Non-developers can edit YAML files
   - Clear structure with comments
   - Version control friendly

2. **Flexibility**
   - Add/remove/reorder components without code changes
   - Different layouts per page
   - Enable/disable components easily

3. **Scalability**
   - Each page has independent configuration
   - Easy to create new pages
   - Component library grows organically

4. **Type Safety**
   - TypeScript validates all configurations
   - Catch errors at build time
   - IDE autocomplete support

5. **Maintainability**
   - Clear separation of concerns
   - Centralized component registry
   - Reusable components

6. **Developer Experience**
   - Consistent patterns
   - Clear documentation
   - Easy to onboard new developers

### Trade-offs ⚠️

1. **Initial Setup**
   - More files to create initially
   - Learning curve for the pattern
   - Time investment upfront

2. **Complexity**
   - More abstraction layers
   - TypeScript knowledge required
   - Understanding the flow takes time

3. **Build Time**
   - YAML parsing adds minimal overhead
   - More files to process
   - Still fast overall (< 10 seconds)

4. **Type Casting**
   - Need `as any` in some places due to TypeScript union complexity
   - Runtime validation compensates

---

## Files Created & Modified

### Files Created ✨

1. **`src/config/page.interface.ts`** (154 lines)
   - TypeScript interfaces for all component configs
   - PageData structure
   - ComponentType and ComponentConfig unions

2. **`src/config/component-registry.ts`** (56 lines)
   - Component registry mapping
   - Helper functions for component lookup
   - Type validation

3. **`src/services/page.service.ts`** (128 lines)
   - YAML file loading
   - Data validation
   - Error handling

4. **`src/components/PageRenderer.astro`** (105 lines)
   - Dynamic component rendering
   - Layout helpers
   - Header/footer management

5. **`src/data/pages/home.yaml`** (220 lines)
   - Complete home page configuration
   - All components with content
   - Layout and meta settings

### Files Modified 🔧

1. **`src/sections/Hero.astro`**
   - Updated to accept configurable CTAs
   - Added optional scroll button
   - Made all links dynamic

2. **`src/sections/Pricing.astro`**
   - Added ctaHref to tier interface
   - Made CTA links configurable

3. **`src/layouts/Layout.astro`**
   - Support both Meta and MetaConfig types
   - Optional ldJson handling

4. **`src/pages/index.astro`**
   - Simplified to use PageRenderer
   - Loads YAML instead of JSON

5. **`src/config/landing.interface.ts`**
   - Removed LandingPageData interface
   - Removed HeroData interface
   - Added documentation
   - Added ctaHref to Tier interface

6. **`package.json`**
   - Added js-yaml dependency
   - Added @types/js-yaml dev dependency

7. **`CLAUDE.md`**
   - Complete rewrite with new architecture
   - Added migration guides
   - Added best practices

### Files Removed 🗑️

1. **`src/data/landing.json`**
   - Replaced by YAML files per page

2. **`src/services/data.service.ts`**
   - Replaced by page.service.ts

---

## Testing & Validation

### Build Verification

```bash
pnpm build
```

**Expected Output:**
```
✓ Type checking passed (0 errors)
✓ Built successfully in 9.3s
✓ 1 page(s) generated
```

### Runtime Validation

The system validates:
1. ✅ YAML file exists
2. ✅ Required fields present (meta, components)
3. ✅ Component types are valid (in registry)
4. ✅ Each component has config
5. ✅ TypeScript type checking

### Error Examples

**Invalid component type:**
```
Error: Page "home": Invalid component type "TestimonialZ" at index 3
```

**Missing required field:**
```
Error: Page "home": Component "Hero" at index 0 is missing "config"
```

**YAML syntax error:**
```
Error: Failed to load page data for "home": bad indentation
```

---

## Best Practices Summary

### Do ✅

- Use single `data` prop for all component content
- Define complete TypeScript interfaces
- Validate YAML structure in page service
- Keep components pure (no business logic)
- Use optional fields with defaults
- Document YAML structure with comments
- Test each component with YAML before deployment

### Don't ❌

- Hardcode content in components
- Use multiple props (consolidate into data)
- Skip TypeScript interfaces
- Put business logic in components
- Forget to register components
- Mix old and new systems

---

## Conclusion

This YAML-driven page composition system provides a scalable, maintainable, and flexible foundation for content-driven websites. The initial setup investment pays dividends in:

- **Content Management**: Easy for non-developers
- **Flexibility**: Change layouts without code
- **Type Safety**: Catch errors early
- **Scalability**: Add pages effortlessly
- **Developer Experience**: Clear patterns and good DX

The system is production-ready and can be adapted to any Astro project following the patterns outlined in this document.

---

## Quick Reference

### Adding a New Page

1. Create `src/data/pages/your-page.yaml`
2. Copy structure from `home.yaml`
3. Create `src/pages/your-page.astro`:
   ```astro
   ---
   import Layout from "@/layouts/Layout.astro";
   import PageRenderer from "@/components/PageRenderer.astro";
   import { getPageData } from "@/services/page.service";

   const pageData = await getPageData("your-page");
   ---

   <Layout meta={pageData.meta}>
     <PageRenderer pageData={pageData} />
   </Layout>
   ```

### Adding a New Component

1. Create component in `src/sections/YourComponent.astro`
2. Define interfaces in `src/config/page.interface.ts`
3. Register in `src/config/component-registry.ts`
4. Use in YAML files

### Reordering Components

Just move the YAML blocks up or down in the `components` array.

### Disabling Components

```yaml
- type: "ComponentName"
  enabled: false  # Won't render but config preserved
```

---

**End of Document**

*For questions or issues, refer to CLAUDE.md in the repository.*
